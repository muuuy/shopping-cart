# Pokemon Shop

An E-commerce site project that utilizes [PokeAPI](https://pokeapi.co/), which was used because it is free and it has a large amount of data. This README file provides an overview of the project, installation instructions, usage guidelines, and other important information.

---

## Project Overview

This project is a full-stack e-commerce site built using modern web development technologies. It includes features like user authentication, product listing, a shopping cart, and order management.

### Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order placement and management
- Login / Signup / Forgot Password / Reset Password

---

## Technologies Used

### Frontend

- React.js
- Redux
- CSS/SASS
- HTML
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Bcrypt

---

## Installation

Before starting, ensure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB

### Steps

1. **Clone the repository:**
   ```
   $ git clone git@github.com:muuuy/shopping-cart.git
   $ cd repository
   ```

2. **Install dependencies:**
   ```
   $ npm install
   # or
   $ yarn install
   ```

2. **Install dependencies:**

   Create a ```.env``` file in ```.\backend\``` folder.

   Populate the ```.env``` file with the following:
   ```
   MONGODB_URI={YOUR MongoDB connection.}
   EMAIL_ADDRESS={YOUR email address to send emails to users}
   EMAIL_PASSWORD={YOUR email password.}
   JWT_SECRET_KEY={KEY for JWT.}
   JWT_EXPIRE={Amount of time before JWT expires.}
   SESSION_EXPIRE={Amount of time before Express Session expires.}
   ```
   
4. **Start the backend server:**
   ```
   $ cd .\backend\
   $ npm run serverstart
   ```

5. **Start the frontend development server:**
   ```
   $ cd .\frontend\
   $ npm run dev
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:5173/
   ```

---

## Images

![Home Page](/store-images/homescreen.png)

![Explore Categories](/store-images/categories.png)

![Explore Pokemon](/store-images/explore-pokemon.png)

![Explore Items](/store-images/explore-items.png)

![Explore Berries and TMs](/store-images/explore-berries-tms.png)

![Store](/store-images/store.png)

![Shop Pokemon](/store-images/shop-pokemon.png)

![Shop Items](/store-images/shop-items.png)

![Shop Berries](/store-images/shop-berries.png)

![Shop TMs](/store-images/shop-tms.png)

![Orders](/store-images/orders.png)

![Cart](/store-images/cart.png) ![Sign Up](/store-images/sign-up.png) ![Log in](/store-images/sign-in.png) ![Forgot Password](/store-images/forgot.png) ![Reset Password](/store-images/reset.png)
