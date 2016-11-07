# Server

## Configuration

Rename the `/server/config/local.env.default.js` to `/server/config/local.env.js`, and add your configuration to this file.

## Authentication

When you `POST /login` and your credentials are good, you will receive a **token** in the response.
Insert the token in the **Authorization** header preceded by the string `JWT`.
For example : 

`
Authorization: JWT  XAiOiJKV1QiLCJOiJIUzI1NiJ9.eyJpZCI6IjU3ZmRmMzhk
`

When you want to logout, just remove the token from your application.

## Routes

All these routes are available from `/api/`.

### [Authentication](/server/doc/auth.md#authentication)

Route | Description | Authentication
----- | ----------- | --------------
**POST** /login | Log an user | No
**POST** /passwordRecovery | Get a recovery password mail | No
**POST** /recovery/:token | Send a password change | No

### [User](/server/doc/user.md#user)

Route | Description | Authentication
----- | ----------- | --------------
**POST** /user | Add a new user | No
**PUT** /user | Edit logged user | Yes
**GET** /user/me | Get informations on logged user | Yes
**GET** /user | Get list of all users | No
**GET** /user/:id | Get user with specific id | No

### [Team](/server/doc/team.md#team)

Route | Description | Authentication
----- | ----------- | --------------
**POST** /team | Add a new team | Yes
**PUT** /team | Edit a team | Yes
**DELETE** /team | Remove a team | Yes
**GET** /team/:id | Get team with specific id | No
**GET** /team | Get all teams | No
**POST** /team/kick | Kick a member | Yes
**POST** /team/leave | Leave a team | Yes

### [Application](/server/doc/application.md#application)

Route | Description | Authentication
----- | ----------- | --------------
**POST** /application/fromUser | Add a new application from a user | Yes
**POST** /application/fromTeam | Add a new application from a team | Yes
**POST** /application/accept | Accept an application | Yes
**POST** /application/refuse | Refuse an application | Yes
**GET** /application/forUser | Get applications for a user | Yes
**GET** /application/forTeam | Get applications for a team | Yes

### [Institution](/server/doc/institution.md#institution)

Route | Description | Authentication
----- | ----------- | --------------
**POST** /institution | Add a new institution | No
**GET** /institution | Get institutions | No

### [Statistics](/server/doc/statistics.md#statistics)

Route | Description | Authentication
----- | ----------- | --------------
**GET** /statistics/users | Get numbers of users | No
**GET** /statistics/teams| Get numbers of teams | No
**GET** /statistics/users/byInstitution | Get numbers of users by institution | No
**GET** /statistics/users/byYear | Get numbers of users by study year | No
