import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import PopupList from '@/app/admin/(tabs)/popup/_components/PopupList';
import PageFooter from '@/components/PageFooter';

export default async function Popup() {
  return (
    <div className="flex flex-col">
      <PageTitle title="Popup" subTitle="팝업" />

      <PopupList />

      <PageFooter>
        <Link href="/popup/add" className="primary-button">
          팝업 추가
        </Link>
      </PageFooter>
    </div>
  );
}
