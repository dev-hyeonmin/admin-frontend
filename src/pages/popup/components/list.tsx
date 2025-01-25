import Box from '@components/layout/box/Box.tsx';
import Button from '@components/actions/Button.tsx';
import IconButton from '@components/actions/IconButton.tsx';
import { FiX } from 'react-icons/fi';

const PopupList = () => {
  return (
    <Box direction="vertical">
      <PopupItem />
      <PopupItem />
      <PopupItem />
    </Box>
  );
};

export default PopupList;

const PopupItem = () => {
  return (
    <Box
      align="space-between"
      verticalAlign="middle"
      className="w-full py-4 border-b border-zinc-200 cursor-pointer first:pt-0 last:border-b-0"
    >
      <Box direction="vertical" className="gap-1">
        <div className="text-sm">2025년 1월 1차 이벤트 팝업</div>
        <div className="text-xs text-zinc-400 font-thin">
          register at 2025.01.01 ﹒ Created by 홍길동
        </div>
      </Box>

      <Box className="gap-1">
        <Button label="preview" />
        <IconButton icon={<FiX className="text-lg text-red-500" />} skin="danger" />
      </Box>
    </Box>
  );
};
