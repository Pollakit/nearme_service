web: gunicorn nearme.wsgi --log-file -
release: 
    python manage.py makemigrations accounts
    python manage.py makemigrations markets
    python manage.py makemigrations orders
    python manage.py makemigrations shops
    python manage.py migrate