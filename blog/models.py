import urllib.parse
from django.http.response import JsonResponse, HttpResponseRedirect
from django.conf import settings
from django.db import models
from django.utils.module_loading import import_string
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import Tag as TaggitTag
from taggit.models import TaggedItemBase
from wagtail.admin.edit_handlers import (
    FieldPanel,
    FieldRowPanel,
    InlinePanel,
    MultiFieldPanel,
    PageChooserPanel,
    StreamFieldPanel,
)
from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet
from wagtail.core.fields import StreamField
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.search import index
from wagtail_headless_preview.models import HeadlessPreviewMixin
from .blocks import BodyBlock


class BasePage(HeadlessPreviewMixin, Page):

    serializer_class = None

    class Meta:
        abstract = True

    def get_component_data(self):
        if not self.serializer_class:
            raise Exception(f'serializer_class is not set {self.__class__.__name__}')

        serializer_class = import_string(self.serializer_class)

        return {
            'page_type': self.__class__.__name__,
            'page_content': serializer_class(self).data
        }

    def categories_list(self, context):
        categories = BlogCategory.objects.all()

        blog_page = context['blog_page']
        data = [{
            'name': category.name,
            'slug': category.slug,
            'url': blog_page.url + blog_page.reverse_subpage(
                "post_by_category",
                args=(
                    category.slug,
                )
            )
        } for category in categories]

        return data

    def tags_list(self, context):
        tags = Tag.objects.all()

        blog_page = context['blog_page']
        data = [{
            'name': tag.name,
            'slug': tag.slug,
            'url': blog_page.url + blog_page.reverse_subpage(
                "post_by_tag",
                args=(
                    tag.slug,
                )
            )
        } for tag in tags]

        return data

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request)
        context['page_component'] = self.get_component_data()

        if 'blog_page' not in context:
            context['blog_page'] = BlogPage.objects.first()
        context['page_component']['categories_list'] = self.categories_list(context)
        context['page_component']['tags_list'] = self.tags_list(context)
        return context

    def serve(self, request, *args, **kwargs):
        if request.content_type == 'application/json':
            context = self.get_context(request, *args, **kwargs)
            return JsonResponse(context['page_component'])
        else:
            full_path = request.get_full_path()
            return HttpResponseRedirect(urllib.parse.urljoin(settings.REACT_APP_BASE, full_path))


class BlogPage(RoutablePageMixin, BasePage):
    serializer_class = "blog.serializers.BlogPageSerializer"

    description = models.CharField(max_length=255, blank=True,)

    content_panels = Page.content_panels + [FieldPanel("description", classname="full")]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

        # https://docs.djangoproject.com/en/3.2/topics/pagination/#using-paginator-in-a-view-function
        per_page = 2
        paginator = Paginator(self.posts, per_page)
        page = self.page_num
        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(1)

        context['page_component']['children_pages'] = [
            post.get_component_data()
            for post in posts
        ]
        context['page_component']['paginator'] = {
            'per_page': per_page,
            'current_page': posts.number,
            'num_pages': posts.paginator.num_pages,
        }
        context['page_component']['filter_meta'] = {                   # new
            'filter_type': getattr(self, 'filter_type', None),
            'filter_term': getattr(self, 'filter_term', None),
        }
        return context

    def get_posts(self):
        return PostPage.objects.descendant_of(self).live()

    @route(r'^tag/(?P<tag>[-\w]+)/(?:page-(?P<page_num>\d+)/)?')
    def post_by_tag(self, request, tag, page_num=1, *args, **kwargs):
        self.page_num = int(page_num)
        self.filter_type = 'tag'                                     # new
        self.filter_term = tag

        self.posts = self.get_posts().filter(tags__slug=tag)
        return self.serve(request)

    @route(r'^category/(?P<category>[-\w]+)/(?:page-(?P<page_num>\d+)/)?')
    def post_by_category(self, request, category, page_num=1, *args, **kwargs):
        self.page_num = int(page_num)
        self.filter_type = 'category'                                # new
        self.filter_term = category

        self.posts = self.get_posts().filter(categories__blog_category__slug=category)
        return self.serve(request)

    @route(r'^(?:page-(?P<page_num>\d+)/)?$')
    def post_list(self, request, page_num=1, *args, **kwargs):
        self.page_num = int(page_num)
        self.posts = self.get_posts()
        return self.serve(request)


class PostPage(BasePage):
    serializer_class = "blog.serializers.PostPageSerializer"

    header_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    body = StreamField(BodyBlock(), blank=True)

    tags = ClusterTaggableManager(through="blog.PostPageTag", blank=True)

    content_panels = Page.content_panels + [
        ImageChooserPanel("header_image"),
        InlinePanel("categories", label="category"),
        FieldPanel("tags"),
        StreamFieldPanel("body"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title'),
        index.SearchField('body'),
    ]


class PostPageBlogCategory(models.Model):
    page = ParentalKey(
        "blog.PostPage", on_delete=models.CASCADE, related_name="categories"
    )
    blog_category = models.ForeignKey(
        "blog.BlogCategory", on_delete=models.CASCADE, related_name="post_pages"
    )

    panels = [
        SnippetChooserPanel("blog_category"),
    ]

    class Meta:
        unique_together = ("page", "blog_category")


@register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=80)

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class PostPageTag(TaggedItemBase):
    content_object = ParentalKey("PostPage", related_name="post_tags")


@register_snippet
class Tag(TaggitTag):
    class Meta:
        proxy = True
