import os, psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify

load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

quotes_list = []

@app.post("/api/quote")
def create_quote():
    data = request.get_json()
    name = data["name"]
    quote = data["quote"]

    with connection:
        with connection.cursor() as cursor:
            cursor.execute("CREATE TABLE IF NOT EXISTS quotes (quoteId SERIAL PRIMARY KEY, name TEXT, quote TEXT);")
            cursor.execute("INSERT INTO quotes (name, quote) VALUES (%s, %s);", (name, quote))
    return jsonify({"message": "success"}), 201

@app.get("/api/quote")
def get_quote():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1;")
            quote = cursor.fetchone()
    if quote:
        return jsonify({"name": quote[1], "quote": quote[2]})
    else:
        return jsonify({"error": "No quote found"}), 404

@app.get("/api/quotes")
def get_quotes():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM quotes ORDER BY quoteId ASC;")
            quotes = cursor.fetchall()
    if quotes:
        for quote in quotes:
            quotes_list.append({
                    "quoteId": quote[0], "name": quote[1], "quote": quote[2]
                    })
        return jsonify(quotes_list)
    else:
        return jsonify({"error": "No quotes found"}), 404