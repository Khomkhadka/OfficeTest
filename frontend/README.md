## ✨ Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 📊 Introduction
This is a full-stack data visualization web application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to upload Excel files, automatically convert them into structured data, store them in the database, and visualize insights through interactive bar charts, pie charts, and detailed analytics dashboards.

## 🚀 Features
- User authentication and role-based authorization
- Upload Excel files and convert them into structured data
- Store and manage converted records in a MongoDB database
- Interactive data visualization using bar charts and pie charts
- Real-time data analytics and insights dashboard
- Edit, delete, and update entries through an admin management panel

## 🛠️ Technologies Used
- **Frontend:** React.js, React Context API, React Router
- **Backend:** Node.js, Express.js
- **Payment Gateway:** Stripe
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS(framework for css)

## Installation
### Prerequisites
- Node.js
- MongoDB

## 🚀 Run Locally — Step-by-step

Make sure you have Node.js (v20+ recommended) and npm installed.

### Clone the Repository
```sh
 git clone https://github.com/Khomkhadka/OfficeTest.git 
  cd OfficeTest
```

## Backend Setup
Navigate to the backend directory:

```sh
cd backend

```
Install dependencies:

```sh
npm install
```

Create a .env file in the backend directory and add the following:

```sh
JWT_SECRET = "random#secret"
STRIPE_SECRET_KEY = "your_stripe_secret_key_here" 
PORT = "your port"
⚠️ Note: Do not commit your .env file. Create your own keys from Stripe Dashboard and use them locally.

```
 
Start the backend server:

```sh
npm run server
```
## Frontend Setup
Navigate to the frontend directory:

```sh

cd frontend
```

Install dependencies:
```sh

npm install
```

Start the frontend server:
```sh

npm run dev
```


## Usage
- Start the application and access the web interface at http://localhost:5173
- Register a new account and then log in using your credentials
- Upload an Excel file containing:
  {
- Product Name (String)
- Category (String)
- Quantity Sold (Number)
- Revenue (Number)
- Sales Date (String)
  }
- The system will convert the Excel sheet into structured database entries
- View automatic bar and pie chart visualizations based on your uploaded data
- Perform complete CRUD operations — Create, Read, Update, Delete entries in real time
- Access the data management panel to edit or remove records efficiently



## 📜 API Documentation
The API endpoints for the backend can be documented using tools like Postman or Swagger. Include endpoints for user Authentication (Register, Login, Token Validation), Excel File Upload, Product Data CRUD Operations, Create new product records, View stored data, Update existing entries and Delete product entries.


## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.

👨‍💻 Contributors

khom khadka

Happy coding!





