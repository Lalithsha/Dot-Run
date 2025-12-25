import {
    S3Client,
    CopyObjectCommand,
    paginateListObjectsV2,
    S3ServiceException,
  } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

dotenv.config();

// Initialize S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: "auto", // R2 uses "auto" as the region
  endpoint: process.env.S3_ENDPOINT, // Should be: https://<account-id>.r2.cloudflarestorage.com (NO bucket name)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  }
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
/**
 * Copy all objects from source folder to destination folder in R2
 * @param sourcePrefix - Source folder prefix (e.g., "base/javascript")
 * @param destPrefix - Destination folder prefix (e.g., "code/replId")
 */
export async function copys3Folder(
  sourcePrefix: string,
  destPrefix: string
): Promise<void> {
  try {
    console.log(`[R2 Copy] Starting copy operation:`);
    console.log(`  Source location: ${sourcePrefix}`);
    console.log(`  Destination location: ${destPrefix}`);
    console.log(`  Bucket: ${BUCKET_NAME}`);
    
    const objectKeys: string[] = [];

    // List all objects in the source folder using pagination
    try {
      const paginator = paginateListObjectsV2(
        { client: s3Client, pageSize: 1000 },
        { 
          Bucket: BUCKET_NAME,
          Prefix: sourcePrefix 
        },
      );

      for await (const page of paginator) {
        if (page.Contents) {
          const keys = page.Contents.map((obj) => obj.Key!).filter(Boolean);
          objectKeys.push(...keys);
        }
      }
    } catch (caught) {
      if (
        caught instanceof S3ServiceException &&
        caught.name === "NoSuchBucket"
      ) {
        throw new Error(
          `Error from R2: The bucket "${BUCKET_NAME}" doesn't exist.`
        );
      } else if (caught instanceof S3ServiceException) {
        throw new Error(
          `Error from R2 while listing objects: ${caught.name}: ${caught.message}`
        );
      } else {
        throw caught;
      }
    }

    if (objectKeys.length === 0) {
      throw new Error(`No objects found in source folder: ${sourcePrefix}`);
    }

    console.log(`[R2 Copy] Found ${objectKeys.length} file(s) to copy:`);
    objectKeys.forEach((key, index) => {
      console.log(`  ${index + 1}. ${key}`);
    });

    console.log(`[R2 Copy] Starting to copy files...`);
    // Copy each object
    const copyPromises = objectKeys.map(async (sourceKey) => {
      // Remove the source prefix and add the destination prefix
      const relativePath = sourceKey.replace(sourcePrefix, "");
      const destKey = `${destPrefix}${relativePath}`;

      try {
        await s3Client.send(
          new CopyObjectCommand({
            CopySource: `${BUCKET_NAME}/${sourceKey}`,
            Bucket: BUCKET_NAME,
            Key: destKey,
          })
        );
        console.log(`[R2 Copy] ✓ Copied file:`);
        console.log(`    From: ${sourceKey}`);
        console.log(`    To:   ${destKey}`);
      } catch (caught) {
        if (caught instanceof S3ServiceException) {
          console.error(
            `Error copying ${sourceKey} to ${destKey}: ${caught.name}: ${caught.message}`
          );
          throw caught;
        } else {
          throw caught;
        }
      }
    });

    await Promise.all(copyPromises);
    console.log(`[R2 Copy] ✓ Copy operation completed successfully!`);
    console.log(`  Total files copied: ${objectKeys.length}`);
    console.log(`  Source: ${sourcePrefix}`);
    console.log(`  Destination: ${destPrefix}`);
  } catch (error) {
    console.error("Error copying R2 folder:", error);
    throw error;
  } 
}