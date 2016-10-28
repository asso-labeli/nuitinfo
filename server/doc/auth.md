# Authentication

## Overview

Route | Description | Authentication
----- | ----------- | --------------
**POST** /login | Log an user | No
**POST** /passwordRecovery | Get a recovery password mail | No
**POST** /recovery/:token | Send a password change | No

## POST /login

#### Body parameters

```javascript
{
    "email" : String, // User's mail
    "password" : String // User's password
}
```

#### Return

##### Success code

----- | -----
1 | Success
-11 | Missing email
-12 | Missing password
-51 | Authentication Failed

##### Data

```javascript
{
    "token": XXX // User JWT token
}
```

## POST /passwordRecovery

#### Body parameters

```javascript
{
    "email" : String, // User's mail
}
```

#### Return

##### Success code

----- | -----
1 | Success
-11 | Missing email
-27 | Internal error during select in MongoDB
-43 | No user found with this email
-51 | Authentication Failed

##### Data

```javascript
{}
```

## POST /recovery/:token

#### Body parameters

```javascript
{
    "password" : String, // New user's password
}
```

#### Return

##### Success code

----- | -----
1 | Success
-11 | Missing password
-27 | Internal error during select in MongoDB
-43 | No user found with this token
-51 | Authentication Failed

##### Data

```javascript
User's entry
```