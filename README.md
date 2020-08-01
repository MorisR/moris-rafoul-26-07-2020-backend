# moris-rafoul-26-07-2020 - backend

## Installation
1) clone the repo 
2) install dependencies by running 
    ```
    npm install
    ```
3) add .env file to the root of the project
    - you can do that by remaming the ".env_template" file in the root directory to ".env" and filling in the correct values
    - read [".env file"](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/40) for more info about the values and purpose of each field
4) initialize the postgres database by rinning the following command
    ```
    npm run buildDb
    ```
5) start the server using the followinig command
    ```
    npm start
    or 
    npm start dev
    ```



## Available Routes
- messages routes
    - [get /messages/sent](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/15)
    - [get /messages/received](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/16)
    - [get /messages/trash ](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/17)
    - [post /messages](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/18)
    - [post /message/delete/[messageId]](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/19)
    - [post /message/trash/[messageId]/[isTrashBoolean]](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/20)
    - [get /messages/[messageId]](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/22)
    - [post /message/markAsRead/[messageId]/[isReadBoolean]](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/36) 
- auth routes
    - [post /auth/login](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/22)
    - [get /auth/currentUser](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/24)
    - [get /auth/logout](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/25)
    - [post /auth/register](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/27)
    - [post /auth/deleteAccount](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/29)
    - [post /users](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/41)







