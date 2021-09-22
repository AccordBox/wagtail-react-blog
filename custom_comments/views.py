from django.contrib.contenttypes.models import ContentType
from django_comments.models import Comment
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import redirect
from wagtail.admin import messages
from wagtail.contrib.modeladmin.views import DeleteView
from .serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    http_method_names = ["get", "post"]

    def get_queryset(self):
        queryset = self.queryset.filter(is_removed=False)
        content_type = self.request.query_params.get('content_type')
        object_pk = self.request.query_params.get('object_pk')
        if content_type:
            app_label, model = content_type.split(".")
            content_type_instance = ContentType.objects.get(app_label=app_label, model=model)
            queryset = queryset.filter(content_type=content_type_instance)
        if object_pk:
            queryset = queryset.filter(object_pk=object_pk)

        return queryset


class CommentMentionViewSet(viewsets.ViewSet):

    def list(self, request):
        content_type = request.GET.get("content_type")
        object_pk = request.GET.get("object_pk")

        app_label, model = content_type.split(".")
        content_type = ContentType.objects.get(app_label=app_label, model=model)

        comment_model = Comment
        data = comment_model.objects.filter(
            content_type=content_type, object_pk=object_pk,
        ).filter(
            is_removed=False
        ).values(
            "user_name"
        ).order_by('user_name').distinct()

        resp = {"result": list(data)}
        return Response(resp)


class CommentDeleteView(DeleteView):

    page_title = "Delete comment"

    def post(self, request, *args, **kwargs):
        try:
            self.instance.is_removed = True
            self.instance.save()
            msg = f"{self.verbose_name} '{self.instance}' deleted."
            messages.success(request, msg)
            return redirect(self.index_url)
        except Exception as e:
            raise e
