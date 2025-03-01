// helper function
const createMockResponse = (data, options = {}) => ({
  ok: true,
  status: 200,
  json: () => Promise.resolve(data),
  ...options,
});

describe("APIs For Quotes", () => {
  it("handles success case", async () => {
    global.fetch = jest.fn().mockResolvedValue(
      createMockResponse({
        quoteId: 16,
        name: "Irving",
        quote: "Hi, kids. What's for dinner?",
      })
    );
  });

  it("handles 404 error", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: "Not found" }),
    });
  });
});
