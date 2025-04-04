# [severance.rest](https://severance.rest)

Inspired by the TV show Severance. A free REST API for random quotes.

## Technologies Used

- AWS Lambda
- API Gateway
- AWS Cognito
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

### `GET` [https://api.severance.rest/quote?name=Mr. Milchick](https://api.severance.rest/quote?name=Mr.%20Milchick)

```json
[
  {
    "quoteId": 9,
    "name": "Mr. Milchick",
    "quote": "We serve Kier, you CHILD!"
  },
  {
    "quoteId": 1,
    "name": "Mr. Milchick",
    "quote": "The Music Dance Experience is officially cancelled."
  },
  {
    "quoteId": 12,
    "name": "Mr. Milchick",
    "quote": "Marshmallows are for team players. They don’t just hand them out."
  }
]
```

### Lambda

1. cd /lambdas/
2. mkdir package
3. pip install --target ./package boto3
4. cd package
5. zip -r ../my_deployment_package.zip .
6. cd ..
7. zip my_deployment_package.zip lambda_function.py
8. aws lambda update-function-code --function-name severance-api --zip-file fileb://my_deployment_package.zip
