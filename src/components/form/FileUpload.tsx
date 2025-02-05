import { ChangeEvent, useState } from 'react';
import { PiPlus } from 'react-icons/pi';
import { MdOutlineAttachFile } from 'react-icons/md';
import Box from '@components/layout/box/Box.tsx';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import InputError from '@components/form/InputError.tsx';

interface FileUploadProps {
  name: string;
  rules?: (RegisterOptions<FieldValues, string> | undefined);
  accept?: string;
}

export default function FileUpload({ name, rules, accept }: FileUploadProps) {
  const { control, formState } = useFormContext();
  const [imgFile, setImgFile] = useState('');
  const [imgFileName, setImgFileName] = useState('');
  const error = formState.errors[name];

  const previewImage = (e: ChangeEvent<HTMLInputElement>, onChange: (file: File | null) => void) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFileName(file.name);
        setImgFile(String(reader.result));
      };

      // 📌 react-hook-form에 파일 정보 업데이트
      onChange(file);
    }
  };

  return (
    <Box direction="vertical" className="w-full">
      {/* 숨겨진 input */}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange } }) => (
          <input
            type="file"
            id="file-upload"
            accept={accept}
            onChange={(e) => previewImage(e, onChange)}
            className="hidden"
          />
        )}
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

      {/* 에러메세지 */}
      {error && <InputError message={String(error.message)} />}

      {imgFileName && (
        <Box verticalAlign="middle" className="mt-2 gap-1 text-xs">
          <MdOutlineAttachFile className="text-lg text-zinc-500" />
          {imgFileName}
        </Box>
      )}
    </Box>
  );
}
