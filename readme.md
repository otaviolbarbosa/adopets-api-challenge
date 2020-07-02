# Adopets API Challenge

This project was created to be part of Adopets selection process.

## End Points

### Users

- sign up: POST to https://adopets-challenge.herokuapp.com/api/signup with name, email and password
- sign in: POST to https://adopets-challenge.herokuapp.com/api/signin with email and password
- sign out: POST to https://adopets-challenge.herokuapp.com/api/signout

### Products

- get all products: GET to https://adopets-challenge.herokuapp.com/api/products
- get one product: GET to https://adopets-challenge.herokuapp.com/api/products/{product_id}
- create product: POST to https://adopets-challenge.herokuapp.com/api/products with name, description, category, price and amount
- update product: PUT to https://adopets-challenge.herokuapp.com/api/products/{product_id} with name, description, category, price and amount (all fields are optional)
- delete product: DELETE to https://adopets-challenge.herokuapp.com/api/products/{product_id}
