# Server

## Routes

All these routes are available from `/api/`.

### Authentication

Route | Description | Authentication
----- | ----------- | --------------
**POST** /login | Log an user | No
**POST** /passwordRecovery | Get a recovery password mail | No
**POST** /recovery/:token | Send a password change | No

### User

Route | Description | Authentication
----- | ----------- | --------------
**POST** /user | Add a new user | No
**PUT** /user | Edit logged user | Yes
**GET** /user | Get list of all users | No
**GET** /user/:id | Get user with specific id | No

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
**GET** /statistics/teams| Get numbers of teams | No