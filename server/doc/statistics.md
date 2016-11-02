# Authentication

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**GET** /statistics/users](#get-statisticsusers) | Get numbers of users | No
[**GET** /statistics/teams](#get-statisticsteams) | Get numbers of teams | No
[**GET** /statistics/users/byInstitution](#get-statisticsusersbyinstitution) | Get numbers of users by institution | No

## GET /statistics/users

#### Body parameters

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

##### Data

```javascript
{
    "users": Integer // Number of subscribed users
}
```

## GET /statistics/teams

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-27 | Internal error in MongoDB during selection
-43 | No teams found

##### Data

```javascript
{
    "teams": Integer // Number of subscribed teams
}
```

## GET /statistics/users/byInstitution

#### Body parameters

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

##### Data

```javascript
[{
    "institution": {
        "name": String,
        "_id": ObjectId
    }, // Care, institution's field can be null for users with no institutions
    "users": Integer // Number of users in this institution
}]
```
