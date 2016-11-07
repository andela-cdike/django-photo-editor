from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Permission only allow owners of an object access to
    read, edit and delete it.
    Assumes the model instance has an `owner` attribute
    """
    def has_object_permission(self, request, view, obj):
        # only owners of an object are allowed access
        return obj.owner == request.user
