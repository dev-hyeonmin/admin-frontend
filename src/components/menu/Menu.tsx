import { decrypt, getSession } from '@/lib/session';
import MenuList from '@/components/menu/MenuList';

export default async function Menu() {
  const cookie = await getSession();
  const session = await decrypt(cookie);

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-12">
      {/* 로고 영역 */}
      <div className="mb-8 text-xl font-bold">Clinic Admin</div>

      {/* 메뉴 리스트 */}
      <MenuList isAdmin={!!session?.user} />
    </aside>
  );
}
