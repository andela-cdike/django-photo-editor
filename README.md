[![Build Status](https://travis-ci.org/andela-cdike/django-photo-editor.svg?branch=develop)](https://travis-ci.org/andela-cdike/django-photo-editor)
[![Coverage Status](https://coveralls.io/repos/github/andela-cdike/django-photo-editor/badge.svg?branch=develop)](https://coveralls.io/github/andela-cdike/django-photo-editor?branch=develop)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/andela-cdike/django-photo-editor/badges/quality-score.png?b=develop)](https://scrutinizer-ci.com/g/andela-cdike/django-photo-editor/?branch=develop)

# django-photo-editor

### Overview
Photomagick is a basic photo editing web application. It also allows users share their images on Facebook when they are satisfied with their creations. Read more on the PROJECTPLAN.md file located in the assets directory.


### Pre-requisites
+ Python version >= 2.7. Get it [here](https://www.python.org/downloads/release/python-2711/).
+ [Postgres](https://www.postgresql.org/download/)
+ [NodeJS and NPM](https://docs.npmjs.com/getting-started/installing-node)
+ Have a postgresSQL database called bucketlist_db.

### optional
+ [virtualenv](https://virtualenv.pypa.io/en/stable/installation/)


### Installation
Follow the steps below to install photomagick on your computer:

1. Clone this repository to the folder where you would like it installed on your machine.
2. In the project root, add a `.env.yml` file to hold all your environment variables. The variables below must be given a value
    ```cmd
    SECRET_KEY:
      'very-complex-secret-key'
    DB_USER:
      'john_doee'
    DB_PASSWORD:
      'hidden'
    CLOUDINARY_CLOUD_NAME:
      'your-cloudinary-cloud-name'
    CLOUDINARY_API_KEY:
      'your-cloudinary-api-key'
    CLOUDINARY_API_SECRET:
      'your-cloudinary-api-secret'
    FACEBOOK_KEY:
      'your-facebook-key'
    FACEBOOK_SECRET:
      'your-facebook-secret'
    ```

3. It is recommended that you create a virtual environment here before proceeding with installation: 
    ```$ mkvirtualenv name_of_virtual_environment```

4. Install all project's dependencies both backend and frontend by running the following commands in order (from project root):
    ```cmd
    $ pip install -r requirements.txt
    $ npm install
    $ bower install
    ```

5. To setup static files and database migrations, run (also in the project root):
    ```cmd
    $ python photo_magick/manage.py collectstatic
    $ python photo_magick/manage.py makemigrations
    $ python photo_magick/manage.py migrate
    ```

### Run project locally
Run ```$ python photo_magick/manage.py runserver``` to start the server.

### Tests
To run tests:
    ```$ python photo_magick/manage.py test --settings=photo_magick.settings.test```

For coverage report:
    ```cmd
    $ coverage run --source=photo_editor photo_magick/manage.py test photo_magick --noinput --settings=photo_magick.settings.test
    $ coverage report -m
    ```

## License
GNU GPL

## Demo
Visit [PhotoMagick](https://photomagick.herokuapp.com/) to play with the live app on heroku.
