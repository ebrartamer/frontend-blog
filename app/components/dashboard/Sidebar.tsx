import React from 'react';
import { Home, FileText, FolderOpen, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    href: '/dashboard',
    icon: Home,
    label: 'Dashboard'
  },
  {
    href: '/dashboard/blogs',
    icon: FileText, 
    label: 'Blogs'
  },
  {
    href: '/dashboard/categories',
    icon: FolderOpen,
    label: 'Categories / Tags'
  },
  {
    href: '/dashboard/users',
    icon: Users,
    label: 'Users'
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col bg-white shadow-md">
      {/* Logo */}
      <div className="p-4 shrink-0">
        <Link href="/">
          <Image
            src="/postLogo.svg"
            alt="Logo"
            width={100}
            height={40}
            className="mx-auto"
          />
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 space-y-4 mt-16 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 p-3 ${
              pathname === item.href
                ? 'text-white bg-accent rounded-md'
                : 'text-blue-900 hover:text-accent'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t mt-auto shrink-0">
        <Link
          href="/auth/logout"
          className="flex items-center space-x-3 text-blue-900 hover:text-green-500"
        >
          <LogOut className="w-6 h-6" />
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
