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
    <aside className="w-64 h-screen bg-white flex flex-col p-6 fixed left-0 top-0 border-r border-gray-200">
      {/* 로고 영역 */}
      <div className="text-xl font-bold mb-8">Menu</div>

      {/* 메뉴 리스트 */}
      <nav className="flex flex-col gap-2 mb-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-3 rounded-lg transition-colors ${
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
