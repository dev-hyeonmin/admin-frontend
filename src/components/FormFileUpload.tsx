import { CloudUpload, TriangleAlert } from 'lucide-react';
import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import Image from 'next/image';

interface FormFileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  description?: string;
  errors?: string[];
}

export default function FromFileUpload({
  name,
  description,
  errors = [],
  ...rest
}: FormFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const createPreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      createPreview(file);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      createPreview(file);
    }
  }, []);

  return (
    <>
      <div className="text-sm text-zinc-500">
        선택된 파일:{' '}
        {selectedFile ? (
          <>
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)}KB)
          </>
        ) : (
          '파일을 선택해주세요'
        )}
      </div>

      {errors.map((error, index) => (
        <span
          key={index}
          className="mt-1 flex items-center gap-1 pl-0.5 text-sm font-medium text-red-500"
        >
          <TriangleAlert size={14} /> {error}
        </span>
      ))}

      <label
        htmlFor="image-upload"
        className={`mt-2 flex size-96 cursor-pointer flex-col items-center justify-center rounded-xl border ${
          previewUrl
            ? 'border-zinc-300'
            : `border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-zinc-300 bg-gray-50'}`
        } relative overflow-hidden hover:bg-gray-100`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="absolute inset-0">
            <Image
              src={previewUrl}
              alt="미리보기"
              className="h-full w-full object-cover"
              width={284}
              height={284}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload size={64} strokeWidth={1} className="mb-8 text-zinc-500" />

            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">드래그하거나 클릭해서 이미지를 추가해보세요</span>
            </p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        )}

        <input
          id="image-upload"
          type="file"
          name={name}
          className="hidden"
          onChange={handleFileChange}
          {...rest}
        />
      </label>
    </>
  );
}
