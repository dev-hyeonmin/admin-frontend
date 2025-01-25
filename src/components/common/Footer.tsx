import Box from '@components/layout/box/Box.tsx';
import Button from '@components/actions/Button.tsx';

const Footer = () => {
  return (
    <Box
      align="right"
      className="fixed bottom-0 left-72 w-[calc(100%-288px)] py-4 px-8 border-t gap-2"
    >
      <Button label="취소" size="large" />
      <Button label="저장하기" priority="primary" size="large" />
    </Box>
  );
};

export default Footer;
