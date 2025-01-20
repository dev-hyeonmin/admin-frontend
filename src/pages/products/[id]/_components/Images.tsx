import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import Box from '@components/layout/box/Box.tsx';

interface ImagesProps {
  list?: string[];
}

const Images = ({ list }: ImagesProps) => {
  if (!list) {
    return null;
  }

  return (
    <MaxScreenSize className="!max-w-screen-md py-12 border-b border-zinc-200 md:py-20">
      <Box direction="vertical" className="w-full">
        {list.map((item, index) => (
          <div className="md:flex-1" key={`product_detail_img${index}`}>
            <img src={item} className="w-full" />
          </div>
        ))}
      </Box>
    </MaxScreenSize>
  );
};

export default Images;
