import json
from django.test import TestCase
import factory
from wagtail.core.models import Site
from wagtail_factories.factories import ImageFactory

from blog.factories import (
    BlogCategoryFactory,
    PostPageBlogCategoryFactory,
    BlogPageFactory,
    PostPageTagFactory,
    PostPageFactory,
    TagFactory,
)


class TestView(TestCase):
    """
    Test blog.views
    """
    def setUp(self):
        self.blog_page = BlogPageFactory.create()

        self.site = Site.objects.all().first()
        self.site.root_page = self.blog_page
        self.site.save()

    def test_category_view(self):
        # arrange
        category_1 = BlogCategoryFactory.create()

        # act
        response = self.client.get("/api/blog/categories/")
        response_data = response.json()

        # assert
        assert response_data["results"][0]["name"] == category_1.name
        assert response_data["results"][0]["slug"] == category_1.slug

        # arrange
        BlogCategoryFactory.create()

        # act
        response = self.client.get("/api/blog/categories/")
        response_data = response.json()

        # assert
        assert len(response_data["results"]) == 2

    def test_tag_view(self):
        tag_1 = TagFactory.create()

        response = self.client.get("/api/blog/tags/")
        response_data = response.json()

        assert response_data["results"][0]["name"] == tag_1.name
        assert response_data["results"][0]["slug"] == tag_1.slug

        TagFactory.create()
        response = self.client.get("/api/blog/tags/")
        response_data = response.json()
        assert len(response_data["results"]) == 2

    def test_post_page_view(self):
        post_page = PostPageFactory.create(parent=self.blog_page,)

        category_1 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page, blog_category=category_1,
        )

        tag_1 = TagFactory.create()
        PostPageTagFactory.create(
            content_object=post_page, tag=tag_1,
        )

        response = self.client.get(
            f"/api/blog/posts/?category={category_1.slug}&tag=*"
        )
        response_data = response.json()
        assert response_data["results"][0]["id"] == post_page.pk

        response = self.client.get(
            f"/api/blog/posts/?category=*&tag={tag_1.slug}"
        )
        response_data = response.json()
        assert response_data["results"][0]["id"] == post_page.pk

        response = self.client.get("/api/blog/posts/")
        response_data = response.json()
        assert response_data["results"][0]["id"] == post_page.pk

        # empty list
        tag_2 = TagFactory.create()
        response = self.client.get(
            f"/api/blog/posts/?category=*&tag={tag_2.slug}"
        )
        response_data = response.json()
        assert response_data["count"] == 0

        category_2 = BlogCategoryFactory.create()
        response = self.client.get(
            f"/api/blog/posts/?category={category_2.slug}&tag=*"
        )
        response_data = response.json()
        assert response_data["count"] == 0


class TestPostPageAPI(TestCase):
    def setUp(self):
        self.blog_page = BlogPageFactory.create()

        self.site = Site.objects.all().first()
        self.site.root_page = self.blog_page
        self.site.save()

    def test_post_page(self):
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

        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        # return the correct block value
        assert response_data["body"][1]["value"] == body_data[1]["value"]

        # check get_api_representation
        assert response_data["body"][3]["type"] == "image_text"
        assert response_data["body"][3]['value']['image']['width'] == 800

    def test_post_page_category(self):
        post_page = PostPageFactory.create(parent=self.blog_page,)

        category_1 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page, blog_category=category_1,
        )

        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        assert response_data["api_categories"][0]["name"] == category_1.name
        assert response_data["api_categories"][0]["slug"] == category_1.slug

        category_2 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page, blog_category=category_2,
        )

        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()
        assert len(response_data["api_categories"]) == 2

    def test_post_page_tag(self):
        post_page = PostPageFactory.create(parent=self.blog_page,)

        tag_1 = TagFactory.create()
        PostPageTagFactory.create(
            content_object=post_page, tag=tag_1,
        )

        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        assert response_data["api_tags"][0]["name"] == tag_1.name
        assert response_data["api_tags"][0]["slug"] == tag_1.slug

        tag_2 = TagFactory.create()
        PostPageTagFactory.create(
            content_object=post_page, tag=tag_2,
        )
        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()
        assert len(response_data["api_tags"]) == 2
