Aws.config.update({
  region: 'us-east-1',
  credentials: Aws::Credentials.new(ENV['s3_access_key_id'], ENV['s3_secret_access_key']),
})

S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['s3_bucket'])