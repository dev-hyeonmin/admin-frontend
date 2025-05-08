import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { getBranchId } from '@/lib/session';
import Link from 'next/link';
import DeleteNoticeButton from './DeleteNoticeButton';

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
      <div className="py-6">
        <div className="text-3xl font-medium">Notice</div>
        <div className="text-sm text-zinc-500">공지사항</div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-medium">{notice.title}</h1>
          <div className="mt-4 whitespace-pre-wrap text-gray-600">{notice.content}</div>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/notice/${id}/edit`}
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            수정
          </Link>
          <DeleteNoticeButton id={id} />
        </div>
      </div>
    </div>
  );
}
