import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import Box from '@components/layout/box/Box.tsx';

interface StepsProps {
  list?: string[];
}

const Steps = ({ list }: StepsProps) => {
  if (!list) {
    return null;
  }

  return (
    <div className="py-4 bg-zinc-100 md:py-20">
      <MaxScreenSize>
        <Box className="gap-4 flex-wrap text-sm md:text-base md:flex-nowrap">
          {list?.map((item, index) => <Step key={`step${index}`} number={index + 1} text={item} />)}
        </Box>
      </MaxScreenSize>
    </div>
  );
};

export default Steps;

/**
 * Components
 */
interface StepProps {
  number: number;
  text: string;
}

const Step = ({ number, text }: StepProps) => {
  return (
    <Box
      direction="vertical"
      align="center"
      className="w-[calc(50%-8px)] py-10 rounded-lg text-center border border-zinc-200 bg-white gap-2
                 md:w-1/4 md:py-20 md:gap-4"
    >
      <div className="w-full text-3xl text-zinc-300 font-medium md:text-4xl">0{number}</div>
      <div className="w-full text-zinc-300 font-light text-sm md:text-base">step</div>
      <div className="w-full mt-2 md:text-xl">{text}</div>
    </Box>
  );
};
