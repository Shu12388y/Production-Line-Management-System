

# Production Line Dashboard

A **Next.js** dashboard that allows operators to manage orders efficiently. Users can filter orders by **status** and **workstation** and update them dynamically.

## 🚀 Features

- 📋 **View Orders** - Displays a list of orders with details such as product name, quantity, priority, and status.
- 🔍 **Filter Orders** - Orders can be filtered based on status and workstation.
- ✏️ **Update Orders** - Click an order to navigate to an update page.
- 🌍 **API Integration** - Fetches data from an API endpoint.

## 📦 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node JS, Express JS, MongoDB

## 📂 Project Structure

```plaintext
📦 manager-dashboard
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 OrderTable.tsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 index.tsx (Main page with filters & table)
 ┣ 📜 README.mdx
 ┣ 📜 package.json
 ┗ 📜 .env.local (Environment variables)
📦 operator-dashboard
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 OrderTable.tsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 index.tsx (Main page with filters & table)
 ┣ 📜 README.mdx
 ┣ 📜 package.json
 ┗ 📜 .env.local (Environment variables)
```

## 📥 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/operator-dashboard.git
   cd operator-dashboard
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create `.env.local` file**
   ```plaintext
   NEXT_PUBLIC_DOMAIN=https://your-api-url.com
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🖥️ Usage

1. Select a **status** from the dropdown.
2. Select a **workstation** from the dropdown.
3. The table updates dynamically based on the selected filters.
4. Click **Update** to navigate to the order update page.

## 🖥️ Credentials
1. manage - username:shubham9900 password: shubham
2. operator - username - shubham1234 password: shubham


## 📜 License

This project is licensed under the **MIT License**. Feel free to use and modify it.

## 📬 Contact

For any queries, reach out via **[your email]** or **[your GitHub]**.

---
Built with ❤️ using Next.js & Tailwind CSS.
