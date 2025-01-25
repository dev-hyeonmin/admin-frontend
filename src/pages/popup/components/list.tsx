import Box from '@components/layout/box/Box.tsx';
import { SlArrowRight } from 'react-icons/sl';
import IconButton from '@components/actions/IconButton.tsx';

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
      className="w-full py-4 border-b border-zinc-200 first:pt-0 last:border-b-0"
    >
      <Box direction="vertical" className="gap-1">
        <div className="text-sm">2025 1월 1차 이벤트 팝업</div>
        <div className="text-xs text-zinc-400 font-thin">
          register at 2025.01.01 ﹒ Created by 홍길동
        </div>
      </Box>

      <IconButton className="size-6" icon={<SlArrowRight className="text-zinc-700" />} />
    </Box>
  );
};
