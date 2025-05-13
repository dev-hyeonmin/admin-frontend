import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { getBranchId } from '@/lib/session';
import NoticeForm from '@/app/(tabs)/notice/NoticeForm';

export default async function EditNotice({ params }: { params: { id: string } }) {
  // validation
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const branchId = await getBranchId();
  if (!branchId) {
    return notFound();
  }

  const notice = await db.notice.findUnique({
    where: {
      id,
      branchId,
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  if (!notice) {
    return notFound();
  }

  return <NoticeForm id={notice.id} title={notice.title} content={notice.content || ''} />;
}
