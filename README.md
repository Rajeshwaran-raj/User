# User

# User API Endpoints

This document explains how to access and use the User API endpoints in the Express application.


## Use tha below json file in
project-root/
│
├─ data/
│   └─ user.json

``` json
[
  { "id": 1, "name": "Rajesh", "email": "rajesh@example.com" },
  { "id": 2, "name": "Arun", "email": "arun@example.com" },
  { "id": 3, "name": "Kumar", "email": "kumar@example.com" },
  { "id": 4, "name": "Suresh", "email": "suresh@example.com" },
  { "id": 5, "name": "Priya", "email": "priya@example.com" },
  { "id": 6, "name": "Deepa", "email": "deepa@example.com" },
  { "id": 7, "name": "Rahul", "email": "rahul@example.com" },
  { "id": 8, "name": "Vikram", "email": "vikram@example.com" },
  { "id": 9, "name": "Anjali", "email": "anjali@example.com" },
  { "id": 10, "name": "Mohan", "email": "mohan@example.com" }
]
```

## Base URL

```
/users
```

All routes below are prefixed with `/users`.

---

## Endpoints

### **1. Get All Users**

**GET** `/users`

**Description:**
Returns a list of all users.

**Response Example:**

```json
[
  {
    "id": 1,
    "name": "John Doe"
  }
]
```

---

### **2. Get User by ID**

**GET** `/users/:id`

**Description:**
Fetch details of a specific user by their ID.

**URL Example:**

```
/users/5
```

---

### **3. Create New User**

**POST** `/users`

**Description:**
Creates a new user.

**Body Example:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### **4. Update User**

**PUT** `/users/:id`

**Description:**
Updates an existing user with the given ID.

**Body Example:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

### **5. Delete User**

**DELETE** `/users/:id`

**Description:**
Deletes a user with the specified ID.

---


### **routes/index.js**

```js
const Express = require('express');
const router = Express.Router();

const userRoutes = require('./userroutes');

router.use('/users', userRoutes);

module.exports = router;
```

### **routes/userroutes.js**

```js
const express = require('express');
const userRoutes = express.Router({ mergeParams: true });

const UserController = require('../controller/UserController');

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);

module.exports = userRoutes;
```




---

## Author

API Documentation for User Module
