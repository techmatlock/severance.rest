# severance.rest

A free REST API for random Severance quotes.

## Table of Contents

## Preview

## Technologies Used

- Lambda
- API Gateway
- RDS PostgreSQL
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

#### Create the database

If your project will be using a database, create it now.

1. Start PostgreSQL
   ```sh
   sudo service postgresql start
   ```
1. Create database (replace `name-of-database` with a name of your choosing, such as the name of your app)
   ```sh
   createdb name-of-database
   ```
1. In the `server/.env` file, in the `DATABASE_URL` value, replace `changeMe` with the name of your database, from the last step
1. While you are editing `server/.env`, also change the value of `TOKEN_SECRET` to a custom value, without spaces.

#### Start the development servers

1. In both the `client` and `server` folders, start the development servers using:
   ```sh
   npm run dev
   ```
1. Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where the servers are running.

#### Set up the database

1. In your browser navigate to the site you used for your database design.
2. Export your database as PostgreSQL, this should generate the SQL code for creating your database tables.
3. In a separate terminal, run `psql -d <databasebaseUrl> -f data.sql schema.sql` to create your tables
4. After any changes to `database/schema.sql` or `database/data.sql` re-run the `psql <databasebaseUrl> -f data.sql -f schema.sql` command to update your database. Use `psql` to verify your changes were successfully applied.

# Challenges Encountered

1.  I kept getting 403 Forbidden and CORS errors when running my React app, but my Flask app didn't handle OPTIONS requests so I had to add to each route. I also had to import CORS from the flask_cors library and add the line in `app.py`:

```
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes
```
