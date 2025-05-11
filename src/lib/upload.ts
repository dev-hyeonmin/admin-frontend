export async function uploadFile(file: File, directory: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('directory', directory);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('파일 업로드에 실패했습니다.');
  }

  const data = await response.json();
  return data.url;
} 