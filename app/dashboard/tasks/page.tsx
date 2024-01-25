'use client';

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  const link = {
    name: 'Create new Task',
    href: '/dashboard/tasks/create',
    icon: PlusIcon,
  }

  return (
    <>
      <h2>Tasks</h2>
      <div className='md:max-w-[200px]'>
        <Link key={link.name} href={link.href} className={clsx(
          'flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
          {
            'bg-gray-700 text-white': pathname === link.href,
            'hover:bg-gray-400': pathname !== link.href,
          },
        )}>
          <PlusIcon className="w-6" />
          <p className="hidden md:block">{link.name}</p>
        </Link>
      </div >
    </>
  );
}