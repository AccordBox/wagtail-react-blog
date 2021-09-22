from django.urls import path, include
from .api import comment_router

urlpatterns = [
    path('api/v1/', include(comment_router.urls)),
]
