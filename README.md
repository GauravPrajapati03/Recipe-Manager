# 🍳 Recipe Manager Web App

The **Recipe Manager App** is a simple project designed to help users store, organize, and browse their favorite recipes. This is the initial version of the project, and additional features will be added as development progresses.

---

## 🧭 Overview

- ➕ Adding new recipes  
- 📂 Viewing saved recipes  
- 🔎 Searching for recipes  
- 🏷️ Filtering recipes based on difficulty  
- ✏️ Editing and deleting existing recipes  

This README will be expanded as the project evolves.

---

## 🚀 Getting Started

These simple steps will help you run the app locally:

1. Clone or download this repository.
2. Open the `index.html` file in any modern browser (Chrome, Firefox, Edge).
3. The app will initialize with a default recipe stored in your localStorage on first load.
4. Start adding, editing, and managing your recipes instantly!

> Note: No server or build tools required — purely static client-side app.

---

## 📁 Project Structure

```plaintext
recipe-manager/
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   ├── main.js
│   ├── storage.js
│   ├── ui.js 
│   └── validation.js 
└── assets/
    └── (optional images/icons)
``` 


---

## ✅ Recipe Validation Rules

Each recipe must follow these validation requirements:

### 📌 Title
- **Required**
- Minimum: **3 characters**
- Maximum: **~100 characters**

### 📝 Description
- **Required**
- Minimum: **10 characters**
- Maximum: **~500 characters**

### 🥗 Ingredients
- **Required**
- Must contain **at least 1 ingredient**
- Accepted formats:
  - Comma-separated list  
  - One ingredient per line
- Trim whitespace from each ingredient

### 🍳 Steps
- **Required**
- Must contain **at least 1 step**
- Steps entered **one per line**
- Trim whitespace from each step

### ⏱️ Time Fields (Prep / Cook / Total)
- **All required**
- Must be **positive integers**

### 🎚️ Difficulty
- **Required**
- Must be one of the valid options:
  - `Easy`
  - `Medium`
  - `Hard`

### 🖼️ Image URL
- **Optional**
- If provided:
  - Must be a **valid URL format**
  - Cannot be just spaces
