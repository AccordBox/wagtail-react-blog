from rest_framework.fields import Field


class TagField(Field):
    def to_representation(self, tags):
        try:
            return [
                {"name": tag.name, "slug": tag.slug, "id": tag.id} for tag in tags.all()
            ]
        except Exception:
            return []


class CategoryField(Field):
    def to_representation(self, categories):
        try:
            return [
                {
                    "name": category.blog_category.name,
                    "slug": category.blog_category.slug,
                    "id": category.blog_category.id,
                }
                for category in categories.all()
            ]
        except Exception:
            return []
