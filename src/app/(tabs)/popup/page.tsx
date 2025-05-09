import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import db from '@/lib/db';
import { deleteSession, getBranchId } from '@/lib/session';
import { revalidatePath } from 'next/cache';

async function getPopups(branchId: number) {
  return db.popup.findMany({
    where: {
      branchId,
    },
    select: {
      id: true,
      title: true,
      image_url: true,
      created_at: true,
    },
  });
}

async function deletePopup(formData: FormData) {
  'use server';

  const popupId = formData.get('popupId') as string;
  const branchId = await getBranchId();

  if (!branchId) {
    return deleteSession();
  }

  await db.popup.delete({
    where: {
      id: parseInt(popupId),
      branchId,
    },
  });

  revalidatePath('/popup');
}

export default async function Popup() {
  const branchId = await getBranchId();

  if (!branchId) {
    return deleteSession();
  }

  const popups = await getPopups(branchId);

  return (
    <div className="flex min-h-screen flex-col">
      <PageTitle title="Popup" subTitle="팝업" />

      {/* LIST */}
      <div className="space-y-4 p-4">
        {popups.map((popup) => (
          <div
            key={`popup-${popup.id}`}
            className="flex items-center justify-between border-b pb-4"
          >
            <span>{popup.title}</span>
            <form action={deletePopup}>
              <input type="hidden" name="popupId" value={popup.id} />
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
              >
                삭제
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* 하단 고정 메뉴 */}
      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <Link
          href={'/popup/add'}
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
        >
          팝업 추가
        </Link>
      </div>
    </div>
  );
}
