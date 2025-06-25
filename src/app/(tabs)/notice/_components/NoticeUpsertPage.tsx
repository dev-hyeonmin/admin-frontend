import PageTitle from '@/components/PageTitle';
import { Notice } from '@/types/notice';
import NoticeForm from '@/app/(tabs)/notice/_components/NoticeForm';

interface NoticeUpsertPageProps {
  notice?: Notice;
}

export default function NoticeUpsertPage({ notice }: NoticeUpsertPageProps) {
  return (
    <>
      <PageTitle title={notice ? 'Edit Notice' : 'Create Notice'} subTitle="Notice > Form" />
      <NoticeForm notice={notice} />
    </>
  );
}
