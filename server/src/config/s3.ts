import { S3Client } from "bun";
import { BUCKET_CONFIG } from "./env.global";

const {accessKeyId, secretAccessKey, bucket, region, endpoint} = BUCKET_CONFIG;

if (!accessKeyId || !secretAccessKey || !bucket || !region || !endpoint) {
    console.warn("Space Bucket is not properly set up in .env");
}

export const s3 = new S3Client({
    accessKeyId: BUCKET_CONFIG.accessKeyId,
    secretAccessKey: BUCKET_CONFIG.secretAccessKey,
    bucket: BUCKET_CONFIG.bucket,
    region: BUCKET_CONFIG.region, 
    endpoint: BUCKET_CONFIG.endpoint,
})

console.log(`S3 Client is running.`)