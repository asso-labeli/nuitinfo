# Team

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**POST** /team](#post-team) | Add a new team | Yes
[**PUT** /team](#put-team) | Edit a team | Yes
[**DELETE** /team](#delete-team) | Remove a team | Yes
[**GET** /team/:id](#get-teamid) | Get team with specific id | No
[**GET** /team](#get-team) | Get all teams | No
[**POST** /team/kick](#post-teamkick) | Kick a member | Yes
[**POST** /team/changeLeader](#post-teamchangeleader) | Change leader of a team| Yes
[**POST** /team/leave](#port-teamleave) | Leave a team | Yes


## POST /team

#### Body parameters

```javascript
{
    "name" : String [Required],
    "email": String [Required],
    "description": String,
    "logisticsRequirements": String, // Description of requirements
    "openForApplications": Boolean, // True if team searches members
    "cremiRoom": String // Desired room
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing name
-12 | Missing email
-21 | Team with email or mail already exists (see message for the field)
-29 | Internal error in MongoDB during insertion
-51 | Not allowed

##### Data

```
Team's entry
```

## PUT /team

#### Body parameters

```javascript
{
    "name" : String [Required],
    "email": String [Required],
    "description": String,
    "logisticsRequirements": String, // Description of requirements
    "openForApplications": Boolean, // True if team searches members
    "cremiRoom": String // Desired room,
    "members": {
        "leader": ObjectId,
        "list": [ObjectId] // List of the members of the team, without leader
    }
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-26 | Error in MongoDB during edition
-51 | Not allowed

##### Data

```
{}
```

## DELETE /team

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-28 | Error in MongoDB during deletion
-51 | Not allowed

##### Data

```javascript
{}
```

## GET /team/:id

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-27 | Error in MongoDB during selection
-43 | No team found

##### Data

```
Team's entry with members.leader and members.list populated
```

## GET /team

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-27 | Error in MongoDB during selection
-43 | No teams found

##### Data

```
Team's entries
```

## POST /team/kick

#### Body parameters

```javascript
{
    "user": ObjectId [Required]
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-11 | Missing user
-26 | Error in MongoDB during edition
-51 | Authentication failed : Not the leader of the team

##### Data

```
{}
```

## POST /team/changeLeader

#### Body parameters

```javascript
{
    "leader": ObjectId [Required] // New leader of the team
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-11 | Missing leader
-26 | Error in MongoDB during edition
-51 | Authentication failed / Not the leader of the team

##### Data

```
{}
```

## POST /team/leave

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-26 | Error in MongoDB during edition
-43 | No team found
-51 | Authentication failed
-53 | Leader can't leave the team

##### Data

```
{}
```