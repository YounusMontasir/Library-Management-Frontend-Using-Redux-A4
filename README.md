# 📚 LibraTrack - Library Management System

**LibraTrack** is a full-stack web application for managing a library. Users can add, update, delete, and borrow books. It also provides a summary of borrowed books and a clean UI to browse all available books.

## 🔗 Live Demo

[LibraTrack Live Website](https://library-management-system-using-red.vercel.app/) 

---

## ⚙️ Features

- 🔍 View all books
- ➕ Add new books
- ✏️ Update existing books
- 🗑️ Delete books
- 📥 Borrow books
- 📄 Borrow summary
- 🔐 Basic routing with React Router

---

## 🛠️ Tech Stack

| Frontend       | Backend        | Database    | Styling       | State Management        |
| -------------- | -------------- | ----------- | ------------- | ----------------------- |
| React + TypeScript | Node.js + Express | MongoDB + Mongoose | Tailwind CSS + shadcn/ui | Redux Toolkit + RTK Query |

---

## ✨ Features Summary

### 1. 🚀 Public Routes
- All pages are accessible without authentication.
- Focused purely on book and borrowing functionalities.

### 2. 🛠️ Book Management
- **Book List Table** with columns: Title, Author, Genre, ISBN, Copies, Availability, and Actions.
- **Actions:**
  - ✏️ **Edit Book**: Opens form pre-filled with data. Updates instantly on submit.
    - 🔄 If copies = 0, book is marked as unavailable.
  - 🗑️ **Delete Book**: Confirmation dialog before deletion.
  - 📥 **Borrow Book**: Opens form to borrow selected book.
- **Add New Book**:
  - Button triggers form with fields: Title, Author, Genre, ISBN, Description, Copies, Available (default: true).
  - On submission, redirects to book list and updates instantly.

### 3. 📥 Borrow Book
- Accessed via "Borrow" button from book list.
- Fields: Quantity (number), Due Date (date).
- **Business Rules**:
  - Quantity cannot exceed available copies.
  - If copies reach 0, book is marked unavailable.
- On submit:
  - Send data via API
  - Show success message
  - Redirect to Borrow Summary

### 4. 📄 Borrow Summary
- Aggregated list of all borrowed books.
- Displays:
  - Book Title
  - ISBN
  - Total Quantity Borrowed

---

## 🖥️ Frontend Installation

This is the frontend for **LibraTrack**, built with React, TypeScript, Redux Toolkit, and Tailwind CSS using Vite.

### 🔗 GitHub Repo

[👉 LibraTrack Frontend on GitHub](https://github.com/YounusMontasir/Library-Management-Frontend-Using-Redux-A4)

---

### 📦 Prerequisites

- Node.js v18+
- npm (or yarn)

---

### ⚙️ Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/YounusMontasir/Library-Management-Frontend-Using-Redux-A4.git

# 2. Navigate to the project directory
cd Library-Management-Frontend-Using-Redux-A4

# 3. Install dependencies
npm install
# or
yarn install

# 4. Start the development server
npm run dev
# or
yarn dev

---