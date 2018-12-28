# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from django import forms
from django.db import models
from django.http import Http404, HttpResponse
from django.utils.dateformat import DateFormat
from django.utils.formats import date_format

from wagtail.admin.edit_handlers import (FieldPanel, FieldRowPanel,
                                         InlinePanel, MultiFieldPanel,
                                         PageChooserPanel, StreamFieldPanel)
from wagtail.api import APIField
from wagtail.contrib.forms.models import AbstractEmailForm, AbstractFormField
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.core import blocks
from wagtail.core.fields import RichTextField, StreamField
from wagtail.core.models import Page
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from blog.blocks import TwoColumnBlock
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.tags import ClusterTaggableManager
from rest_framework.fields import DateTimeField
from taggit.models import Tag as TaggitTag
from taggit.models import TaggedItemBase
from wagtailmd.fields import MarkdownAPIField
from wagtailmd.utils import MarkdownField, MarkdownPanel

from .fields import CategoryField, TagField


class BlogPage(Page):
    description = models.CharField(max_length=255, blank=True,)

    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full")
    ]


class PostPage(Page):
    body = MarkdownField()
    date = models.DateTimeField(verbose_name="Post date", default=datetime.datetime.today)
    excerpt = MarkdownField(
        verbose_name='excerpt', blank=True,
    )

    header_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )

    categories = ParentalManyToManyField('blog.BlogCategory', blank=True)
    tags = ClusterTaggableManager(through='blog.BlogPageTag', blank=True)

    content_panels = Page.content_panels + [
        ImageChooserPanel('header_image'),
        MarkdownPanel("body"),
        MarkdownPanel("excerpt"),
        FieldPanel('categories', widget=forms.CheckboxSelectMultiple),
        FieldPanel('tags'),
    ]

    settings_panels = Page.settings_panels + [
        FieldPanel('date'),
    ]

    api_fields = ('header_image',
                  APIField('header_image_url',
                           serializer=ImageRenditionField(
                               'original', source='header_image')),
                  APIField('owner'),
                  APIField('api_categories', serializer=CategoryField(source='categories')),
                  APIField('api_tags', serializer=TagField(source='tags')),
                  APIField('pub_date', serializer=DateTimeField(format='%d %B %Y', source='date')),
                  APIField(
                      'md_excerpt',
                      serializer=MarkdownAPIField(source='excerpt'),
                  ),
                  APIField(
                      'md_body',
                      serializer=MarkdownAPIField(source='body'),
                  ),
                  )

    @property
    def blog_page(self):
        return self.get_parent().specific

    def get_context(self, request, *args, **kwargs):
        context = super(PostPage, self).get_context(request, *args, **kwargs)
        context['blog_page'] = self.blog_page
        context['post'] = self
        return context


@register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=80)

    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey('PostPage', related_name='post_tags')


@register_snippet
class Tag(TaggitTag):
    class Meta:
        proxy = True
