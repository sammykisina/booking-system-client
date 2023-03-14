import { useRecoilValue } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { appAtoms } from '@/atoms';
import { AppRouters } from '@/routers';
import { Sidebar, TopHeader } from '@/components';
import { useAuth } from '@/hooks';

const Layout = () => {
  /**
   * component states
   */
  const { isSidebarOpenState, showSidebarState } = appAtoms;
  const showSidebar = useRecoilValue(showSidebarState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);
  const { user } = useAuth();

  /**
   * component functions
   */
  return (
    <section className='relative mx-auto flex w-full max-w-[1200px] sm:px-[20px]'>
      <Toaster />

      {/* sidebar */}
      <div
        className={`absolute duration-300 sm:left-0 ${!user && 'hidden'}  ${
          showSidebar ? 'left-0' : '-left-[100%]'
        }`}
      >
        <Sidebar />
      </div>

      <div
        className={`h-screen max-w-[1200px] flex-1 overflow-x-scroll p-2 duration-300 scrollbar-hide ${
          isSidebarOpen && user ? 'sm:ml-[200px]' : !user ? '' : 'sm:ml-24'
        }   `}
      >
        <TopHeader />

        <div className='mt-5 h-[47rem] overflow-y-scroll  scrollbar-hide xs:h-[40rem]'>
          <AppRouters />
        </div>
      </div>
    </section>
  );
};

export default Layout;
