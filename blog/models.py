import urllib.parse

from django.db import models
from django.http.response import HttpResponseRedirect
from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from rest_framework.fields import DateTimeField
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
from wagtail.images.api.fields import ImageRenditionField

from wagtail.api import APIField
from wagtail.core.fields import StreamField
from wagtail_headless_preview.models import HeadlessPreviewMixin
from .blocks import BodyBlock
from .fields import CategoryField, TagField


class BasePage(HeadlessPreviewMixin, Page):

    class Meta:
        abstract = True


class BlogPage(BasePage):
    description = models.CharField(max_length=255, blank=True,)

    content_panels = Page.content_panels + [FieldPanel("description", classname="full")]

    def serve(self, request, *args, **kwargs):
        return HttpResponseRedirect(self.get_client_root_url())


class PostPage(BasePage):
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

    api_fields = (
        APIField(
            "header_image_url",
            serializer=ImageRenditionField("max-1000x800", source="header_image"),
        ),
        "body",
        APIField("owner"),
        APIField("api_tags", serializer=TagField(source="tags")),
        APIField("api_categories", serializer=CategoryField(source="categories")),
        APIField(
            "pub_date",
            serializer=DateTimeField(format="%d %B %Y", source="last_published_at"),
        ),
    )

    def get_preview_url(self, token):
        return urllib.parse.urljoin(
            self.get_client_root_url(),
            f"post/{self.pk}/"
            + "?"
            + urllib.parse.urlencode(
                {"content_type": self.get_content_type_str(), "token": token}
            ),
        )

    def serve(self, request, *args, **kwargs):
        return HttpResponseRedirect(
            urllib.parse.urljoin(self.get_client_root_url(), f"/post/{self.pk}")
        )


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
