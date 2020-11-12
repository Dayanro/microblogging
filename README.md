# microblogging

The microblogging API allows users to post notes and that other people can see them, additionally to being able to 'mark' its favorites notes and to be able to list those that are marked as a favorites. CI is integrated into the repository by using Travis CI.

## Table of content

- [Prerequisites](#Prerequisites)
- [How to install](#How-to-install)
- [How to run](#How-to-run)
- [Usage](#Usage)
    - [1. Create Notes](#1.-Create-Notes)
    - [2. Retrieve Notes](#2.-Retrieve-Notes)
    - [3. Retrieve a Note](#3.-Retrieve-a-Note)
    - [4. Bookmark a Note](#4.-Bookmark-a-Note)
    - [5. Unmark Notes as Favorites](#5.-Unmark-Notes-as-Favorites)
    - [6. Consult Marked Notes](#6.-Consult-Marked-Notes)
- [How to run tests](#How-to-run-tests)
- [Techologies](#Techologies)
- [Author](#Author)
- [License](#License)
- [Project board](#Project-board)


## Prerequisites

- Make sure that you have Node.js and npm installed.
- Set environment variables:

- Create a .env file in the project root directory:

```bash
 $ touch .env
```

- Add MongoDB and Express variables:

```
PROTOCOL=mongodb+srv:
DB_USERNAME=your_db_user
DB_PASSWORD=_your_db_password
DB_HOSTNAME=your_mongo_cluster
DB_NAME=your_db_name
DB_REMOTE=your_mongo_connection_string
```
_You can consult the .env.template file to use it as an example of what you need, the PORT is not strictly necessary._


## How to install

Clone this repository to your local machine
```
$ git clone https://github.com/Dayanro/microblogging.git
```

Before you open the project, you have to navigate into the cloned folder because that’s where git is initialized:
```
$ cd microblogging
```

Run the following commands in your terminal:
```
$ npm i
```
_This will install all the required libraries and dependencies._

## How to run

For dev (development) mode, you should run the following command on the project root directory:
```
$ npm run dev
```

A seed file is provided in order to create tests users for using the API, in case that the provided db is not used. Before running the seed file, please ensure that you already have a connection to the db.

the seed file can be found on:

```
$ src/bin/seed.js
```

to run seed file

```
$ node dist-src/bin/seed.js
```


## Usage

### **1. Create Notes**

Allows the creation of a note, with the authenticated user as author

- **URL**

`POST /notes`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **Data Params**

```
content=[string]
date=[string] format YYYY/MM/dd
```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

```
{
    "_id": "5facc3c7c5dcbb1377b83924",
    "content": "test10",
    "date": "2020-10-06T00:00:00.000Z",
    "author": "5fab5e574816c21856cbe91a",
    "__v": 0
}
```
- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Invalid Credentials }`

  OR

  - **Code:** 404 BAD_REQUEST <br />
    **Content:** `{ Invalid request missing data }`

- **Sample Call:**

```
curl --location --request POST 'http://localhost:3000/api/notes' \
--header 'Authorization: Basic VXNlcjpVc2VyMTIz' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "test10",
    "date": "2020-10-06T00:00:00.000Z"
}'
```

### **2. Retrieve Notes**

Retrieves notes, uses pagination

- **URL**

`GET /notes?page=1&limit=20`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **URL Params**

```
page=[integer]
limit=[integer]
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

```
[
    
    {
        "_id": "5fab5ef0e41a6918b4609e6c",
        "content": "test1",
        "date": "2020-10-06T00:00:00.000Z",
        "author": {
            "favorites": [
                "5fab6772256d571f384b79d5",
                "5fab6301e41a6918b4609e6e",
                "5fab5f16e41a6918b4609e6d"
            ],
            "_id": "5fab5e574816c21856cbe91a",
            "username": "User",
            "createdAt": "2020-11-11T03:45:27.663Z",
            "updatedAt": "2020-11-12T04:10:30.176Z",
            "__v": 0
        },
        "__v": 0
    },
    {
        "_id": "5fab5f16e41a6918b4609e6d",
        "content": "test2",
        "date": "2020-10-06T00:00:00.000Z",
        "author": {
            "favorites": [
                "5fab6772256d571f384b79d5",
                "5fab6301e41a6918b4609e6e",
                "5fab5f16e41a6918b4609e6d"
            ],
            "_id": "5fab5e574816c21856cbe91a",
            "username": "User",
            "createdAt": "2020-11-11T03:45:27.663Z",
            "updatedAt": "2020-11-12T04:10:30.176Z",
            "__v": 0
        },
        "__v": 0
    }
]
```

- **Error Response:**

  - Code: 401 UNAUTHORIZED <br />
    Content:`{ Invalid Credentials }`

  OR

  - Code: 404 BAD_REQUEST <br />
    Content: `{ Missing pagination parameters }`

- **Sample Call:**

```
curl --location --request GET 'http://localhost:3000/api/notes?page=1&limit=20' \
--header 'Authorization: Basic VXNlcjpVc2VyMTIz'
```

### **3. Retrieve a Note**

Retrieves a specific note

- **URL**

`GET /notes/:notesId`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **URL Params**

```
notesId=[string]
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

```
{
    "_id": "5fab5ef0e41a6918b4609e6c",
    "content": "test1",
    "date": "2020-10-06T00:00:00.000Z",
    "author": {
        "favorites": [
            "5fab6772256d571f384b79d5",
            "5fab6301e41a6918b4609e6e",
            "5fab5f16e41a6918b4609e6d"
        ],
        "_id": "5fab5e574816c21856cbe91a",
        "username": "User",
        "createdAt": "2020-11-11T03:45:27.663Z",
        "updatedAt": "2020-11-12T04:10:30.176Z",
        "__v": 0
    },
    "__v": 0
}
```

- **Error Response:**

  - Code: 401 UNAUTHORIZED <br />
    Content:`{ Invalid Credentials }`

  OR

  - Code: 404 BAD_REQUEST <br />
    Content: `{ Missing note ID}`

- **Sample Call:**

```
$ curl --location --request GET 'http://localhost:3000/api/notes/5fab5ef0e41a6918b4609e6c' \
--header 'Authorization: Basic VXNlcjpVc2VyMTIz'
```

### **4. Bookmark a Note**

Marks a note as favorite for the authenticated user

- **URL**

`POST users/notes/:notesId/favorite`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **URL Params**

```
notesId=[string]
```

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - Code: 401 UNAUTHORIZED <br />
    Content:`{ Invalid Credentials }`

  OR

  - Code: 404 BAD_REQUEST <br />
    Content: `{ Invalid request missing data }`

- **Sample Call:**

```
curl --location --request POST 'http://localhost:3000/api/users/notes/5facc576c5dcbb1377b83925/favorite' \
--header 'Authorization: Basic VXNlcjpVc2VyMTIz'
```


### **5. Unmark Notes as Favorites**

Delete a favorite note for the authenticated user

- **URL**

`DELETE users/notes/:notesId/favorite`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **URL Params**

```
noteId=[string]
```

- **Success Response:**

  - **Code:** 204 <br />

- **Error Response:**

  - Code: 401 UNAUTHORIZED <br />
    Content:`{ Invalid Credentials }`

  OR

  - Code: 404 BAD_REQUEST <br />
    Content: `{ Invalid request missing data }`

- **Sample Call:**

```
curl --location --request DELETE 'http://localhost:3000/api/users/notes/5facc576c5dcbb1377b83925/favorite' \
--header 'Authorization: Basic VXNlcjpVc2VyMTIz'
```

### **6. Consult Marked Notes**

Check the notes marked as favorites of the authenticated user.

- **URL**

`GET /users/notes/favorite`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:**

```
[
    {
        "_id": "5fab6301e41a6918b4609e6e",
        "content": "test3",
        "date": "2020-10-06T00:00:00.000Z",
        "author": "5fab5e574816c21856cbe91a",
        "__v": 0
    },
    {
        "_id": "5fab6fc1eabb7e240a4f0ec4",
        "content": "test5",
        "date": "2020-10-06T00:00:00.000Z",
        "author": "5fab5e574816c21856cbe91a",
        "__v": 0
    }
]
```

- **Error Response:**

  - Code: 401 UNAUTHORIZED <br />
    Content:`{ Invalid Credentials }`

  OR

  - Code: 404 BAD_REQUEST <br />
    Content: `{ Missing user ID }`

- **Sample Call:**

```
curl --location --request GET 'http://localhost:3000/api/users/notes/favorite' \
--header 'Authorization: Basic VXNlcjpVc2VyMTIz'
```

## How to run tests
On the project root directory you can run the test directly from the command line the following: 
```
 $ npm run tests
```

## Techologies

- [Node](https://nodejs.org/es/) - Is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/es/) - Web Applications
  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [Babel](https://babeljs.io/) -Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.
- [MongoDB](https://www.mongodb.com/) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era
- [Jest](https://jestjs.io/) - Jest is a JavaScript testing framework.
- [node-mocks-http](https://github.com/howardabrams/node-mocks-http/) - Mocks Express http objects for testing routes.

### Additional Tools
- [Project Management](https://github.com/features/project-management/) - You can manage your work on GitHub by creating issues to track ideas, enhancements, tasks, or bugs.
- [Travis](https://travis-ci.com/) - Is a Continuous integration platform that supports the development process by automatically building and testing code changes, providing immediate feedback on the success of the change.
- [Postman](https://www.postman.com/) - Postman is a collaboration platform for API development.
- [Mongoose](https://mongoosejs.com/) - The mongodb node.js driver in charge of providing elegant mongodb object modeling for node.js

## Author

- **Dayan Rojas**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Project board

[Project board - Microblogging](https://github.com/users/Dayanro/projects/3)