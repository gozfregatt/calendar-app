from django.db import models

from django_apps.employees.models import Employee

class Appointment(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.TextField()
    end_time = models.TextField()
    employees = models.ManyToManyField(Employee, related_name='appointments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_time']

    def __str__(self):
        return self.title