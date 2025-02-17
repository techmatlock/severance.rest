# severance.rest

A free REST API for random Severance quotes.

## Table of Contents

## Preview

## Technologies Used

- Lambda
- API Gateway
- DynamoDB
- S3
- React
- TypeScript

## Live Demo

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory:

   ```bash
   cd your-repo-name/client
   npm install

   cd your-repo-name/database
   pip install -r requirements.txt
   ```

#### Set up the database

1. In your browser navigate to the site you used for your database design.
2. Export your database as PostgreSQL, this should generate the SQL code for creating your database tables.
3. In a separate terminal, run `psql -d <databasebaseUrl> -f data.sql schema.sql` to create your tables
4. After any changes to `database/schema.sql` or `database/data.sql` re-run the `psql <databasebaseUrl> -f data.sql -f schema.sql` command to update your database. Use `psql` to verify your changes were successfully applied.

# Challenges Encountered

- Error: Object of type Decimal is not JSON serializable

Had to use a helper function to convert decimal because DynamoDB uses Decimal for numbers, while Python's json.dumps() does not support Decimal by default.

- Error: An error occurred (ValidationException) when calling the GetItem operation: The provided key element does not match the schema

I was using the wrong DynamoDB Primary Key in my Lambda function which handled the quote endpoint with a query parameter

- Error: An error occurred (AccessDeniedException) when calling the GetItem operation: User: arn:aws:sts::456060160047:assumed-role/severance-api-role-06oxxfzm/severance-api is not authorized to perform: dynamodb:GetItem on resource: arn:aws:dynamodb:us-east-1:456060160047:table/quotes because no identity-based policy allows the dynamodb:GetItem action

Used a custom IAM Policy which only allows the Lambda role to perform the actions: dynamodb:GetItem, dynamodb:Query, dynamodb:Scan
