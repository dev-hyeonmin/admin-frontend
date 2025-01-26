import { ChangeEvent, useState } from 'react';
import { PiPlus } from 'react-icons/pi';
import { MdOutlineAttachFile } from 'react-icons/md';
import Box from '@components/layout/box/Box.tsx';

interface FileUploadProps {
  accept?: string;
}

export default function FileUpload({ accept }: FileUploadProps) {
  const [imgFile, setImgFile] = useState('');
  const [imgFileName, setImgFileName] = useState('');

  const preivewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileName(() => file.name);
      setImgFile(() => String(reader.result));
    };
  };

  return (
    <Box direction="vertical" className="w-full">
      {/* 숨겨진 input */}
      <input
        type="file"
        id="file-upload"
        accept={accept}
        onChange={(e) => preivewImage(e)}
        className="hidden" // input을 화면에서 숨김
      />

      {/* 커스텀 label */}
      <label
        htmlFor="file-upload"
        className={`block size-56 p-2.5 bg-cover bg-center bg-blue-50 rounded cursor-pointer ${imgFile ? 'border border-zinc-200' : ''}`}
        style={{ backgroundImage: `url(${imgFile})` }}
      >
        {!imgFile && (
          <div className="flex justify-center items-center w-full h-full border border-dashed border-blue-300 rounded">
            <PiPlus className="text-4xl text-blue-300" />
          </div>
        )}
      </label>

      {imgFileName && (
        <Box verticalAlign="middle" className="mt-2 gap-1 text-xs">
          <MdOutlineAttachFile className="text-lg text-zinc-500" />
          {imgFileName}
        </Box>
      )}
    </Box>
  );
}
