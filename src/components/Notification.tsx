'use client';

import { X } from 'lucide-react';

export default function Notification() {
  // TODO close notification

  return (
    <div className="relative border-b border-gray-200 p-12">
      <div className="font-medium">
        📣 [업데이트] 5/7(수) ver1.2.402마이너버전(10) 패치 (17:35적용)
      </div>

      <button
        onClick={() => {}}
        className="absolute top-1/2 right-12 -translate-y-1/2 cursor-pointer text-right text-sm"
      >
        <X size={32} strokeWidth={1.5} />
      </button>
    </div>
  );
}
