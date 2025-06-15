'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, CircleMinus, GitBranch, Info, PictureInPicture2, Ticket, User } from 'lucide-react';
import { handleLogout } from '@/app/(auth)/logout/action';

interface MenuListProps {
  isAdmin: boolean;
}

const menuItems = [
  { name: '팝업', href: '/popup', icon: <PictureInPicture2 /> },
  { name: '이벤트', href: '/event', icon: <Ticket /> },
  { name: '공지사항', href: '/notice', icon: <Bell /> },
];

const adminMenuItems = [
  { name: '지점관리', href: '/admin/branch', icon: <GitBranch /> },
  { name: '계정관리', href: '/admin/user', icon: <User /> },
];

export default function MenuList({ isAdmin }: MenuListProps) {
  const pathname = usePathname();

  return (
    <>
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

        {isAdmin &&
          adminMenuItems.map((item) => {
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
    </>
  );
}
