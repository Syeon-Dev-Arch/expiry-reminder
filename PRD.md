Expiry Reminder App — PRD v1.0
One liner
A household expiry tracker that automatically reminds users before their products, medicines, bills and subscriptions expire.
Target Users
Indian households managing medicines, groceries, bills and subscriptions.

MVP Features (Build first)

1. Auth

Register / Login
JWT based authentication

2. Products

Add product with name, category, expiry date
Auto calculate days remaining
Delete product

3. Categories

💊 Medicine
🥦 Food
💡 Bills
📱 Subscriptions
📦 Other

4. Dashboard

Expiring today
Expiring this week
Expiring this month
All products list

5. Email Reminders

Send email 7 days before expiry
Send email 1 day before expiry

V2 Features (After MVP)

Family members sharing
Camera based expiry date detection
WhatsApp reminders
Default expiry periods for common products
Barcode scanner

API Endpoints
Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout

Products
GET /api/v1/products → get all user's products
POST /api/v1/products → add new product
GET /api/v1/products/:id → get one product
PUT /api/v1/products/:id → update product
DELETE /api/v1/products/:id → delete product
GET /api/v1/products/expiring-soon → get expiring in 7 days
Dashboard
GET /api/v1/dashboard → summary stats

Data Schema
User:
js{
\_id,
username,
email,
password, // hashed
timestamps
}
Product:
js{
\_id,
name, // "Dolo 650"
category, // "medicine"
expiryDate, // Date
reminderDays, // 7 (remind 7 days before)
owner, // ref: User
timestamps
}

Tech Stack
Frontend → Next.js
Backend → Next.js API routes
Database → MongoDB + Mongoose
Auth → JWT + cookies
Email → Nodemailer
Styling → Tailwind CSS
