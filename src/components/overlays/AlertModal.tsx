import { ModalProps } from '@/module/react-modal';
import Modal from '@components/overlays/Modal.tsx';
import Box from '@components/layout/box/Box.tsx';
import Button from '@components/actions/Button.tsx';

/**
 * title: string;
 * description?: string;
 * buttonLabel?: string;
 * skin?: 'default' | 'danger'
 */

const AlertModal = ({
  title,
  description,
  buttonLabel = '확인',
  skin = 'default',
  resolve,
}: ModalProps) => {
  return (
    <Modal isOpen={true} position="top">
      <Box direction="vertical" className="w-[450px] bg-white rounded-lg py-5 px-7">
        <h2 className="font-medium text-lg">{title}</h2>
        {description && <p className="mt-2 text-zinc-800 text-sm font-light">{description}</p>}

        <Box align="right" className="w-full mt-6 gap-2">
          <Button
            label={buttonLabel}
            skin={skin}
            priority="primary"
            onClick={() => resolve('Modal resolved')}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AlertModal;
