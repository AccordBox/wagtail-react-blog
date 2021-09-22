## Introduction

This project is from book [Build SPA with React and Wagtail](https://leanpub.com/react-wagtail)

## Demo

The demo is also online if you want to check.

* [React app Demo](http://react-wagtail.accordbox.com)

## Objectives

This book will teach you how to build a `SPA` (single-page application) using `React` and `Wagtail CMS`.

By the end of this course, you will be able to:

1. Understand `Docker` and use `Docker Compose` to do development
1. Create blog models to work with Wagtail.
1. Learn how to write serializer for Django models.
1. Build a REST API for Wagtail CMS
1. Use the `factory` package to help create test data
1. Test the REST API and generate test coverage report
1. Build a React app from `create-react-app`
1. Learn React Function Component, and React hooks.
1. Use `Tailwind CSS` to build clean and responsive UI.
1. Understand React router
1. Make `React app` work with Wagtail preview
1. Build comment system based on `django-contrib-comments` which support `Generic Relations`
1. Use `Tribute.js` to add `Mention` and `Emoji` support to the comment form.
1. Learn to use `SWR` to build lazy load comment list.
1. Test React component using `Jest` and `@testing-library` family of packages.
1. Deploy the production app to DigitalOcean

## Tech

* Python 3.8
* Django 3.2
* Wagtail 2.14
* Node 14
* Tailwind CSS
* React 17
* React Router
* Jest

## How to run on local

### Edit /etc/hosts

Below command is for Mac, but you can ask Google for help if you use other OS.

```bash
$ sudo vi /etc/hosts

# add to the bottom
127.0.0.1 api.local.test

# clear DNS cache
$ sudo killall -HUP mDNSResponder 
```

```bash
$ ping www.local.test
```

### Backend API

You can use code below to run dev application on your local env.

You need Docker and Docker Compose and you can install it here [Get Docker](https://docs.docker.com/get-docker/)

```bash
$ git clone https://github.com/AccordBox/wagtail-react-blog react_wagtail
$ cd react_wagtail
$ docker-compose up --build
```

Now open a new terminal to import data and change password.

```bash
$ docker-compose exec web python manage.py load_initial_data
# change password for admin
$ docker-compose exec web python manage.py changepassword admin
```

Now you can check on

* [http://api.local.test:8000/cms-admin](http://api.local.test:8000/cms-admin)

### React

It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to install `node` on your local env.

```bash
$ node -v
v14.17.4
```

```bash
$ cd frontend
$ npm install -g yarn
$ yarn -v
1.22.11
$ yarn install
$ yarn start
```

Now you can check on

* [http://localhost:3000/](http://localhost:3000/)

