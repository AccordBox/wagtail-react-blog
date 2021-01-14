from rest_framework import serializers

from .fields import TagField
from .models import BlogCategory, PostPage, Tag


class PostPageSerializer(serializers.ModelSerializer):
    api_tags = TagField(source="tags")

    class Meta:
        model = PostPage
        fields = (
            "id",
            "slug",
            "title",
            "api_tags",
        )


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
