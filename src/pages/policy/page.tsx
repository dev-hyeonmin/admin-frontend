import MainScreen from '@components/common/MainScreen.tsx';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import { useEffect, useRef, useState } from 'react';
import { policy } from '@/pages/policy/data.ts';
import { useSearchParams } from 'react-router';

const Policy = () => {
  const [searchParams] = useSearchParams();
  const indexParam = searchParams.get('i');
  const policyRef = useRef<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(0);
  const toggleSection = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    setSelectedIndex(() => index);
  };

  useEffect(() => {
    if (!indexParam) {
      return;
    }

    setSelectedIndex(() => Number(indexParam));
  }, [indexParam]);

  useEffect(() => {
    if (!selectedIndex) {
      return;
    }

    // setTimeout(() => {
    //   const scrollElement = policyRef.current[selectedIndex];
    //
    //   if (scrollElement) {
    //     scrollElement.scrollIntoView({ block: 'start' });
    //
    //     requestAnimationFrame(() => {
    //       window.scrollBy(0, -80);
    //     });
    //   }
    // }, 1);
  }, [selectedIndex]);

  return (
    <div>
      <MainScreen title="이용약관" img="/assets/images/policy-main.jpg" />

      <MaxScreenSize className="md:my-24 md:border-b md:border-zinc-200">
        {policy.map((item, index) => (
          <div key={`policy${index}`} className="border-t border-zinc-200">
            <div
              ref={(el) => (policyRef.current[index] = el)}
              className="py-6 text-lg font-bold cursor-pointer bg-[length:30px] bg-right bg-no-repeat md:py-8 md:text-xl"
              style={{
                backgroundImage:
                  selectedIndex === index
                    ? 'url(/assets/icon/icon-arrow-up.png)'
                    : 'url(/assets/icon/icon-arrow-down.png)',
              }}
              onClick={() => toggleSection(index)}
            >
              {item.title}
            </div>

            <div
              className={`pb-8 leading-8 ${selectedIndex === index ? 'block' : 'hidden'}`}
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
          </div>
        ))}
      </MaxScreenSize>
    </div>
  );
};

export default Policy;
