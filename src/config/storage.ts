const S3_BASE_URL =
  'https://cdn-sites-multys.s3.us-east-1.amazonaws.com/site-multystory/images'

export function imageUrl(path: string): string {
  return `${S3_BASE_URL}/${path}`
}