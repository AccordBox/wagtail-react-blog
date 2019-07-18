from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from blog.api import api_router, blog_router

urlpatterns = []
if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [
    re_path(r'^api/cms/', api_router.urls),
    re_path(r'^api/blog/', include(blog_router.urls)),

    re_path(r'^django-admin/', admin.site.urls),
    re_path(r'^admin/', include(wagtailadmin_urls)),
    re_path(r'^documents/', include(wagtaildocs_urls)),

    re_path(r'', TemplateView.as_view(template_name="home.html"), name='home'),
    # This is tricky, Wagtail admin can not work if we remove the last line
    re_path(r'', include(wagtail_urls)),
]
