import React, { useDeferredValue, useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { appAtoms } from '@/atoms';
import { Dropdown, Icon, Link, Profile, Title } from '@/components';
import { HiHome, HiOutlineUser, HiUser } from 'react-icons/hi2';
import { useAuth } from '@/hooks';

const TopHeader = () => {
  /**
   * component states
   */
  const { showSidebarState } = appAtoms;
  const setShowSidebar = useSetRecoilState(showSidebarState);
  const { pathname } = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user } = useAuth();
  // const dashboardTitle =
  //   user?.role === 'admin' || user?.role === 'super-admin'
  //     ? 'Dashboard'
  //     : user?.role === 'counter'
  //     ? 'Lets Sell'
  //     : '';

  /**
   * component function
   */
  const getTitle = (pathname: string) => {
    let title = '';

    switch (pathname) {
      case '/':
        title = user?.role === 'admin' ? 'Dashboard' : 'Home';
        break;

      case '/auth/login':
        title = 'Login';
        break;

      case '/auth/register':
        title = 'Register';
        break;

      default:
        title = pathname.substring(1);
    }

    return title;
  };

  return (
    <nav
      className={`flex h-[50px] items-center justify-between rounded-md border px-2  sm:px-0 `}
    >
      <div className='flex items-center gap-x-4'>
        <Icon
          icon={
            <HiOutlineMenuAlt3
              className={`h-5 w-5 text-callToAction sm:hidden ${
                !user && 'hidden'
              }`}
            />
          }
          purpose={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
        />

        {/* current page title */}
        <div className='flex items-center gap-2'>
          {!user && (
            <Link
              route={{
                to: '/',
                activeIcon: (
                  <Icon
                    icon={<HiHome className='h-5 w-5 text-callToAction ' />}
                  />
                ),
                inactiveIcon: (
                  <Icon
                    icon={<HiHome className='h-5 w-5 text-callToAction ' />}
                  />
                ),
              }}
            />
          )}

          {pathname && (
            <Title
              title={getTitle(pathname)}
              titleStyles='capitalize text-xl font-semibold tracking-wider'
            />
          )}
        </div>
      </div>

      {/* rest of the icons */}
      <div className='flex items-center  gap-x-2'>
        <Dropdown
          active={<HiUser className='icon' />}
          inactive={<HiOutlineUser className='icon' />}
          dropdownComponent={<Profile />}
          displayState={showProfileDropdown}
          setDisplayState={setShowProfileDropdown}
        />
      </div>
    </nav>
  );
};

export default TopHeader;
