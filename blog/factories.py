from django.utils.text import slugify
from factory import (
    DjangoModelFactory,
    LazyAttribute,
    Sequence,
)
from factory.fuzzy import (
    FuzzyText,
)
from wagtail_factories import PageFactory

from blog.models import (
    BlogCategory,
    BlogPage,
    PostPageBlogCategory,
    PostPageTag,
    PostPage,
    Tag,
)


class BlogPageFactory(PageFactory):
    class Meta:
        model = BlogPage

    title = Sequence(lambda n: "BlogPage %d" % n)


class PostPageFactory(PageFactory):
    class Meta:
        model = PostPage

    title = Sequence(lambda n: "PostPage %d" % n)


class PostPageBlogCategoryFactory(DjangoModelFactory):
    class Meta:
        model = PostPageBlogCategory


class BlogCategoryFactory(DjangoModelFactory):
    class Meta:
        model = BlogCategory

    name = FuzzyText(length=6)
    slug = LazyAttribute(lambda o: slugify(o.name))


class PostPageTagFactory(DjangoModelFactory):
    class Meta:
        model = PostPageTag


class TagFactory(DjangoModelFactory):
    class Meta:
        model = Tag

    name = FuzzyText(length=6)
    slug = LazyAttribute(lambda o: slugify(o.name))
