import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Creates a new database connection for each request."""
    return psycopg2.connect(DATABASE_URL)

@app.post("/api/quote")
def create_quote():
    data = request.get_json()
    name = data["name"]
    quote = data["quote"]

    try:
        connection = get_db_connection()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("CREATE TABLE IF NOT EXISTS quotes (quoteId SERIAL PRIMARY KEY, name TEXT, quote TEXT);")
                cursor.execute("INSERT INTO quotes (name, quote) VALUES (%s, %s);", (name, quote))
        return jsonify({"message": "success"}), 201

    except psycopg2.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        if 'connection' in locals() and connection:
            connection.close()  # Close the database connection


@app.get("/api/quote")
def get_quote():
    try:
        connection = get_db_connection()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1;")
                quote = cursor.fetchone()

        if quote:
            return jsonify({"name": quote[1], "quote": quote[2]})
        else:
            return jsonify({"error": "No quote found"}), 404

    except psycopg2.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        if 'connection' in locals() and connection:
            connection.close()


@app.route("/api/quotes", methods=["GET", "OPTIONS"])
def get_quotes():
    if request.method == "OPTIONS":
        return "", 204  # Respond to preflight requests
    
    quotes_list = []

    try:
        connection = get_db_connection()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM quotes ORDER BY quoteId ASC;")
                quotes = cursor.fetchall()

        if quotes:
            for quote in quotes:
                quotes_list.append({
                    "quoteId": quote[0],
                    "name": quote[1],
                    "quote": quote[2]
                })
            return jsonify(quotes_list)
        else:
            return jsonify({"error": "No quotes found"}), 404

    except psycopg2.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        if 'connection' in locals() and connection:
            connection.close()


if __name__ == "__main__":
    app.run(debug=True)
