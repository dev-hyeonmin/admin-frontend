import { useState, useEffect } from 'react';

export type ModalType = 'alert' | 'confirm';

export interface ModalProps {
  isOpen: boolean;
  type: ModalType;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

const Modal = ({ isOpen, type, title, message, onConfirm, onCancel, onClose }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center p-1 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black opacity-10"
        onClick={type === 'alert' ? handleConfirm : handleCancel}
      />

      {/* 모달 컨테이너 */}
      <div
        className={`z-10 w-full max-w-md transform rounded-lg bg-white shadow-xl ${isOpen ? 'scale-100' : 'scale-95'} transition-transform duration-200`}
      >
        {/* 모달 헤더 */}
        {title && (
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        {/* 모달 내용 */}
        <div className="px-6 py-4">
          <div className="text-sm text-gray-600">{message}</div>
        </div>

        {/* 모달 푸터 */}
        <div className="flex justify-end space-x-2 rounded-b-lg bg-gray-50 px-6 py-3">
          {type === 'confirm' && (
            <button
              className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              onClick={handleCancel}
            >
              취소
            </button>
          )}
          <button
            className={`rounded px-4 py-2 focus:ring-2 focus:outline-none ${
              type === 'alert'
                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
                : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
            }`}
            onClick={handleConfirm}
          >
            {type === 'alert' ? '확인' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
