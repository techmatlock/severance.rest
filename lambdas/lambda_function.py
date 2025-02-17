import json
import boto3

def lambda_handler(event, context):
    # Define S3 client
    s3 = boto3.client("s3")
    
    # Specify bucket name and file key (path in S3)
    bucket_name = "severance.rest"
    file_key = "src/quotes-list.json"
    
    try:
        # Get object from S3
        response = s3.get_object(Bucket=bucket_name, Key=file_key)

        print("response:", response)
        
        # Read JSON content
        json_content = response["Body"].read().decode("utf-8")
        data = json.loads(json_content)

        print("data:", data)
        
        # Print or return the JSON data
        return {
            "statusCode": 200,
            "body": json.dumps(data)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
