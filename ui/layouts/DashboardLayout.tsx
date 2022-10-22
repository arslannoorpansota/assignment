import c from 'classnames';
import React, {useState} from 'react';
import {
  PlusIcon,
  NewspaperIcon,
} from '@heroicons/react/outline';

import LinkTo from "../components/LinkTo";

const navigation = [
  {name: 'Add User', href: '/', icon: PlusIcon, matchExact: true},
  {name: 'View Users', href: '/view-users', icon: NewspaperIcon},

];

const userNavigation = [
  {name: 'Your Profile', href: '#'},
  {name: 'Settings', href: '#'},
  {name: 'Sign out', href: '#'},
];


export default function DashboardLayout({children}: React.PropsWithChildren<{}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-full">
  

      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
              <div className="pb-8 space-y-1">
                {navigation.map((item) => (
                  <LinkTo
                    key={item.name}
                    href={item.href}
                    matchExact={item.matchExact || false}
                    passHref
                  >
                    {(active: boolean) => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        className={c(
                          'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
                          active ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                        )}
                      >
                        <item.icon
                          className={c(
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                            active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    )}
                  </LinkTo>
                ))}
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
