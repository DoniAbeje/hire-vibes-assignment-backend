
## Description

The source code is structured into three separate feature based modules.
- Comment module
- Film module
- User module
 ```

├───comment
│   │   comment.controller.spec.ts
│   │   comment.controller.ts
│   │   comment.module.ts
│   │   comment.repository.ts
│   │   comment.service.spec.ts
│   │   comment.service.ts
│   │
│   ├───dto
│   │       add-comment.dto.ts
│   │       comment-response.dto.ts
│   │       comment-response.spec.ts
│   │
│   └───schema
│           comment.schema.ts
│
├───film
│   │   film.controller.spec.ts
│   │   film.controller.ts
│   │   film.module.ts
│   │   film.repository.spec.ts
│   │   film.repository.ts
│   │   film.service.spec.ts
│   │   film.service.ts
│   │
│   ├───dto
│   │       create-film.dto.ts
│   │       film-response.dto.ts
│   │       film-response.spec.ts
│   │
│   └───schema
│           film.schema.ts
│
└───user
    │   jwt.guard.ts
    │   jwt.strategy.ts
    │   local.guard.ts
    │   local.strategy.spec.ts
    │   local.strategy.ts
    │   user.controller.spec.ts
    │   user.controller.ts
    │   user.module.ts
    │   user.repository.spec.ts
    │   user.repository.ts
    │   user.service.spec.ts
    │   user.service.ts
    │
    ├───dto
    │       authenticate-user.dto.ts
    │       register-user.dto.ts
    │       user-response.dto.ts
    │       user-response.spec.ts
    │
    └───schema
            user.schema.ts
 ```
In each module controllers handle the web layer by accepting requests and then transfering them to service layer. The service layer handles the business logic by further processing the request. The bottom layer is the data access layer that is responsible for data persistence and query. Each dependency between these three layers is based on abstraction not on concrete implementation which is automatically fulfilled by the IoC container. This makes the codebase to be highly extandable.

## Installation

```bash
$ npm install
```

## Configuration
Copy the content inside `.env.default` to a new `.env` file. Then replace the value for DB_CONNECTION with your database connection string.
Your `.env` file should be something like this.
```env
DB_CONNECTION=mongodb://localhost:27017/hire-vibes-db
JWT_SECRET=KLASD9080ASDF-8-98-098JW
JWT_EXPIRES_IN=6d
```
## Seeding
The following command inserts three films with one comment for each.
```bash
# seed
$ npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
When writing unit tests, I gave much emphasis to service classes which hold almost all the business logic. Since repositories highly depend on the underlaying data access layer and controllers depend on request scope context, I believe they should be addressed more by integration tests.

#### Test Coverage
![Test result](https://user-images.githubusercontent.com/26971929/150219163-1bc8e901-8653-4ca9-bebe-fe9f2499125e.png "Test result")
```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

You can test the deployed product and swagger documentation here [https://hire-vibes-api.herokuapp.com/doc/](https://hire-vibes-api.herokuapp.com/doc/)
