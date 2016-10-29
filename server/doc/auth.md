# Authentication

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**POST** /login](#post-login) | Log an user | No
[**POST** /passwordRecovery](#post-passwordrecovery) | Get a recovery password mail | No
[**POST** /recovery/:token](#post-recoverytoken) | Send a password change | No

## POST /login

#### Body parameters

```javascript
{
    "email" : String [Required], // User's mail
    "password" : String [Required] // User's password
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing email
-12 | Missing password
-51 | Authentication Failed

##### Data

```javascript
{
    "token": String // User JWT token
}
```

## POST /passwordRecovery

#### Body parameters

```javascript
{
    "email" : String [Required], // User's mail
}
```

#### Return

##### Success code

Code | Description
---|---
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
    "password" : String [Required], // New user's password
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing password
-27 | Internal error during select in MongoDB
-43 | No user found with this token
-51 | Authentication Failed

##### Data

```
User's entry
```
