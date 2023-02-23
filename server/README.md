# E-Commerce REST API Docs

Rest API from Furniture E-Commerce

Base URL: `http:localhost:3000`

## 

## Login

Used to collect a `token`for a registered User.

**URL**: `/login`

**Method**: `POST`

**Auth required**: No

**URL Params**: None

**Data Params** 

- **Required**:
  - email[string]
  - password[string]

**Data example**

```json
{
    "email": "john@doe.com",
    "password": "secretofjohndoe"
}
```

### Success Response

**Code**: `200 OK`

**Content example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

### Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code**: `400 Bad Request`

**Content example**

```json
{
    "message": [
        "Wrong email/password"
    ]
}
```



## Register

Used to collect a `token`for a registered User.

**URL**: `/register`

**Method**: `POST`

**Auth required**: No

**URL Params**: None

**Data Params**

- **Required**:
  - email[string]
  - password[string]

**Data example**

```json
{
    "email": "john@doe.com"
    "password": "secretofjohndoe"
}
```

### Success Response

**Code**: `200 OK`

**Content example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

### Error Response

**Condition** : If `email`, and `password` are empty.

**Code**: `400 Bad Request`

**Content example**

```json
{
    "message": [
        "Email is required",
        "Password is required"
    ]
}
```

**Condition**: If`'email`is already registered

**Code**: `400 Bad Request`

Content example

```json
{
    "message": [
        "email already exist"
    ]
}
```



## Users

### Show All Users

Get all users.

**URL**: `/users`

**Method**: `GET`

**Auth required**: YES

**Permission required**: None

**URL Params**: None

**Data Params**: None

#### Success Response

**Code**: `200 OK`

**Content example**

```json
{
    "_id": "ObjectID("102738647312318273")",
    "email": "john@doe.com",
    "isAdmin": "true",
    "carts": [
    	"productId": "ObjectID("9182371648234")",
    	"...": "..."
    ]
}
```

#### Error Response

**Code**: `500 Internal Server Error`

**Content example**

```json
{
    "message": [
        "Internal Server Error"
    ]
}
```

## Products

### Show All Products

Get all products.

**URL**: `/products`

**Method**: `GET`

**Auth required**: No

**Permission required**: None

**URL Params**: None

**Data Params**: None

#### Success Response

**Code**: `200 OK`

**Content example**

```json
[
    {
        "_id": "ObjectID("893205273652345")",
        "name": "Table",
        "price": "15000000",
        "stock": "50",
        "description": "lorem ipsum"
	},
    {...},
    {,,,}
]
```

#### Error Response

**Code**: `500 Internal Server Error`

**Content example**

```json
{
    "message": [
        "Internal Server Error"
    ]
}
```



