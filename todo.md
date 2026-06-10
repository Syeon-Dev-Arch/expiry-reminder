Phase 1 — Backend first

Set up MongoDB connection (you've done this before in Express — same concept, different file location)
Create User model (you already wrote this in Todo app — reuse that thinking)
Create Product model (from the schema in PRD)
Build auth API routes:

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

Build product API routes (all 5 endpoints from PRD)
Auth middleware (you wrote verifyJWT before — same idea)

Phase 2 — Frontend

Register/Login pages with forms
Dashboard page showing all products
Add product form
Expiry color coding (red/yellow/green based on days remaining)

Phase 3 — The unique feature

Email reminders with Nodemailer

Rules:

Test each API route in Postman before moving to next
One step at a time
Come back when stuck, not before trying

Start with step 1. What do you already know about connecting MongoDB in Next.js? 🙂
