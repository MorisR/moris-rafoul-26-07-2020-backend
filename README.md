# moris-rafoul-26-07-2020 - backend

## Installation
1) clone the repo 
2) install dependencies 
    ```
    npm install
    ```
3) add .env file to the root of the project
    - you can do that by remaming the ".env_template" file in the root  directory and putting in the correct values
    - read [".env file"](#40) for more info about each field in the .env file

## Available Routes
- messages routes
    - [get /messages/sent](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/15)
    - [get /messages/received](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/16)
    - [get /messages/trash ](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/17)
    - [post /messages](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/18)
    - [post /message/delete/[messageId]](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/19)
    - [post /message/trash/[messageId]/[isTrashBoolean]](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/20)
    - [get /messages/[messageId]](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/22)
    - [post /message/markAsRead/[messageId]/[isReadBoolean]](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/36) 
- auth routes
    - [post /auth/login](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/22)
    - [get /auth/currentUser](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/24)
    - [get /auth/logout](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/25)
    - [post /auth/register](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/27)
    - [post /auth/deleteAccount](https://github.com/MorisR/moris-rafoul-26-07-2020/issues/29)








