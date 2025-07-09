# 📧 Resilient Email Sending Service – PearlThoughts Assignment

A backend service built using **Node.js** and **Express.js** to simulate a **reliable and fault-tolerant email delivery system** with retry logic, fallback between providers, idempotency, rate limiting, and status tracking.

---

## 🚀 Features

- ✅ Two mock email providers (Provider A & B)
- 🔁 Retry mechanism with exponential backoff
- 🔄 Fallback to another provider if one fails
- 🆔 Idempotency to prevent duplicate emails
- ⚠️ Basic rate limiting (5 emails/minute)
- 📊 Status tracking for all email send attempts

---

## 🛠️ Tech Stack

- Node.js + Express.js
- Minimal external libraries
- In-memory storage (Set, Map) for tracking
- UUID for tracking email attempts
- Postman for testing

---

## 📦 Installation

```bash
git clone https://github.com/your-username/email-service.git
cd email-service
npm install
npm start
```
