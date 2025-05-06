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

      <div className="flex flex-col mt-6 w-full">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex gap-6 py-4 border-t border-gray-100 justify-between items-center animate-pulse"
          >
            <div className="flex gap-6 items-center">
              <div>{notice.title}</div>
            </div>

            <div>{notice.created_at.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
