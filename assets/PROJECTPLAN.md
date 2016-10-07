# Project Plan for Checkpoint 4

```
Project       Django Powered Photo Editing Application

Title         PhotoMagick

Start Date    15-09-2016

End Date      30-09-2016
```

### Application Overview

#### Overview
Photomagick is a basic photo editing web application. It also allows users share their images on Facebook when they are satisfied with their creations.


#### Features
+ Upload images from your local computer
+ Common image filters
+ Common image effects
+ Adjust common image properties
+ Facebook login
+ Share images on Facebook


#### Technologies
The following technologies were employed in creating photomagick:
+ [Django](https://www.djangoproject.com/) - a high-level Python Web framework that encourages rapid development and clean, pragmatic design.
+ [Django REST Framework](http://www.django-rest-framework.org/) - Django REST framework is a powerful and flexible toolkit for building Web APIs.
+ [PostgreSQL](https://www.postgresql.org/) - a powerful, open source object-relational database system.
+ [Bower](https://bower.io/) - package that manages components that contain HTML, CSS, JavaScript, fonts or image files.
+ [Django-bower](https://github.com/nvbn/django-bower) - Easy way to use bower with your Django project.
+ [React](https://facebook.github.io/react/) - a Javascript library for building user interfaces.
+ [React-bootstrap](https://react-bootstrap.github.io/) - CSS framework rebuilt for React.
+ [Webpack](https://webpack.github.io/) - a module bundler.
+ [React Packery Component](http://packery.metafizzy.co/) - Javascript library that makes gapless and draggable layouts.
+ [Axios](https://github.com/mzabriskie/axios) - Promise based HTTP client for the browser and node.js.
+ [Pillow](https://pillow.readthedocs.io/en/3.4.x/) - Python Imaging Library
+ [Facebook Javascript SDK] (https://developers.facebook.com/docs/javascript) - A rich set of client-side functionality for adding Social plugins, Facebook Login and Graph API calls.
+ [Python social auth] (http://psa.matiasaguirre.net/) - An easy to setup social authentication/registratin mechanism with support for several frameworks and auth providers.


### Tasks and Deliverables

Task Name | Points
--------- | ------
Set up project | 1
Write tests for models | 1
Write tests for views | 2
Write models for the app | 1
Implement image upload and delete functionality | 2
Implement image processing functionality | 3
Write views to handle processing images | 3
Add nodejs and reactjs support | 2
Design the frontend | 3
Add model and views for image processor tools | 1
Add folder actions and states | 3
Add actions and reducers for filter and effect tools | 2
Add actions and reducers for enhance tools | 2
Add actions and reducers for misc tools | 1
User should be able to upload images | 3
User should be able to undo changes | 1
User should be able to save changes | 1
User should be able to delete/rename folder | 2
User should be able to delete/rename image | 2
User should be able to see status of operations | 1
User should be able to login with facebook | 1
Connect JWT to Facebook authentication | 1
User should be able to share photos on Facebook | 2
Add test coverage | 1
Check code quality with scrutinizer | 1
Host project on Heroku | 2
