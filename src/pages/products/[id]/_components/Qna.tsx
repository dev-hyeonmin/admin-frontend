import Box from '@components/layout/box/Box.tsx';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';

interface QnaProps {
  list?: string[];
}

const Qna = ({ list }: QnaProps) => {
  if (!list) {
    return null;
  }

  return (
    <MaxScreenSize className="!max-w-screen-md py-12 border-b border-zinc-200 md:py-20">
      <div className="font-bold text-xl md:text-2xl">Q&A</div>

      <Box direction="vertical" className="mt-8 gap-6 text-sm md:text-lg md:gap-8">
        {list?.map((item, index) => {
          if (index % 2 == 0) {
            return <Question key={`qna${index}`} text={item} />;
          } else {
            return <Answer key={`qna${index}`} text={item} />;
          }
        })}
      </Box>
    </MaxScreenSize>
  );
};

export default Qna;

/**
 * Components
 */
const Question = ({ text }: { text: string }) => {
  return (
    <div className="w-full text-right">
      <div
        className="inline-block py-3 px-5 text-white bg-[#c1b6a3] rounded-full rounded-tr-none text-left
                md:py-4 md:px-6"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
};

const Answer = ({ text }: { text: string }) => {
  return (
    <Box className="gap-4">
      <Box
        verticalAlign="middle"
        align="center"
        className="-mt-4 size-12 rounded-full border border-[#c1b6a3] text-[#c1b6a3] md:size-16"
      >
        C
      </Box>
      <div
        className="w-9/12 py-3 px-5 border border-zinc-200 rounded-[2.5rem] rounded-tl-none
                md:w-8/12 md:py-4 md:px-6 md:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </Box>
  );
};
