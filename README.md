## Introduction

This project is from book [Build SPA with React and Wagtail](https://leanpub.com/react-wagtail)

## Objectives

This book will teach you how to build a `SPA` (single-page application) using `React` and `Wagtail CMS`.

By the end of this course, you will be able to:

1. Understand `Docker` and use `Docker Compose` to do development
1. Build a REST API for Wagtail CMS
1. Use the Django shell to test code and check data.
1. Test the REST API and generate test coverage report
1. Use the `factory` package to help create test data
1. Build a React app from `create-react-app`
1. Understand React Components and the component lifecycle
1. Understand React router
1. Use `Storybook` to develop React Components
1. Test React components and the frontend app
1. Make `React app` work with Wagtail preview
1. Deploy the production app to DigitalOcean

## Tech

* Python 3.8
* Django 3.1
* Wagtail 2.10
* DRF 3.12
* Node 12
* React 16.14
* React Router
* Jest

## How to run on local

You need Docker and Docker Compose and you can install it here [Get Docker](https://docs.docker.com/get-docker/)

```bash
$ git clone https://github.com/AccordBox/wagtail-react-blog react_wagtail
$ cd react_wagtail
$ docker-compose up --build
```

Now open a new terminal to import data and change password.

```bash
$ docker-compose exec web python manage.py load_initial_data
$ docker-compose exec web python manage.py changepassword admin
```

Now you can check on 

* [http://127.0.0.1:3000](http://127.0.0.1:3000)
* [http://127.0.0.1:6006](http://127.0.0.1:6006)
* [http://127.0.0.1:8000/cms-admin](http://127.0.0.1:8000/cms-admin)

## Demo

The demo is also online if you want to check.

* [React app Demo](http://react-wagtail.accordbox.com)
* [Storybook Demo](http://react-wagtail-storybook.accordbox.com)
* [Wagtail Demo](http://react-wagtail-api.accordbox.com/cms-admin)

