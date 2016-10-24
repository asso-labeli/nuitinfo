# Server

## Routes

All these routes are available from `/api/`.

### User

Route | Description | Authentication
----- | ----------- | --------------
**POST** /user | Add a new user | No

### Team

Route | Description | Authentication
----- | ----------- | --------------
**POST** /team | Add a new team | Yes
**PUT** /team | Edit a team | Yes
**DELETE** /team | Remove a team | Yes

### Application

Route | Description | Authentication
----- | ----------- | --------------
**POST** /application/fromUser | Add a new application from a user | Yes
**POST** /application/fromTeam | Add a new application from a team | Yes

### Statistics

Route | Description | Authentication
----- | ----------- | --------------
**GET** /statistics/users | Get numbers of users | No