from rest_framework import serializers

from wagtail.images.api.fields import ImageRenditionField
from wagtail.core import fields
from wagtail.api.v2 import serializers as wagtail_serializers

from .fields import TagField, CategoryField
from .models import BlogCategory, PostPage, Tag, BlogPage, BasePage


class BasePageSerializer(serializers.ModelSerializer):
    serializer_field_mapping = (
        serializers.ModelSerializer.serializer_field_mapping.copy()
    )
    serializer_field_mapping.update(
        {fields.StreamField: wagtail_serializers.StreamField}
    )

    class Meta:
        model = BasePage
        fields = (
            "id",
            "slug",
            "title",
            "url",
            "last_published_at",
        )


class BlogPageSerializer(BasePageSerializer):
    class Meta:
        model = BlogPage
        fields = BasePageSerializer.Meta.fields


class PostPageSerializer(BasePageSerializer):
    tags = TagField()
    categories = CategoryField()
    header_image = ImageRenditionField("max-1000x800")
    content_type_str = serializers.SerializerMethodField()

    class Meta:
        model = PostPage
        fields = BasePageSerializer.Meta.fields + (
            "tags",
            "categories",
            "body",
            "header_image",
            "content_type_str",
        )

    def get_content_type_str(self, obj):
        return obj._meta.label_lower


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = (
            "id",
            "slug",
            "name",
        )


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = (
            "id",
            "slug",
            "name",
        )
