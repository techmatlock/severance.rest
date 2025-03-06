import json, os
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal
from boto3.dynamodb.conditions import Attr

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
dynamodb_table = dynamodb.Table('quotes')

quotes_path = '/quotes'
quote_path = '/quote'

def lambda_handler(event, context):
    try:
        http_method = event.get('httpMethod')
        path = event.get('path')

        if http_method == 'GET' and path == quotes_path:
            response = get_quotes()
        elif http_method == 'GET' and path == quote_path:
            name = event.get('queryStringParameters', {}).get('name')
            response = get_quotes_by_name(name)
        elif http_method == 'POST' and path == quote_path:
            post = json.loads(event['body'])
            response = add_quote(post)
        else:
            response = build_response(404, '404 Not Found')

    except Exception as e:
        print('Error:', e)
        response = build_response(400, 'Error processing request')
   
    return response

def get_quotes():
    try:
        return build_response(200, dynamodb_table.scan().get('Items', []))
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])
    
def get_quotes_by_name(name):
    try:
        if not name:
            return build_response(400, 'Missing query parameter: name')
        response = dynamodb_table.scan(FilterExpression=Attr('name').begins_with(name))
        items = response.get('Items', [])
        return build_response(200, items)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])
    
def add_quote(data):
    try:
        if 'name' not in data or 'quote' not in data:
                return build_response(400, {"message": "Missing name or quote in request body"})

        response = dynamodb_table.scan()

        dynamodb_table.put_item(
            Item={
                'quoteId': str(len(response['Items']) + 1), 
                'name': data['name'],
                'quote': data['quote']
            }
        )
        return build_response(201, {"message": "Quote added successfully"})
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def convert_decimal(obj):
    if isinstance(obj, list):
        return [convert_decimal(i) for i in obj]
    elif isinstance(obj, dict):
        return {
            k: int(v) if k == "quoteId" and isinstance(v, str) and v.isdigit() else convert_decimal(v) 
            for k, v in obj.items()
        }
    elif isinstance(obj, Decimal):
        return int(obj)
    return obj


def build_response(status_code, body):
    cors_url = os.environ.get("CORS_URL")

    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": cors_url,
        },
        'body': json.dumps(convert_decimal(body))
    }