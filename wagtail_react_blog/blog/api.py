from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.documents.api.v2.endpoints import DocumentsAPIEndpoint
from wagtail.images.api.v2.endpoints import ImagesAPIEndpoint

from rest_framework import routers

from .views import CategorySet, PostPageSet, TagSet

api_router = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_router.register_endpoint('pages', PagesAPIEndpoint)
api_router.register_endpoint('images', ImagesAPIEndpoint)
api_router.register_endpoint('documents', DocumentsAPIEndpoint)

# Below is custom router which has some advanced feature not implemented by Wagtail
blog_router = routers.DefaultRouter()
blog_router.register(r'post', PostPageSet)
blog_router.register(r'category', CategorySet)
blog_router.register(r'tag', TagSet)
