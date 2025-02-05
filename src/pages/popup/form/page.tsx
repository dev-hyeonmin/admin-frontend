import Container from '@components/Container.tsx';
import Box from '@components/layout/box/Box.tsx';
import Input from '@components/form/Input.tsx';
import Button from '@components/actions/Button.tsx';
import FormField from '@components/form/FormField.tsx';
import FileUpload from '@components/form/FileUpload.tsx';
import { ModalProps, useModal } from '@/module/react-modal';
import Modal from '@components/overlays/Modal.tsx';
import { useNavigate } from 'react-router';
import { useCreatePopup } from '@/api/endpoints/popup/useCreatePopup.ts';
import { FormProvider, useForm } from 'react-hook-form';

interface FormProps {
  title: string;
  image: string;
}

const PopupForm = () => {
  const modalManager = useModal();
  const navigate = useNavigate();
  const methods = useForm<FormProps>();
  const mutation = useCreatePopup();


  const onSubmit = ({ title, image }:FormProps) => {
    modalManager.push(`confirm`, ConfirmModal, {}).then(() => {
      mutation.mutate({ title, image }, {
        onSuccess: () => {
          modalManager.push(`alert`, AlertModal, {}).then(() => {
            navigate('/popup');
          });
        },
      });
    });
  };

  return (
    <Container
      title="팝업 등록"
      useBackNav={true}
      suffix={<Button label="등록하기" priority="primary" size="large" onClick={methods.handleSubmit(onSubmit)} />}
    >
      <Box direction="vertical" className="w-full max-w-screen-sm p-8 gap-4">
        <div
          className="w-full text-sm border border-red-300 border-dashed bg-red-50 rounded p-4 text-zinc-800 leading-relaxed">
          잠깐 🖐️! 원활한 데이터 관리를 위해 팝업은 수정이 되지 않아요 😣
          <br />
          팝업을 잘못 등록하여 수정이 원하시는 경우 <b>삭제 후 재등록</b> 해주셔야해요!
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <Box direction="vertical" className="w-full border border-zinc-200 rounded-lg p-4 gap-8">
              <FormField label="팝업명" required={true}>
                <Input name="title" options={{required: '팝업명은 필수 입력 항목입니다.'}} />
              </FormField>

              <FormField label="이미지 등록" required={true}>
                <FileUpload accept="image/*" name="image" rules={{required: '파일 등록은 필수 항목입니다.'}} />
              </FormField>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default PopupForm;

const ConfirmModal = ({ resolve, reject }: ModalProps) => {
  return (
    <Modal isOpen={true} position="top">
      <Box direction="vertical" className="w-[450px] bg-white rounded-lg py-5 px-7">
        <h2 className="font-medium text-lg">등록하시겠습니까?</h2>
        <p className="mt-2 text-zinc-800 text-sm font-light">
          잠깐🖐️! 팝업은 재수정이 되지 않아요. 확인하셨나요️?
        </p>

        <Box align="right" className="w-full mt-6 gap-2">
          <Button label="취소" onClick={() => reject('Modal rejected')} />
          <Button label="확인" priority="primary" onClick={() => resolve('Modal resolved')} />
        </Box>
      </Box>
    </Modal>
  );
};

const AlertModal = ({ resolve }: ModalProps) => {
  return (
    <Modal isOpen={true} position="top">
      <Box direction="vertical" className="w-[450px] bg-white rounded-lg py-5 px-7">
        <h2 className="font-medium text-lg">등록되었습니다.</h2>
        <p className="mt-2 text-zinc-800 text-sm font-light">팝업 리스트 페이지로 이동합니다.</p>

        <Box align="right" className="w-full mt-6 gap-2">
          <Button label="확인" priority="primary" onClick={() => resolve('Modal resolved')} />
        </Box>
      </Box>
    </Modal>
  );
};
