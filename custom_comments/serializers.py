from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django_comments.models import Comment
from django_comments.signals import comment_was_posted
from django.utils import timezone
from django.conf import settings
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    content_type = serializers.CharField()
    pretty_comment = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = (
            "pk",
            "content_type",
            "object_pk",

            "user_name",
            "user_email",
            "comment",
            "pretty_comment",
            "submit_date",
        )

    def get_pretty_comment(self, obj):
        import emoji
        from django.template.defaultfilters import linebreaks
        return linebreaks(emoji.emojize(obj.comment, use_aliases=True))

    def create(self, validated_data):
        # django_comments/views/comments.py
        # django_comments/forms.py
        app_label, model = validated_data.get("content_type").split(".")
        content_type = ContentType.objects.get(app_label=app_label, model=model)
        object_pk = validated_data.get("object_pk")

        try:
            model = apps.get_model(app_label, model)
            model.objects.get(pk=object_pk)
        except Exception:
            raise Exception('can not find comment target object')

        comment_data = dict(
            content_type=content_type,
            object_pk=object_pk,
            user_name=validated_data["user_name"],
            user_email=validated_data["user_email"],
            comment=validated_data["comment"],
            submit_date=timezone.now(),
            site_id=getattr(settings, 'SITE_ID'),
            is_public=True,
            is_removed=False,
        )

        instance = super().create(comment_data)

        comment_was_posted.send(sender=instance.__class__,
                                comment=instance,
                                request=self.context['request'])

        return instance
