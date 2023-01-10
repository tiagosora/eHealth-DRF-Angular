#!/bin/bash

# rm drf_api/migrations/ -r

echo "CHECK"
python3 manage.py check
echo "MAKEMIGRATIONS"
python3 manage.py makemigrations drf_api
echo "SQLMIGRATE"
python3 manage.py sqlmigrate drf_api 0001
echo "MIGRATE"
python3 manage.py migrate