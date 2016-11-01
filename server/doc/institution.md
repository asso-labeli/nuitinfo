# Authentication

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**POST** /institution](#post-institution) | Add a new institution | No

## POST /institution

#### Body parameters

```javascript
{
    "name" : String [Required] // Institution's name
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing name
-29 | Internal error during MongoDB insertion

##### Data

```
Institution's entry created
```
