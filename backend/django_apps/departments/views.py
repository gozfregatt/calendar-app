from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Department
from django_apps.employees.models import Employee

from .serializers import DepartmentSerializer
from django_apps.employees.serializers import EmployeeSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentEmployeesView(APIView):
    def get(self, request, department_id):
        try:
            # Fetch the department by ID
            department = Department.objects.get(pk=department_id)
            # Get all employees of this department
            employees = department.employees.all()
            serializer = EmployeeSerializer(employees, many=True)
            response = Response(serializer.data, status=status.HTTP_200_OK)
            # response["Access-Control-Allow-Origin"] = "http://localhost:3000"
            # response["Access-Control-Allow-Credentials"] = "true"
            # response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
            # response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            return response        
        except Department.DoesNotExist:
            return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)
        

    # Add OPTIONS method to handle preflight requests
    def options(self, request, *args, **kwargs):
        return Response(
            status=status.HTTP_200_OK,
            headers={
                'Access-Control-Allow-Origin': 'http://localhost:5000',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        )