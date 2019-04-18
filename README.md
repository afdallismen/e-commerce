# e-commerce

Client-server e-commerce web app build using TDD.

## REST API

Using express and mongoose.

## Open Endpoints

Open endpoints require no Authentication.

#### Authentication related

- [Login](#login) : `POST /auth/login`

- [Register](#register) : `POST /auth/register`

#### Product related

- [Fetch all Product](#fetch-all-product) : `GET /products`

- [Fetch a Product by its id](#fetch-a-product-by-its-id) : `GET /products/:product_id`

## Endpoints that require  Authentication

Closed endpoints require a valid Token to be included in the header of the request.

#### Product

Each endpoint manipulates or displays information related to the Product created by User whose Token is provided with the request.

- [Create a Product](#create-a-product) : `POST /users/:user_id/products`

- [Update a Product](#update-a-product) : `PUT /users/:user_id/products/:product_id`

- [Delete a Product](#delete-a-product) : `DELETE /users/:user_id/products/:product_id`

#### User related Cart

Each endpoint manipulates or displays information related to the User whose Token is provided with the request.

- [Add a product into Cart](#add-a-product-into-cart) : `POST /users/:user_id/cart`
- [Remove a product from Cart](#remove-a-product-from-cart) : `DELETE /users/:user_id/cart/:product_id`
- Clear Cart : `DELETE /users/:user_id/cart`
- [Check-out User Cart](#check-out-user-cart) : `POST /users/:user_id/cart/check-out`



## Login

**Method :** `POST`

**URL** : `/auth/login`

**Request Body** :

```json
{
    "login": String,
    "password": String
}
```

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "user": {
        "_id": String,
        "username": String,
        "email": String,
    },
    "token": String
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Register

**Method :** `POST`

**URL** : `/auth/register`

**Request Body** :

```json
{
    "username": String,
    "email": String,
    "password": String
}
```

**Response Success**

**Status** : `201`

**Body** : 

```json
{
    "user": {
        "_id": String,
        "username": String,
        "email": String,
    }
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Fetch all Product

**Method :** `GET`

**URL** : `/products`

**Request Body** : `None`

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "products": [
        {
            "_id": String,
            "name": String,
            "stock": Number,
            "price": Number
    	},
        ...
    ]
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Fetch a Product by its id

**Method :** `GET`

**URL** : `/products/:product_id`

**Request Body** : `None`

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "product": {
        "_id": String,
        "name": String,
        "stock": Number,
        "price": Number
   	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Create a Product

**Method :** `POST`

**URL** : `/users/:user_id/products`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** :

```json
{
    "name": String,
    "stock": Number,
    "price": Number
}
```

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "product": {
        "_id": String,
        "name": String,
        "stock": Number,
        "price": Number,
        "owner_id": String,
   	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Update a Product

**Method :** `POST`

**URL** : `/users/:user_id/products/:product_id`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** :

```json
{
    "name": String,
    "stock": Number,
    "price": Number
}
```

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "product": {
        "_id": String,
        "name": String,
        "stock": Number,
        "price": Number,
        "owner_id": String,
   	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Delete a Product

**Method :** `DELETE`

**URL** : `/users/:user_id/products/:product_id`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** : `None`

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "product": {
        "_id": String
   	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Add a product into cart

**Method :** `POST`

**URL** : `/users/:user_id/cart`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** :

```json
{
    "product": {
        "_id": String
    }
}
```

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "product": {
        "_id": String
   	},
    "count": Number
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Remove a product from cart

**Method :** `DELETE`

**URL** : `/users/:user_id/cart/:product_id`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** : `None`

**Response Success**

**Status** : `200`

**Body** : 

```json
{
    "product": {
        "_id": String
   	},
    "count": Number
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Clear Cart

**Method :** `DELETE`

**URL** : `/users/:user_id/cart`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** :

```json
{
    "cart": []
}
```



**Response Success**

**Status** : `200`

**Body** : `None`

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Check-out User Cart

**Method :** `POST`

**URL** : `/users/:user_id/cart/check-out`

**Request header** : 

```json
{
    "Authorization": Bearer <token>
}
```

**Request Body** : `None`

**Response Success**

**Status** : `201`

**Body** : 

```json
{
    "transaction": {
        "_id": String,
        "owner_id": String,
        "products": [
            {
                "_id": String
            }
            ...
        ],
        "total": Number
   	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```

