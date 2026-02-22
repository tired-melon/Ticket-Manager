# Ticket Manager – Full-Stack Web App

A lightweight support ticket management system built to demonstrate full-stack development skills with Node.js, Express, MySQL, and vanilla JavaScript. Designed for educational and portfolio purposes.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MySQL (Relational schema with users -> tickets)  
- **Frontend:** HTML, CSS, JavaScript (Vanilla)  
- **Other:** RESTful APIs

---

## 💡 Features

- Create, read, update, and delete tickets  
- Assign tickets to users  
- Dynamic relational database with MySQL  
- Frontend communicates with backend via REST API  
- Status indicator showing API connectivity  
- Responsive and clean UI with dark and light styling  

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/tired-melon/ticket-manager.git
cd ticket-manager
```
2. **Install backend dependencies**
```bash
cd backend
npm install
```
3. **Set up MySQL database**

- Create database ticket_manager
- Create users and tickets tables (see /backend/database/db.sql for reference)
- Configure database connection

4. Update db.js with your MySQL credentials:
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_password',
  database: 'ticket_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```
5. **Start backend server**
```bash
node src/index.js
```

6. **Open frontend**

- Open frontend/index.html in your browser
- The app will connect to the backend API at http://localhost:3000/api
