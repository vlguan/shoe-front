import boto3
from botocore.exceptions import NoCredentialsError

def init_s3_client(access_key, secret_key, region):
    try:
        s3 = boto3.client('s3',aws_access_key_id=access_key, aws_secret_access_key=secret_key, region_name=region)
        print("Successful connection")
        return s3
    except NoCredentialsError:
        print("Credential not available")
def upload_to_s3(s3_client, local_file_path, bucket_name, s3_file_name):
    try:
        s3_client.upload_file(local_file_path, bucket_name,s3_file_name)
        print(f"File uploaded to S3: {s3_file_name}")
        return True
    except NoCredentialsError:
        print("Creds not available")
        return False
def upload_to_s3_batch(s3_client, local_file_paths, bucket_name):
    upload_results = {}
    for local_files in local_file_paths:
        try:
            s3_file_name = local_files.split('/')[-1]
            s3_client.upload_file(local_files, bucket_name, s3_file_name)
            upload_results[s3_file_name] = 'Success'
            print(f"File uploaded to S3: {s3_file_name}")
        except NoCredentialsError:
            print("credentials not found")
            upload_results[s3_file_name]= "Failed"
    return upload_results
    