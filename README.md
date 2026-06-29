# food-order-management-system



\# 🍔 Food Order Management System



A full-stack food ordering web application with a customer-facing frontend, an admin dashboard, and a REST API backend. Customers can browse food items, manage a cart, place orders, and pay via Razorpay. Admins can add/remove food items and track order statuses in real time.



\---



\## 📁 Project Structure



```

food-order-management-system/

├── frontend/       # Customer-facing React app

├── admin/          # Admin dashboard React app

└── backend/        # Node.js/Express REST API

```



\---



\## ✨ Features



\### Customer (Frontend)

\- Browse food items by category

\- Add/remove items to/from cart

\- User registration and login (JWT-based auth)

\- Place orders and pay via \*\*Razorpay\*\*

\- View order history and track order status



\### Admin Dashboard

\- Add new food items with image upload

\- List and delete existing food items

\- View all orders and update their status (e.g. Food Processing → Out for Delivery → Delivered)



\### Backend API

\- RESTful API with Express.js

\- MongoDB database via Mongoose

\- JWT authentication middleware

\- Image storage with Multer

\- Razorpay payment integration



\---



\## 🛠 Tech Stack



| Layer    | Technology                                      |

|----------|-------------------------------------------------|

| Frontend | React 19, React Router, Axios, Vite             |

| Admin    | React 18, React Router, React Toastify, Axios, Vite |

| Backend  | Node.js, Express 5, MongoDB, Mongoose           |

| Auth     | JSON Web Tokens (JWT), bcrypt                   |

| Payments | Razorpay                                        |

| Storage  | Multer (local file uploads)                     |



\---



\## ⚙️ Prerequisites



\- \[Node.js](https://nodejs.org/) v18+

\- \[MongoDB](https://www.mongodb.com/) running locally on port `27017`

\- A \[Razorpay](https://razorpay.com/) account (for payment keys)



\---



\## 🚀 Getting Started



\### 1. Clone the repository



```bash

git clone <your-repo-url>

cd food-order-management-system

```



\### 2. Backend Setup



```bash

cd backend

npm install

```



Create a `.env` file in the `backend/` directory:



```env

JWT\_SECRET=your\_jwt\_secret\_key



RAZORPAY\_KEY\_ID=your\_razorpay\_key\_id

RAZORPAY\_KEY\_SECRET=your\_razorpay\_key\_secret

```



Start the backend server:



```bash

npm run server

```



The API will be available at `http://localhost:4000`.



\---



\### 3. Frontend Setup



```bash

cd frontend

npm install

npm run dev

```



The customer app will be available at `http://localhost:5173` (default Vite port).



\---



\### 4. Admin Dashboard Setup



```bash

cd admin

npm install

npm run dev

```



The admin panel will be available at `http://localhost:5174` (or next available Vite port).



\---



\## 🔌 API Endpoints



\### Food

| Method | Endpoint          | Description         |

|--------|-------------------|---------------------|

| POST   | `/api/food/add`   | Add a new food item |

| GET    | `/api/food/list`  | List all food items |

| POST   | `/api/food/remove`| Remove a food item  |

| GET    | `/images/:filename` | Serve food images |



\### User

| Method | Endpoint            | Description       |

|--------|---------------------|-------------------|

| POST   | `/api/user/register`| Register new user |

| POST   | `/api/user/login`   | Login user        |



\### Cart

| Method | Endpoint          | Description              |

|--------|-------------------|--------------------------|

| POST   | `/api/cart/add`   | Add item to cart         |

| POST   | `/api/cart/remove`| Remove item from cart    |

| POST   | `/api/cart/get`   | Get user's cart          |



\### Orders

| Method | Endpoint              | Description                    |

|--------|-----------------------|--------------------------------|

| POST   | `/api/order/place`    | Place a new order (Razorpay)   |

| POST   | `/api/order/verify`   | Verify payment after checkout  |

| POST   | `/api/order/userorders`| Get orders for logged-in user |

| GET    | `/api/order/list`     | List all orders (admin)        |

| POST   | `/api/order/status`   | Update order status (admin)    |



> \*\*Note:\*\* Cart and order endpoints require a valid JWT token passed in the `token` request header.



\---



\## 🗄️ Database Models



\### Food

```

name, description, price, image, category

```



\### User

```

name, email, password (hashed), cartData

```



\### Order

```

userId, items\[], amount, address, status, date, payment

```



\---



\## 📦 Order Statuses



Orders progress through the following statuses, managed from the admin dashboard:



1\. `Food Processing`

2\. `Out for Delivery`

3\. `Delivered`



\---



\## 🔐 Authentication



\- Passwords are hashed using \*\*bcrypt\*\* before storage.

\- On login/register, a \*\*JWT token\*\* is issued and stored in the browser's `localStorage`.

\- Protected routes (cart, orders) require the token to be sent in the `token` header of each request.



\---



\## 💳 Payments



This project uses \*\*Razorpay\*\* for payment processing.



1\. On checkout, the backend creates a Razorpay order.

2\. The frontend opens the Razorpay payment modal.

3\. On success/failure, the `/api/order/verify` endpoint updates the order's payment status accordingly.



> Use Razorpay's \*\*test keys\*\* during development. Never commit real API keys to version control.



\---



\## 📝 Notes



\- Food images are uploaded to and served from `backend/uploads/`.

\- The backend API URL is hardcoded to `http://localhost:4000` in both frontend apps. Update `StoreContext.jsx` (frontend) and `App.jsx` (admin) if your backend runs on a different host/port.

\- MongoDB connects to `mongodb://localhost:27017/foodorder` by default (see `backend/config/db.js`).

