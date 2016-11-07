# User

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**POST** /user](#post-user) | Add a new user | No
[**PUT** /user](#put-user) | Edit logged user | Yes
[**GET** /user/me](#get-userme) | Get informations on logged user | Yes
[**GET** /user](#get-user) | Get list of all users | No
[**GET** /user/:id](#get-userid) | Get user with specific id | No

## POST /user

#### Body parameters

```javascript
{
    "lastName" : String [Required], 
    "firstName" : String [Required],
    "email": String [Required],
    "password": String [Required],
    "biography": String,
    "birthday": Date,
    "school": {
        "institution": ObjectId,
        "studyYear": Number, // Study year after Bac
        "pathway": String // Example : computer science, biology, ...
    },
    "material": {
        "hasMaterial": Boolean // True if user has his own material
        "isDesktop": Boolean // True if is desktop computer
        "hasWifi": Boolean // True if computer has wifi
    },
    "mailForRecruitment": Boolean, // True for receiving mails
    "cremiAccount": {
        "needed": Boolean, // True if user needs a Cremi account
        "studentNumber": Number, // UBX student number for account
        "studentMail": String
    }
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing firstName
-12 | Missing lastName
-13 | Missing email
-14 | Missing password
-21 | User with email already exists
-29 | Internal error in MongoDB during insertion

##### Data

```
User's entry
```

## PUT /user

#### Body parameters

```javascript
{
    "lastName" : String, 
    "firstName" : String,
    "email": String,
    "biography": String,
    "birthday": Date,
    "school": {
        "institution": ObjectId,
        "studyYear": Number, // Study year after Bac
        "pathway": String // Example : computer science, biology, ...
    },
    "material": {
        "hasMaterial": Boolean // True if user has his own material
        "isDesktop": Boolean // True if is desktop computer
        "hasWifi": Boolean // True if computer has wifi
    },
    "mailForRecruitment": Boolean, // True for receiving mails
    "cremiAccount": {
        "needed": Boolean, // True if user needs a Cremi account
        "studentNumber": Number, // UBX student number for account
        "studentMail": String
    }
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-26 | Internal error in MongoDB during edition
-51 | Not allowed

##### Data

```
User's entry updated
```

## GET /user/me

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-27 | Internal error in MongoDB during selection
-43 | No user found
-51 | Not allowed

##### Data

```
User's entry without password
```

## GET /user

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-27 | Internal error in MongoDB during selection
-43 | No users found

##### Data

```javascript
[{
    "firstName": String,
    "lastName": String,
    "school": {
            "institution": ObjectId,
            "studyYear": Number, // Study year after Bac
            "pathway": String // Example : computer science, biology, ...
    },
    "team": Object,
    "biography": String
}]
```

## GET /user/:id

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-27 | Internal error in MongoDB during selection
-43 | No user found

##### Data

```javascript
{
    "firstName": String,
    "lastName": String,
    "school": {
            "institution": ObjectId,
            "studyYear": Number, // Study year after Bac
            "pathway": String // Example : computer science, biology, ...
    },
    "team": Object,
    "biography": String
}
```