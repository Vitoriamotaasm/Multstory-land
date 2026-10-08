const S3_BASE_URL =
  'https://cdn-sites-multys.s3.us-east-1.amazonaws.com/site-multystory'

export function s3Url(path: string): string {
  return `${S3_BASE_URL}/${path.replace(/^\/+/, '')}`
}

export function imageUrl(path: string): string {
  return s3Url(`images/${path}`)
}

export function casePoster(fileName: string): string {
  return s3Url(`cases/${fileName}`)
}

export function caseVideo(fileName: string): string {
  return s3Url(`cases/${fileName}`)
}

export function videoUrl(path: string): string {
  return s3Url(`videos/${path}`)
}