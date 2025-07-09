const rateLimit = (limit, windowMs) => {
  let calls = [];

  return (email) => {
    const now = Date.now();
    calls = calls.filter((t) => now - t < windowMs);

    if (calls.length >= limit) {
      throw new Error("Rate limit exceeded");
    }

    calls.push(now);
  };
};

module.exports = rateLimit;
