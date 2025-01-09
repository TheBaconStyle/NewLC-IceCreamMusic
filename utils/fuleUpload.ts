import { Client as S3Client } from "minio";

const bucketNames = [
  "previews",
  "tracks",
  "syncs",
  "ringtones",
  "videos",
  "videoshots",
  "avatars",
] as const;

export type S3BucketName = (typeof bucketNames)[number];

export async function uploadFile({
  file,
  bucket,
  name,
  client,
}: {
  file: File;
  bucket: S3BucketName;
  name: string;
  client: S3Client;
}) {
  const fileBytes = await file.arrayBuffer();

  return await client.putObject(bucket, name, Buffer.from(fileBytes));
}

export async function removeFile({
  client,
  bucket,
  name,
}: {
  bucket: S3BucketName;
  name: string;
  client: S3Client;
}) {
  return await client.removeObject(bucket, name);
}
