from django.contrib import admin
from django.contrib.auth.models import User
from .models import Bio

# Inline model for displaying bio in the User form


class BioInline(admin.StackedInline):
    model = Bio
    can_delete = False
    verbose_name_plural = 'Bio'

# Customize the User admin to include the bio inline


class UserAdmin(admin.ModelAdmin):
    inlines = (BioInline,)


# Re-register the User model with the custom admin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
