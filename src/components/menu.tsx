'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleLogout } from '@/app/admin/(auth)/logout/action';
import { Bell, CircleMinus, Info, PictureInPicture2, Ticket } from 'lucide-react';

const menuItems = [
  { name: '팝업', href: '/popup', icon: <PictureInPicture2 /> },
  { name: '이벤트', href: '/event', icon: <Ticket /> },
  { name: '공지사항', href: '/notice', icon: <Bell /> },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-12">
      {/* 로고 영역 */}
      <div className="mb-8 text-xl font-bold">Clinic Admin</div>

      {/* 메뉴 리스트 */}
      <nav className="mb-auto flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex gap-2 rounded-lg py-4 transition-colors ${
                isActive ? 'font-bold text-blue-700' : 'hover:opacity-70'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col">
        <button onClick={() => {}} className="flex cursor-pointer gap-2 pb-4">
          <Info strokeWidth={1.5} />
          Help & Info
        </button>

        <button onClick={() => handleLogout()} className="flex cursor-pointer gap-2 pt-4">
          <CircleMinus strokeWidth={1.5} />
          Log out
        </button>
      </div>
    </aside>
  );
}
