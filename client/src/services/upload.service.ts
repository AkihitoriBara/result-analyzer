import { Upload } from "@/types/upload";
import { API_URL } from "@/lib/config";

export type UploadResult = {
  success: boolean;
  message: string;
  totalStudents: number;
};

type UploadHistoryResponse = {
  uploads: Upload[];
};

type DeleteUploadResponse = {
  success: boolean;
  message: string;
};

type UploadResultPdfOptions = {
  onProgress: (progress: number) => void;
  onProcessing: () => void;
};

export async function getUploads(): Promise<Upload[]> {
  const response = await fetch(`${API_URL}/uploads`);

  if (!response.ok) {
    throw new Error("Failed to fetch upload history.");
  }

  const data: UploadHistoryResponse = await response.json();

  return data.uploads;
}

export async function deleteUpload(
  uploadId: number,
): Promise<DeleteUploadResponse> {
  const response = await fetch(`${API_URL}/uploads/${uploadId}`, {
    method: "DELETE",
  });

  const data = (await response.json()) as DeleteUploadResponse;

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete upload.");
  }

  return data;
}

export function uploadResultPdf(
  file: File,
  options: UploadResultPdfOptions,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("resultPdf", file);

    const request = new XMLHttpRequest();

    request.open("POST", `${API_URL}/upload`);

    request.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }

      const progress = Math.round((event.loaded / event.total) * 100);

      options.onProgress(progress);

      if (progress === 100) {
        options.onProcessing();
      }
    };

    request.onload = () => {
      let data: UploadResult | { message?: string } = {};

      try {
        data = JSON.parse(request.responseText) as UploadResult;
      } catch {
        data = {};
      }

      if (request.status >= 200 && request.status < 300) {
        resolve(data as UploadResult);
        return;
      }

      reject(
        new Error(data.message || "The PDF could not be processed."),
      );
    };

    request.onerror = () => {
      reject(new Error("Could not connect to the upload server."));
    };

    request.send(formData);
  });
}
