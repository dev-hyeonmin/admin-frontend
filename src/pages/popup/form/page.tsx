import Container from '@components/Container.tsx';
import Box from '@components/layout/box/Box.tsx';
import Input from '@components/form/Input.tsx';
import Button from '@components/actions/Button.tsx';
import FormField from '@components/form/FormField.tsx';
import FileUpload from '@components/form/FileUpload.tsx';

const PopupForm = () => {
  return (
    <Container
      title="팝업 등록"
      useBackNav={true}
      suffix={<Button label="등록하기" priority="primary" size="large" />}
    >
      <Box direction="vertical" className="w-full max-w-screen-sm p-8 gap-4">
        <div className="w-full text-sm border border-red-300 border-dashed bg-red-50 rounded p-4 text-zinc-800 leading-relaxed">
          잠깐 🖐️! 원활한 데이터 관리를 위해 팝업은 수정이 되지 않아요 😣
          <br />
          팝업을 잘못 등록하여 수정이 원하시는 경우 <b>삭제 후 재등록</b> 해주셔야해요!
        </div>

        <Box direction="vertical" className="w-full border border-zinc-200 rounded-lg p-4 gap-8">
          <FormField label="팝업명" required={true}>
            <Input />
          </FormField>

          <FormField label="이미지 등록" required={true}>
            <FileUpload accept="image/*" />
          </FormField>
        </Box>
      </Box>
    </Container>
  );
};

export default PopupForm;
