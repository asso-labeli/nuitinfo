# Application

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**POST** /application/fromUser](#post-applicationfromuser) | Add a new application from a user | Yes
[**POST** /application/fromTeam](#post-applicationfromteam) | Add a new application from a team | Yes
[**POST** /application/accept](#post-applicationaccept) | Accept an application | Yes
[**POST** /application/refuse](#post-applicationrefuse) | Refuse an application | Yes

## POST /application/fromUser

#### Body parameters

```javascript
{
    "user" : ObjectID [Required], // User 
    "team" : ObjectID [Required] // Team
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing user
-12 | Missing team
-13 | Missing fromTeam/fromUser flag
-29 | Internal error in MongoDB during insertion
-51 | Authentication Failed

##### Data

```javascript
Application's entry
```

## POST /application/fromTeam

#### Body parameters

```javascript
{
    "user" : ObjectID [Required], // User 
    "team" : ObjectID [Required] // Team
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing user
-12 | Missing team
-13 | Missing fromTeam/fromUser flag
-29 | Internal error in MongoDB during insertion
-51 | Authentication Failed

##### Data

```javascript
Application's entry
```

## POST /application/accept

#### Body parameters

```javascript
{
    "application" : ObjectID [Required], // Application to accept
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing application
-28 | Internal error in MongoDB during deletion
-51 | Authentication Failed

##### Data

```javascript
{}
```

## POST /application/refuse

#### Body parameters

```javascript
{
    "application" : ObjectID [Required], // Application to accept
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing application
-28 | Internal error in MongoDB during deletion
-51 | Authentication Failed

##### Data

```javascript
{}
```
