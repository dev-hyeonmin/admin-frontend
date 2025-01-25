import Box from '@components/layout/box/Box.tsx';
import Button from '@components/actions/Button.tsx';

interface PopupListProps {
  selectPopupId: (id: number) => void;
}

const PopupList = ({ selectPopupId }: PopupListProps) => {
  return (
    <Box direction="vertical">
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
  return (
    <Box
      align="space-between"
      verticalAlign="middle"
      className="w-full py-4 border-b border-zinc-200 first:pt-0 last:border-b-0"
    >
      <Box direction="vertical" className="gap-1">
        <div className="text-sm">2025년 1월 1차 이벤트 팝업</div>
        <div className="text-xs text-zinc-400 font-thin">
          register at 2025.01.01 ﹒ Created by 홍길동
        </div>
      </Box>

      <Box className="gap-1">
        <Button label="미리보기" onClick={selectPopupId} />
        <Button label="삭제" onClick={selectPopupId} skin="danger" priority="primary" />
      </Box>
    </Box>
  );
};
