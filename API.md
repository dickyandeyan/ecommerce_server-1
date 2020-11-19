# API Documentation For E-Commerce CMS Server & Client customer 

## **Add Product**

Add product object

- **URL**

  /product

- **Method**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```
    {
      "name": "Gundam MG Unicorn RX-0",
      "image_url": "https://gamespot1.cbsistatic.com/uploads/scale_landscape/1591/15918215/3735420-ps5thumb3%281%29.jpg",
      "price": "50000",
      "Stock": "10"
    }
  ```

- **Success Response**

  - **Code:** 201 CREATED <br/>
    **Content:**

  ```
    {
      "id": 1,
      "name": "Gundam MG Unicorn RX-0",
      "image_url": "https://gamespot1.cbsistatic.com/uploads/scale_landscape/1591/15918215/3735420-ps5thumb3%281%29.jpg",
      "price": "50000",
      "Stock": "10"
      "userId": 1,
      "createdAt": "2020-11-10T09:14:32.076Z",
      "updatedAt": "2020-11-10T09:14:32.076Z"
    }
  ```

- **Error Response**
  - **Code:** 400 BAD REQUEST <br/>
    **Content:**
  ```
     {
      message : "Product name is required"
     }
  ```

---

## **Read Product**

Return array of object with data of product

- **URL**

  /product

- **Method**

  `GET`

- **URL Params**

  None

- **Success Response**

  - **Code:** 200 OK <br/>
    **Content:**

  ```
  [
    {
      "id": 1,
      "name": "Gundam MG Unicorn RX-0",
      "image_url": "https://gamespot1.cbsistatic.com/uploads/scale_landscape/1591/15918215/3735420-ps5thumb3%281%29.jpg",
      "price": "50000",
      "Stock": "10"
      "userId": 1,
      "createdAt": "2020-11-10T09:14:32.076Z",
      "updatedAt": "2020-11-10T09:14:32.076Z"
    },
    {
      "id": 2,
      "name": "Gundam MG RX-78",
      "image_url": "https://www.saint-ism.com/wp-content/uploads/2019/05/mg_rx78_gundam_v3_62.jpg",
      "price": "50000",
      "Stock": "5"
      "userId": 1,
      "createdAt": "2020-11-10T09:14:32.076Z",
      "updatedAt": "2020-11-10T09:14:32.076Z"
    }
  ]
  ```

- **Error Response**
  - **Code:** 500 INTERNAL SERVER ERROR

---

## **Update Product**

Update detail of product

- **URL**

  /product/:id

- **Method**

  `PUT`

- **URL Params**

  **Required:** <br/>
  `id=[integer]`

- **Data Params**

  ```
    {
       "id": 2,
      "name": "Gundam MG RX-78",
      "image_url": "https://www.saint-ism.com/wp-content/uploads/2019/05/mg_rx78_gundam_v3_62.jpg",
      "price": "50000",
      "Stock": "5"
      "userId": 1,
      "createdAt": "2020-11-10T09:14:32.076Z",
      "updatedAt": "2020-11-10T09:14:32.076Z"
    }
  ```

- **Success Response**

  - **Code:** 200 OK <br/>
    **Content:**

  ```
    {
      "id": 2,
      "name": "Gundam MG RX-78",
      "image_url": "https://www.saint-ism.com/wp-content/uploads/2019/05/mg_rx78_gundam_v3_62.jpg",
      "price": "55000",
      "Stock": "8"
      "userId": 1,
      "createdAt": "2020-11-10T09:14:32.076Z",
      "updatedAt": "2020-11-10T10:18:42.087Z"
    }
  ```

- **Error Response**

  **Code:** 404 NOT FOUND <br/>
  **Content:**

  ```
    {
      "message": "Product not found"
    }
  ```

---

## **Delete Product**

Delete selected product by id

- **URL**

  /product/:id

- **Method**

  `DELETE`

- **URL Params**

  **Required**

  `id=[integer]`

- **Data Params**

  None

- **Success Response**

  - **Code:** 200 OK <br/>
    **Content:**

  ```
    {
      "message": "Product deleted!"
    }
  ```

- **Error Response**
  - **Code:** 404 NOT FOUND <br/>
    **Content**
  ```
    {
      "message" : "Product not found"
    }
  ```

---

## **Register User**

Create New user

  * **URL**

    /register

  *  **Method**

     `POST`

  * **URL Params**

    None

  * **Data Params**

    None

  * **Success Response**

    * **Code:** 201 CREATED <br/>
      **Content:**

    ```
     {
        "id": 5,
        "email": "ssa@gmail.com",
        "full_name": "John Doe"
     }
    ```

  * **Error Response**

    * **Code:** 400 BAD REQUEST
---

## **Login User**

Get credentials to access the App

  * **URL**

    /login

  *  **Method**

     `POST`

  * **URL Params**

    None

  * **Data Params**

    **Required**

    `email=[string]` <br>
    `password=[string]`
    
  * **Success Response**

    * **Code:** 200 OK <br/>
      **Content:**

    ```
      {
        "access_token": "jwt_token",
        "full_name": "John Doe",
        "email": "ssa@gmail.com",
        "role": "Customer"
      }
    ```

  * **Error Response**

    * **Code:** 400 BAD REQUEST
---
## **Get User Cart**

Return array of object with data of user cart

- **URL**

  /cart

- **Method**

  `GET`

- **Data Params**

  `id=[integer]`

- **Success Response**

  - **Code:** 200 OK <br/>
    **Content:**
  ```
    "cartUser": [
      {
        "id": 5,
        "UserId": 2,
        "ProductId": 2,
        "amount": 1,
        "total_price": null,
        "Product": {
          "id": 2,
          "name": "Gibson Les paul 1965",
          "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLCyfsVzeX8os1J4AsmCiqR721CH29fep1yQ&usqp=CAU",
          "price": 60000000,
          "stock": 10
        }
      },
      {
        "id": 4,
        "UserId": 2,
        "ProductId": 3,
        "amount": 1,
        "total_price": null,
        "Product": {
          "id": 3,
          "name": "Gibson Les paul 1965",
          "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLCyfsVzeX8os1J4AsmCiqR721CH29fep1yQ&usqp=CAU",
          "price": 50000000,
          "stock": 2
        }
      }
  ```

* **Error Response**

    * **Code:** 500 INTERNAL SERVER ERROR

# **Add Cart**

  Post user cart

* **URL**

  /cart

* **Method**

  `POST`

* **URL Params**

  None

* **Data Params**

  **Required**

  `UserId=[integer]` <br>
  `ProductId=[integer]`

* **Success Response**

    * **Code:** 201 CREATED <br/>
      **Content:**

    ```
     {
      "id": 5,
      "UserId": 2,
      "ProductId": 2,
      "amount": 1,
      "total_price": null,
      "createdAt": "2020-11-18T19:01:36.745Z",
      "updatedAt": "2020-11-18T19:01:36.745Z",
      "Product": {
        "id": 2,
        "name": "Gibson Les paul 1965",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLCyfsVzeX8os1J4AsmCiqR721CH29fep1yQ&usqp=CAU",
        "price": 60000000,
        "stock": 10,
        "createdAt": "2020-11-18T18:57:28.904Z",
        "updatedAt": "2020-11-18T18:57:28.904Z"
      }
     }
    ```

  * **Error Response**

    * **Code:** 500 INTERNAL SERVER ERROR

---

## **Delete Cart**

Remove cart from user

* **URL**

  /cart/:id

* **Method**

  `DELETE`

* **URL Params**

  **Required**

  `ProductId=[integer]`

* **Data Params**

  `id=[integer]`

* **Success Response**

  * **Code:** 200 OK <br/>
  * **Content:**

  ```
    {
      "message": "Successfully remove from cart!",
      "cartItem": 1
    }
  ```
* **Error Response**

    * **Code:** 500 INTERNAL SERVER ERROR
---

## **Update Amount Product**

  Update stock in cart

* **URL**

  /cart

* **Method**

  `PATCH`   

* **URL Params**

  **Required

  `ProductId=[integer]`

* **Data Params**

  `amount=[integer]` <br/>
  `id=[Integer]`

* **Success Response**

  * **Code:** 200 OK

* **Error Response**

  * **Code:** 400 BAD REQUEST
  * **Content:** 

  ```
  { 
    message: 'Product stock is out of limit' 
  }
  ```









