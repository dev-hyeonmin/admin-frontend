import db from '@/lib/db';

export default async function Notice() {
  const notices = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      is_pinned: true,
      created_at: true,
    },
    orderBy: [{ is_pinned: 'desc' }, { created_at: 'desc' }],
  });

  return (
    <div>
      <div className="py-6">
        <div className="text-3xl font-medium">Notice</div>
        <div className="text-sm text-zinc-500">공지사항</div>
      </div>

      <div className="mt-6 flex w-full flex-col">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center justify-between gap-6 border-t border-gray-100 py-4"
          >
            <div className="flex items-center gap-6">
              <div>{notice.title}</div>
            </div>

            <div>{notice.created_at.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
