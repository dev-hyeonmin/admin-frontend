import Box from '@components/layout/box/Box.tsx';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';

interface InfoProps {
  title: string;
  list?: string[];
}

const Info = ({ title, list }: InfoProps) => {
  if (!list) {
    return null;
  }

  return (
    <MaxScreenSize className="!max-w-screen-md py-12 border-b border-zinc-200 md:py-20">
      <div className="font-bold text-xl md:text-2xl">{title}</div>

      <Box direction="vertical" className="mt-8 gap-2 md:gap-4">
        {list.map((item, index) => (
          <Item key={`${title}_${index}`} number={index + 1} text={item} />
        ))}
      </Box>
    </MaxScreenSize>
  );
};

export default Info;

/**
 * Components
 */
interface ItemProps {
  number: number;
  text: string;
}

const Item = ({ number, text }: ItemProps) => {
  return (
    <Box verticalAlign="middle" className="gap-4">
      <div className="w-8 text-2xl text-zinc-300 font-medium md:w-12 md:text-4xl">0{number}</div>
      <div className="md:text-xl" dangerouslySetInnerHTML={{ __html: text }}></div>
    </Box>
  );
};
