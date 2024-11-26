"use client";

import { downloadFileBrowser } from "ipull/dist/browser.js";
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";

export function DownloadButton({
  src,
  fileName,
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  src: string;
  fileName: string;
}) {
  const [url, setUrl] = useState<string>();

  const [isDownloading, setIsDownloading] = useState(false);

  const [progress, setProgress] = useState(0);

  return (
    <>
      {!url && (
        <button
          {...props}
          onClick={async () => {
            setIsDownloading(true);
            const downloader = await downloadFileBrowser({
              url: src,
            });

            downloader.on("progress", (progress) => {
              setProgress(
                Math.round(
                  (progress.transferredBytes / progress.totalBytes) * 100
                )
              );
            });

            await downloader.download();

            setUrl(downloader.writeStream.resultAsBlobURL());

            setIsDownloading(false);
          }}
          disabled={isDownloading}
          className={className}
        >
          {isDownloading ? `Прогресс загрузки файла: ${progress}%` : fileName}
        </button>
      )}
      {url && (
        <a href={url} download={fileName} className={className}>
          {fileName}
        </a>
      )}
    </>
  );
}
