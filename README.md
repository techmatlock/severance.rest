# [severance.rest](https://severance.rest)

A free REST API for random Severance quotes.

## Technologies Used

- AWS Lambda
- API Gateway
- DynamoDB
- S3 + CloudFront
- React
- TypeScript

## Usage

### `GET` [https://api.severance.rest/quotes](https://api.severance.rest/quotes)

```json
[
  { "quoteId": 2, "name": "Mark", "quote": "Every time you find yourself here, it's because you chose to come back." },
  { "quoteId": 8, "name": "Dylan", "quote": "Just say the word, and I'll get you a coffee cozy literally right now." },
  { "quoteId": 9, "name": "Mr. Milchick", "quote": "We serve Kier, you CHILD!" },
  { "quoteId": 1, "name": "Mr. Milchick", "quote": "The Music Dance Experience is officially cancelled." }
]
```

### `GET` [https://api.severance.rest/quote?name=Irving](https://api.severance.rest/quote?name=Irving)

```json
[
  {
    "quoteId": 16,
    "name": "Irving",
    "quote": "Hi, kids. What's for dinner?"
  },
  {
    "quoteId": 13,
    "name": "Irving",
    "quote": "You smug motherfucker."
  },
  {
    "quoteId": 4,
    "name": "Irving",
    "quote": "Let's burn this place to the ground."
  }
]
```
