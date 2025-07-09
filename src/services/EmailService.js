const ProviderA = require("../providers/ProviderA");
const ProviderB = require("../providers/ProviderB");
const store = require("../utils/store");
const rateLimit = require("../utils/RateLimiter");

const limiter = rateLimit(5, 60000); // 5 emails per minute

class EmailService {
  constructor() {
    this.providers = [ProviderA, ProviderB];
  }

  async sendEmail(email, subject, body) {
    const key = `${email.trim().toLowerCase()}-${subject.trim().toLowerCase()}`;
    if (store.sentEmails.has(key)) {
      return { status: "Duplicate", message: "Email already sent" };
    }

    store.sentEmails.add(key);
    try {
      limiter(email);
    } catch (err) {
      store.statusLog.push({
        key,
        email,
        status: "RateLimited",
        error: err.message,
      });
      return { status: "RateLimited", error: err.message };
    }

    for (let i = 0; i < this.providers.length; i++) {
      try {
        const result = await this.retry(
          this.providers[i],
          email,
          subject,
          body
        );
        store.sentEmails.add(key);
        store.statusLog.push({
          key,
          email,
          status: "Success",
          provider: `Provider${i + 1}`,
        });
        return { status: "Success", provider: `Provider${i + 1}`, result };
      } catch (err) {
        console.log(`Provider ${i + 1} failed:`, err.message);
      }
    }

    store.statusLog.push({ key, email, status: "Failed" });
    return { status: "Failed", message: "All providers failed" };
  }

  async retry(provider, email, subject, body, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await provider.send(email, subject, body);
      } catch (err) {
        await new Promise((res) => setTimeout(res, 2 ** i * 500));
      }
    }
    throw new Error("Retries failed");
  }

  getStatusLog() {
    return store.statusLog;
  }
}

module.exports = EmailService;
