import db from '@/lib/db';
import NoticeItem from '@/app/(tabs)/notice/NoticeItem';
import { getBranchId, deleteSession } from '@/lib/session';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

export default async function Notice({ searchParams }: { searchParams: { page?: string } }) {
  const branchId = await getBranchId();

  if (!branchId) {
    return deleteSession();
  }

  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [notices, totalCount] = await Promise.all([
    db.notice.findMany({
      where: { branchId },
      select: {
        id: true,
        title: true,
        is_pinned: true,
        created_at: true,
      },
      orderBy: [{ is_pinned: 'desc' }, { created_at: 'desc' }],
      skip,
      take: ITEMS_PER_PAGE,
    }),
    db.notice.count({
      where: { branchId },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="py-6">
        <div className="text-3xl font-medium">Notice</div>
        <div className="text-sm text-zinc-500">공지사항</div>
      </div>

      <div className="mt-6 flex w-full flex-col">
        {notices.map((notice) => (
          <NoticeItem key={`notice-${notice.id}`} {...notice} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/notice?page=${page}`}
            className={`flex h-8 w-8 items-center justify-center rounded-md ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link href="/notice/add">공지사항 추가</Link>
    </div>
  );
}
