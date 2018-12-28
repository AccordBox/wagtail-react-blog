from rest_framework import viewsets

from .models import BlogCategory, PostPage, Tag
from .serializers import CategorySerializer, PostPageSerializer, TagSerializer


class PostPageSet(viewsets.ModelViewSet):
    serializer_class = PostPageSerializer
    queryset = PostPage.objects.all()
    http_method_names = ['get']

    def get_queryset(self):
        queryset = PostPage.objects.all()
        category = self.request.query_params.get('category', None)
        tag = self.request.query_params.get('tag', None)
        if category is not None and category != '*':
            queryset = queryset.filter(categories__slug=category)
        if tag is not None and tag != '*':
            queryset = queryset.filter(tags__slug=tag)
        return queryset


class CategorySet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']


class TagSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    http_method_names = ['get']
