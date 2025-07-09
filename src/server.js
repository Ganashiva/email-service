const express = require("express");
const { v4: uuidv4 } = require("uuid");
const EmailService = require("./services/EmailService");

const app = express();
const port = process.env.PORT || 3000;
const emailService = new EmailService();

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { email, subject, body } = req.body;

  if (!email || !subject || !body) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const id = uuidv4();
  const result = await emailService.sendEmail(id, email, subject, body);
  res.json({ id, ...result });
});

app.get("/status-log", (req, res) => {
  res.json(emailService.getStatusLog());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
