import os, psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify

CREATE_QUOTES_TABLE = (
    """CREATE TABLE IF NOT EXISTS quotes (quoteId SERIAL PRIMARY KEY, name TEXT, quote TEXT);"""
)

INSERT_QUOTE = (
    """INSERT INTO quotes (name, quote) VALUES (%s, %s);"""
)

GET_QUOTE = """SELECT * FROM quotes ORDER BY RANDOM LIMIT 1;"""

load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

@app.post("/api/quote")
def create_quote():
    data = request.get_json()
    name = data["name"]
    quote = data["quote"]

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_QUOTES_TABLE)
            cursor.execute(INSERT_QUOTE, (name, quote))
    return {"""message": f"{name} - {quote}" quote created."""}, 201

@app.get("/api/quote")
def get_quote():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_QUOTE)
            quote = cursor.fetchone()
    if quote:
        return jsonify({"name": quote[1], "quote": quote[2]})
    else:
        return jsonify({"error": "No quote found"}), 404
