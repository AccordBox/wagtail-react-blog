from rest_framework import serializers

from .models import BlogCategory, PostPage, Tag


class PostPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostPage
        fields = ('id',
                  'slug',
                  'title',
                  )


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogCategory
        fields = ('id',
                  'slug',
                  'name',
                  )


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id',
                  'slug',
                  'name',
                  )
