import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { getBranchId } from '@/lib/session';

export default async function NoticeDeatil({ params }: { params: { id: string } }) {
  // const notice = await new Promise((resolve, reject) => setTimeout(resolve, 10000));

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
  });

  if (!notice) {
    return notFound();
  }

  return (
    <div>
      <div>{notice.title}</div>
      <div>{notice.content}</div>
    </div>
  );
}
