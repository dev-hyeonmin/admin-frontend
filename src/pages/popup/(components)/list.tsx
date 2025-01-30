import Box from '@components/layout/box/Box.tsx';
import IconButton from '@components/actions/IconButton.tsx';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoCloseOutline } from 'react-icons/io5';
import { useModal } from '@/module/react-modal';
import ConfirmModal from '@components/overlays/ConfirmModal.tsx';
import AlertModal from '@components/overlays/AlertModal.tsx';

interface PopupListProps {
  selectPopupId: (id: number) => void;
}

const PopupList = ({ selectPopupId }: PopupListProps) => {
  return (
    <Box direction="vertical" className="w-full p-8">
      <PopupItem selectPopupId={() => selectPopupId(1)} />
      <PopupItem selectPopupId={() => selectPopupId(1)} />
      <PopupItem selectPopupId={() => selectPopupId(1)} />
    </Box>
  );
};

export default PopupList;

/**
 * @components
 */

interface PopupItemProps {
  selectPopupId: (id: number) => void;
}

const PopupItem = ({ selectPopupId }: PopupItemProps) => {
  const modalManager = useModal();

  const confirmModal = () => {
    modalManager
      .push(`confirm`, ConfirmModal, {
        title: '삭제하시겠습니까?',
        description: '삭제 한 후에는 복구가 어려워요!',
        skin: 'danger',
      })
      .then(() => {
        modalManager.push(`alert`, AlertModal, { title: '삭제 되었습니다.', description: '' });
      });
  };

  return (
    <Box
      align="space-between"
      verticalAlign="middle"
      className="w-full py-4 border-b border-zinc-200 first:pt-0 last:border-b-0"
    >
      <Box verticalAlign="middle" className="gap-4">
        <img
          src="https://d3h8nxdypzlrx8.cloudfront.net/assets/images/popup/01.jpg"
          alt="팝업"
          className="size-20 rounded-xl"
        />

        <Box direction="vertical" className="gap-1">
          <div className="text-sm">2025년 1월 1차 이벤트 팝업</div>
          <div className="text-xs text-zinc-400 font-thin">
            register at 2025.01.01 ﹒ Created by 홍길동
          </div>
        </Box>
      </Box>

      <Box className="gap-1">
        <IconButton icon={<HiOutlineMagnifyingGlass />} onClick={selectPopupId} />
        <IconButton
          className="!bg-zinc-200 hover:!bg-red-500 hover:!border-red-500 group"
          icon={<IoCloseOutline className="text-lg group-hover:text-white" />}
          onClick={confirmModal}
        />
      </Box>
    </Box>
  );
};
