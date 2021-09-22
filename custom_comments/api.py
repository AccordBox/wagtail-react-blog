from rest_framework.routers import SimpleRouter
from .views import CommentViewSet, CommentMentionViewSet

# Create a router and register our viewsets with it.
comment_router = SimpleRouter()
comment_router.register(r'comments', CommentViewSet)
comment_router.register(r'comment-mentions', CommentMentionViewSet, basename='comment-mention')
