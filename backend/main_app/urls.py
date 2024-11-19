from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django_apps.departments.views import DepartmentViewSet, DepartmentEmployeesView
from django_apps.employees.views import EmployeeViewSet
from django_apps.appointments.views import AppointmentViewSet

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/departments/<int:department_id>/employees/', DepartmentEmployeesView.as_view(), name='department-employees'),

]