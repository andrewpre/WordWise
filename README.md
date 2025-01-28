# WordWise

WordWise is a web application designed to help students learn **ISEE exam vocabulary** through an engaging word-matching game. It is currently being used by a tutor to facilitate vocabulary teaching for her students. The app features over **1,000 ISEE-specific words** and provides a fun, interactive way to enhance vocabulary skills.

---

## Features

- **Synonym Matching Game**: A full-stack game built with **React** and **SQLite**, featuring over 1,000 ISEE-specific words.
- **RESTful API**: Built with **Node.js** and **Express.js**, the API handles an average of **40 requests per day** for synonym retrieval, user management, and word operations.
- **User-Friendly Interface**: Designed with **Tailwind CSS** for a clean and responsive UI.
- **Database Management**: Utilizes **Prisma** for efficient database operations with **SQLite**.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, Next.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite, Prisma
- **API**: RESTful API

---

## Installation

To run WordWise locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/wordwise.git
   ```

2. **Navigate to the project directory**:

```bash
cd wordwise
```

3. **Install dependencies**:

```bash
npm install
```

4. **Set up the database**:

- Ensure SQLite is installed.
- Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. **Start the development server**:

```bash
npm run dev
```

6. **Access the app**:
   Open your browser and navigate to http://localhost:3000.

---

## Usage

- **For Students**: Play the synonym-matching game to learn and reinforce ISEE vocabulary.

- **For Tutors**: Use the app as a teaching tool to help students expand their vocabulary in an interactive way.

---

## API Endpoints

The following RESTful API endpoints are available:

### User Management

- **GET** `/api/user/connections/[id]`: Retrieve user information based on ID.
- **GET** `/api/user/connections`: Retrieve information for all users.
- **POST** `/api/user/connections`: Insert a new user with provided user data.

### Word Operations

- **POST** `/api/user/word/[id]`: Add a new word to a user's database (given user ID) for testing on unique words.
- **GET** `/api/user/word/[id]`: Retrieve word information for a given user ID.

### General

- **GET** `/api/words`: Retrieve a list of words and their synonyms.
- **GET** `/api/words/:id`: Retrieve details for a specific word.
- **POST** `/api/words`: Add a new word to the database (admin-only).

---
