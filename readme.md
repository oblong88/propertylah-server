# Module 3 Project - PropertyLah Backend (PropertyGuru Clone)

# Background

PropertyLah is clone of PropertyGuru, the most popular real estate portal in Singapore.

This purpose of this project is build a backend API to demonstrate the following:

1. Structure backend code with N-Tier Architecture
1. Implement API using Express
1. Implement ORM using Sequelize
1. Implement one middleware as a group
1. Connect ORM to PostgresSQL database and map objects to tables
1. Deploy to Heroku
1. Each learner to implement at least one API endpoint

# Architecture File/Folder Structure

The project uses N-Tier Architecture and the base files and folder structure are as follows:

```
|-  controllers
|   |- answerController.js
|   |- articleController.js
|   |- propertyController.js
|   |- questionController.js
|   |- userController.js
|-  routes
|   |- answerRoute.js
|   |- articleRoute.js
|   |- propertyRoute.js
|   |- questionRoute.js
|   |- userRoute.js
|-  models
|   |- answerModel.js
|   |- articleModel.js
|   |- propertyModel.js
|   |- questionModel.js
|   |- userModel.js
|-  services
|   |- answerService.js
|   |- articleService.js
|   |- propertyService.js
|   |- questionService.js
|   |- userService.js
|-  node_modules
|-  app.js
|-  server.js
|-  config.env
```

# Environments

Enviroment variables are configured in config.env.

To start in dev environment

`npm run`

Prod Environment

`npm run start:prod`

dev environment will sync sequelize models to SQL tables before starting the server.
The correspondng DB username and password will also be used, depending on the env.

# ER Diagram

To be updated.

# Database Naming Conventions

Production and Development DB Name: `propertylah_db`

All table names to use lowercase, singular nouns e.g. `user`, `property`, etc.

All field names to use snake case and lowercase e.g. `first_name`, `last_name`, etc.

All primary keys to be named `id` to prevent ambiguity.

All foreign keys to named relative to the table being referenced e.g. an answer referencing a question should have the foreign key `question_id`

# Endpoints

Routes have already been configured in the respective routes files. You can proceed to add more endpoints if needed.

## Users (Daniel)

### Create a User

POST /api/v1/users/

### Get a User

GET /api/v1/users/:id

### Get All Users

GET /api/v1/users

### Update a User

PATCH /api/v1/users/:id

### Delete a User

DELETE /api/v1/users/:id

## Authentication (Daniel)

### Sign Up a User

POST /api/v1/users/signup

### Log In a User

POST /api/v1/users/login

### Update Password

PATCH /api/v1/users/updatePassword

### Log Out a User

POST /api/v1/users/logout

## Properties (Xin Kai)

### Create a Property

POST /api/v1/properties/

### Get a Property

GET /api/v1/properties/:id

### Get All Properties

GET /api/v1/properties

### Update a Property

PATCH /api/v1/properties/:id

### Delete a Property

DELETE /api/v1/properties/:id

## Questions (Tino)

### Create a Question

POST /api/v1/questions/

### Get a Question

GET /api/v1/questions/:id

### Get All Questions

GET /api/v1/questions

### Update a Question

PATCH /api/v1/questions/:id

### Delete a Question

DELETE /api/v1/questions/:id

## Answers (Poh Liang)

### Create an Answer

POST /api/v1/answers/

### Get an Answer

GET /api/v1/answers/:id

### Get All Answers

GET /api/v1/answers

### Update an Answer

PATCH /api/v1/answers/:id

### Delete an Answer

DELETE /api/v1/answers/:id

## Articles (Melissa)

### Create an Article

POST /api/v1/articles/

### Get an Article

GET /api/v1/articles/:id

### Get All Articles

GET /api/v1/articles

### Update an Article

PATCH /api/v1/articles/:id

### Delete an Article

DELETE /api/v1/articles/:id

# Git Strategy

## Trunk-based Development

- Create a new branch from master, or fork the master repo.
- Do a PR when completed.
- Note: remember to pull latest code before doing a PR

For more info: https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development

# Testing (Optional)

To implement unit tests using Jest.

# Logging (Optional)

To implement logging using winston logger.

# Security Middleware (Optional)

To add security middleware

# CI/CD

To be implemented using Github actions
