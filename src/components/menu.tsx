'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleLogout } from '@/app/(auth)/logout/action';

export default function Menu() {
  const pathname = usePathname();

  const menuItems = [
    { name: '팝업', href: '/popup' },
    { name: '이벤트', href: '/event' },
    { name: '공지사항', href: '/notice' },
  ];

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-6">
      {/* 로고 영역 */}
      <div className="mb-8 text-xl font-bold">Menu</div>

      {/* 메뉴 리스트 */}
      <nav className="mb-auto flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg p-3 transition-colors ${
                isActive ? 'font-bold' : 'hover:opacity-70'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 버튼 */}
      <button onClick={() => handleLogout()} className="mt-6 text-sm text-zinc-400">
        로그아웃
      </button>
    </aside>
  );
}
