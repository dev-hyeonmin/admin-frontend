import Container from '@components/Container.tsx';
import PopupList from '@/pages/popup/components/list.tsx';

const PopupPage = () => {
  // const [popupId, setPopupId] = useState(1);

  return (
    <Container title="팝업">
      <PopupList />
    </Container>
  );
};

export default PopupPage;
