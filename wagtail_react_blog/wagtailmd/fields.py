from collections import OrderedDict

from rest_framework.fields import Field

from .templatetags.wagtailmd import markdown_filter


class MarkdownAPIField(Field):
    """
    Convert markdown to HTML
    """

    def to_representation(self, value):
        try:
            return markdown_filter(value)
        except Exception:
            return ''
