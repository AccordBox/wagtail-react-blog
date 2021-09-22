import json
import tempfile
from django.test import TestCase
from django.test import override_settings
from wagtail.core.models import Site
import factory
from wagtail_factories.factories import ImageFactory

from blog.factories import (
    BlogCategoryFactory,
    PostPageBlogCategoryFactory,
    BlogPageFactory,
    PostPageTagFactory,
    PostPageFactory,
    TagFactory,
)

from blog.serializers import PostPageSerializer, CategorySerializer, TagSerializer


@override_settings(MEDIA_ROOT=tempfile.gettempdir())
class TestSerializer(TestCase):
    def setUp(self):
        self.blog_page = BlogPageFactory.create()

        self.site = Site.objects.all().first()
        self.site.root_page = self.blog_page
        self.site.save()

    def test_category_serializer(self):
        # arrange
        category_1 = BlogCategoryFactory.create()

        # act
        data = CategorySerializer(category_1).data

        # assert
        assert data["id"] == category_1.pk
        assert data["name"] == category_1.name
        assert data["slug"] == category_1.slug

    def test_tag_serializer(self):
        tag_1 = TagFactory.create()

        data = TagSerializer(tag_1).data

        assert data["id"] == tag_1.pk
        assert data["name"] == tag_1.name
        assert data["slug"] == tag_1.slug

    def test_post_page_body(self):
        img_1 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))
        img_2 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))
        img_3 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))

        body_data = [
            {
                'type': 'h1',
                'value': 'The Zen of Wagtail'
            },
            {
                'type': 'paragraph',
                'value': '<p>Wagtail has been born out of many years of experience building '
                         'websites, learning approaches that work and ones that don’t, and '
                         'striking a balance between power and simplicity, structure and '
                         'flexibility. We hope you’ll find that Wagtail is in that sweet '
                         'spot.</p>'
            },
            {
                'type': 'image_carousel',
                'value': [img_1.pk, img_2.pk]
            },
            {
                'type': 'image_text',
                'value': {
                    'image': img_3.pk,
                    'reverse': False,
                    'text': '<p>Wagtail is not an instant website in a box.</p><p>You '
                            'can’t make a beautiful website by plugging off-the-shelf '
                            'modules together - expect to write code.</p>'
                }
            },
            {
                'type': 'image_text',
                'value': {
                    'image': img_2.pk,
                    'reverse': True,
                    'text': '<p>A CMS should get information out of an editor’s head '
                            'and into a database, as efficiently and directly as '
                            'possible.</p>'
                }
            }
        ]

        post_page = PostPageFactory.create(
            parent=self.blog_page, body=json.dumps(body_data), header_image=img_3
        )

        data = PostPageSerializer(post_page).data

        # return the correct block value
        assert data["body"][1]["value"] == body_data[1]["value"]

        # check get_api_representation
        assert data["body"][3]["type"] == "image_text"
        assert data["body"][3]['value']['image']['width'] == 800

    def test_post_page_category(self):
        post_page = PostPageFactory.create(parent=self.blog_page, )

        category_1 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page, blog_category=category_1,
        )

        data = PostPageSerializer(post_page).data

        assert data["categories"][0]["name"] == category_1.name
        assert data["categories"][0]["slug"] == category_1.slug

        category_2 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page, blog_category=category_2,
        )

        data = PostPageSerializer(post_page).data
        assert len(data["categories"]) == 2

    def test_post_page_tag(self):
        post_page = PostPageFactory.create(parent=self.blog_page,)

        tag_1 = TagFactory.create()
        PostPageTagFactory.create(
            content_object=post_page, tag=tag_1,
        )

        data = PostPageSerializer(post_page).data

        assert data["tags"][0]["name"] == tag_1.name
        assert data["tags"][0]["slug"] == tag_1.slug

        tag_2 = TagFactory.create()
        PostPageTagFactory.create(
            content_object=post_page, tag=tag_2,
        )
        data = PostPageSerializer(post_page).data
        assert len(data["tags"]) == 2
