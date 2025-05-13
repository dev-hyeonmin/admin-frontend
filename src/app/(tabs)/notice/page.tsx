import db from '@/lib/db';
import { getBranchId, deleteSession } from '@/lib/session';
import Link from 'next/link';
import PageTitle from '@/components/PageTitle';
import NoticeList from '@/app/(tabs)/notice/NoticeList';

const ITEMS_PER_PAGE = 10;

async function getNotices(branchId: number, currentPage: number) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  return await Promise.all([
    db.notice.findMany({
      where: { branchId },
      select: {
        id: true,
        title: true,
        content: true,
        image_url: true,
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
}

export default async function Notice({ params }: { params: { page?: number } }) {
  const branchId = await getBranchId();

  if (!branchId) {
    return deleteSession();
  }

  const currentPage = params.page || 1;
  const [notices, totalCount] = await getNotices(branchId, currentPage);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  console.log(totalPages);

  return (
    <div>
      {/* Title */}
      <PageTitle title="Notice" subTitle="공지사항" />

      {/* List */}
      <NoticeList notices={notices} />

      {/* TODO Scroll Paging */}

      {/* 하단 고정 메뉴 */}
      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <Link
          href={'/notice/add'}
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
        >
          공지사항 추가
        </Link>
      </div>
    </div>
  );
}
