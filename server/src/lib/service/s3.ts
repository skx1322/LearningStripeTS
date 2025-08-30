import { status } from "elysia";
import { BUCKET_CONFIG } from "../../config/env.global";
import { s3 } from "../../config/s3";
import { getFileBuffer } from "../../utils/bufferFile";
import { UUIDHex } from "../../utils/uuid";

type acl = "public-read" | "private"

export async function uploadImage(image: File, perm: acl = "public-read"): Promise<string> {
    try {
        const buffer = await getFileBuffer(image);
        if (!buffer) {
            console.error("Failed to convert file into buffer.")
            return "";
        }
        const fileExtension = image.name.split('.').pop();
        const uniqueFileName = `imageAsset/${await UUIDHex("hex", 2)}.${fileExtension}`;

        const DO_BUCKET = BUCKET_CONFIG.bucket;
        const DO_ENDPOINT = BUCKET_CONFIG.endpoint;

        const s3File = s3.file(uniqueFileName, {
            acl: perm,
            type: image.type
        });

        await Bun.write(s3File, buffer);

        const imageUrl = `${DO_ENDPOINT}/${DO_BUCKET}/${uniqueFileName}`;
        return imageUrl;
    } catch (error) {
        console.error(`Failed to upload ${image.name} to S3: ${error}`);
        return "";
    }
}

export async function deleteS3File(filePath: string): Promise<boolean> {
    try {
        const file = new URL(filePath).pathname.slice(15)
        const s3File = s3.file(`${file}`);

        const isExist = await s3File.exists();
        if (!isExist) {
            console.error(`File ${isExist} does not exist.`)
            return false;
        }

        await s3File.delete();

        const AfterCheck = await s3File.exists();
        if (AfterCheck) {
            console.log(`File still exist ${file}`);
            return false;
        };
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
