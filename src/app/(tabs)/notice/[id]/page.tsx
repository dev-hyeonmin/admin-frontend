import { notFound } from 'next/navigation';
import NoticeUpsertPage from '@/app/(tabs)/notice/_components/NoticeUpsertPage';
import { getNotice } from '@/app/(tabs)/notice/actions';

export default async function Page({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  return <NoticeUpsertPage notice={notice} />;
}
