# ⏳ Expiry Reminder App

[![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%2F%20Next.js-blue.svg)](#tech-stack)
[![PRD Version](https://img.shields.io/badge/PRD-v1.0-orange.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

A smart, automated household expiry tracking application designed specifically to help Indian households stay on top of upcoming expirations for medicines, groceries, utility bills, and digital subscriptions before they lapse or go to waste.

---

## 📌 Project Overview

Managing a modern household involves keeping track of multiple moving pieces—from checking if vital chronic-care medicines like **Dolo 650** or insulin are still safe, to consuming fresh produce before it spoils, ensuring electricity/gas bills are paid on time, and tracking automated streaming or mobile subscriptions.

The **Expiry Reminder App** streamlines this by offering a centralized dashboard and proactive, automated email alerts (7 days and 1 day prior to expiration), reducing waste, preventing late fees, and safeguarding health.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Next.js API Routes (Serverless Backend)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) stored securely via HTTP-Only Cookies
- **Email Delivery:** Nodemailer (configured via SMTP)
- **Styling:** Tailwind CSS

---

## 🛠️ Feature Roadmap

### 📦 Phase 1: MVP Features (Current Scope)

- [x] **Secure Authentication:** User registration, secure login, and session persistence using JWT & HTTP-Only cookies.
- [x] **Product & Asset Management:** CRUD operations for household items. Every entry captures Name, Category, Expiry Date, and customizable notification parameters.
- [x] **Auto-Calculations:** Dynamic rendering of exact countdown metrics ("Days Remaining") updated server-side or reactively on runtime.
- [x] **Intuitive Core Categorization:**
  - 💊 **Medicine** (e.g., Daily prescriptions, syrups)
  - 🥦 **Food** (e.g., Groceries, dairy, pantry items)
  - 💡 **Bills** (e.g., Electricity, broadband, gas)
  - 📱 **Subscriptions** (e.g., Netflix, Prime, mobile recharges)
  - 📦 **Other** (e.g., Warranties, documentation renewals)
- [x] **Insights Dashboard:** High-priority segregation filters:
  - Expiring Today
  - Expiring This Week
  - Expiring This Month
  - Consolidated Inventory List
- [x] **Automated Email Reminders:** Cron-job triggered notification system pushing alerts at the **7-day** and **1-day** countdown markers.

### 🔮 Phase 2: V2 Enhancements (Future Scope)

- [ ] **Shared Family Workspaces:** Multi-member synchronization to manage a single shared household inventory.
- [ ] **AI Optical Character Recognition (OCR):** Camera-based scanning to automatically extract and parse expiry dates from product packaging.
- [ ] **WhatsApp Notification Engine:** Direct message alerts leveraging WhatsApp Business API for instant visibility.
- [ ] **Smart Global Catalog:** Pre-configured default expiration lifespans for standard unlabelled items.
- [ ] **Barcode Integration:** Barcode scanner for rapid batch item logging.

---

## 💾 Data Architecture

### User Schema

```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // Securely hashed via bcrypt
  createdAt: Date,
  updatedAt: Date
}
```
=======
