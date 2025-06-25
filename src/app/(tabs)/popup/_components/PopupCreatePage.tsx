import PageTitle from '@/components/PageTitle';
import PopupForm from '@/app/(tabs)/popup/_components/PopupForm';

export default function PopupCreatePage() {
  return (
    <>
      <PageTitle title="새 팝업 만들기" subTitle="필요한 정보만 간단히 입력해주세요" />
      <PopupForm />
    </>
  );
}
