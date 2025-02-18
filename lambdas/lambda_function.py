import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal
from boto3.dynamodb.conditions import Key

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
dynamodb_table = dynamodb.Table('quotes')

quote_path = '/quote'
quotes_path = '/quotes'

def lambda_handler(event, context):
    try:
        http_method = event.get('httpMethod')
        path = event.get('path')

        if http_method == 'GET' and path == quote_path:
            quoteId = event['queryStringParameters']['quoteId']
            response = get_quote(quoteId)
        elif http_method == 'GET' and path == quotes_path:
            response = get_quotes()
        else:
            response = build_response(404, '404 Not Found')

    except Exception as e:
        print('Error:', e)
        response = build_response(400, 'Error processing request')
   
    return response

def get_quote(id):
    try:
        response = dynamodb_table.get_item(Key={'quoteId': id})
        return build_response(200, response.get('Item'))
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def get_quotes():
    try:
        scan_params = {
            'TableName': dynamodb_table.name
        }
        return build_response(200, scan_dynamo_records(scan_params, []))
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def scan_dynamo_records(scan_params, item_array):
    response = dynamodb_table.scan(**scan_params)
    item_array.extend(response.get('Items', []))
   
    if 'LastEvaluatedKey' in response:
        scan_params['ExclusiveStartKey'] = response['LastEvaluatedKey']
        return scan_dynamo_records(scan_params, item_array)
    else:
        return item_array

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
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        'body': json.dumps(convert_decimal(body))
    }