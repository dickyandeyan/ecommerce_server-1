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
