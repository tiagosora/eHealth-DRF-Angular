from rest_framework import permissions


class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_patient

class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_doctor

class IsDean(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_dean

