module.exports = {
  send: async (email, subject, body) => {
    if (Math.random() < 0.5) throw new Error("Provider A failed");
    return "Sent via Provider A";
  },
};
