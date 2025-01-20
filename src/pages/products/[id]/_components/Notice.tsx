import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import Box from '@components/layout/box/Box.tsx';

interface NoticeProps {
  list: string[];
}

const Notice = ({ list }: NoticeProps) => {
  return (
    <MaxScreenSize className="!max-w-screen-md py-12 md:py-20">
      <div className="font-bold text-xl md:text-2xl">주의사항</div>

      <Box direction="vertical" className="mt-8 pl-2 gap-2 md:gap-4">
        {list.map((item, index) => (
          <Item key={`notice${index}`} text={item} />
        ))}
      </Box>
    </MaxScreenSize>
  );
};

export default Notice;

/**
 * Components
 */
interface ItemProps {
  text: string;
}

const Item = ({ text }: ItemProps) => {
  return (
    <Box
      direction="horizontal"
      verticalAlign="middle"
      className="gap-4 text-sm md:text-base md:text-lg"
    >
      <img src="/assets/icon/icon-checkmark.png" className="size-3 md:size-4" />
      {text}
    </Box>
  );
};
