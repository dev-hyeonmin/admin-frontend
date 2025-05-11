import { CloudUpload } from 'lucide-react';
import { useCallback, useState } from 'react';

const MAX_FILE_SIZE = 200 * 1024; // 200KB in bytes

export default function FromFileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError('파일 크기는 200KB 이하여야 합니다.');
      return false;
    }
    setError(null);
    return true;
  };

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
      if (validateFile(file)) {
        setSelectedFile(file);
        createPreview(file);
      }
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
        createPreview(file);
      }
    }
  }, []);

  return (
    <>
      <div className="mb-2 text-sm text-zinc-500">
        선택된 파일:{' '}
        {selectedFile ? (
          <>
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)}KB)
          </>
        ) : (
          '파일을 선택해주세요'
        )}
      </div>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}

      <label
        htmlFor="image-upload"
        className={`flex size-96 cursor-pointer flex-col items-center justify-center rounded-xl border ${
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
            <img src={previewUrl} alt="미리보기" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload size={64} strokeWidth={1} className="mb-8 text-zinc-500" />

            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">드래그하거나 클릭해서 이미지를 추가해보세요</span>
            </p>
            <p className="text-xs text-gray-500">200KB 이하의 PNG, JPG, JPEG 파일만 가능해요</p>
          </div>
        )}

        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
      </label>
    </>
  );
}
