import React from 'react';
import type { FC, ReactNode } from 'react';
import { Icon, TabTitle } from '@/components';
import { HiDocumentText, HiQueueList, HiUserGroup } from 'react-icons/hi2';
import { appAtoms } from '@/atoms';
import { useRecoilValue } from 'recoil';

type AdminDashboardCardProps = {
  title: string;
  icon: ReactNode;
  totalCount: number;
  numberOfCountLastMonth: number;
  bgColor: string;
  textColor: string;
};

const AdminDashboardCard: FC<AdminDashboardCardProps> = ({
  title,
  icon,
  numberOfCountLastMonth,
  totalCount,
  bgColor,
  textColor,
}) => {
  /**
   * component states
   */
  const { isSidebarOpenState } = appAtoms;
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  return (
    <div
      className={`xs:w-[14rem] md:w-[20rem] lg:w-[20rem] divide-y rounded-[2rem]  ${bgColor} py-3 px-3 text-sm shadow-sm ${
        isSidebarOpen && 'sm:w-[20rem]'
      }`}
    >
      <div className='flex items-center justify-between px-1 gap-2'>
        <div className='pb-2'>
          <div
            className={`flex justify-between gap-4 rounded-full bg-gray-200/10 px-3 py-1 text-sm  font-bold capitalize leading-loose ${textColor} shadow-sm`}
          >
            {title}
            <Icon iconWrapperStyles='text-white' icon={icon} />
          </div>
        </div>

        {/* count */}
        <div className='flex flex-row xs:flex-col  items-center gap-1'>
          <span className='text-2xl text-secondary'>{totalCount}</span>
          <span className='tracking-wide text-secondary'>{title}</span>
        </div>
      </div>

      {/* summary */}
      <div className='flex justify-center gap-3 divide-x py-2 '>
        <div className='p-2 flex flex-row xs:flex-col items-center gap-3  lg:flex-row'>
          <div className='flex h-8 items-center justify-center rounded-[2rem] bg-indigo-200/50  px-3 text-lg text-white shadow-sm'>
            {numberOfCountLastMonth}
          </div>

          <span className='tracking-wide text-secondary whitespace-nowrap'>
            Last Month
          </span>
        </div>

        <div className='py-2 pl-2 flex items-center xs:flex-col gap-3 lg:flex-row '>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-fit items-center justify-center rounded-[2rem]   px-3 text-lg text-white shadow-sm'>
              {totalCount - numberOfCountLastMonth}
            </div>
          </div>

          <span className='tracking-wide text-secondary whitespace-nowrap'>
            This Month
          </span>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  /**
   * page states
   */
  const { isSidebarOpenState } = appAtoms;
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  /**
   * page functions
   */
  return (
    <section className='mt-5 w-full p-2'>
      {/* title */}
      <TabTitle title='OVERVIEW' />

      <div className='mt-2'>
        <section
          className={`mt-5 flex flex-col items-center justify-center gap-1  px-1 py-3  xs:flex-row md:flex-row ${
            isSidebarOpen && 'sm:flex-col'
          }`}
        >
          {/* users */}
          <AdminDashboardCard
            icon={<HiUserGroup className='icon' />}
            numberOfCountLastMonth={10}
            title='Users'
            totalCount={20}
            bgColor='bg-callToAction/50'
            textColor='text-callToAction'
          />

          {/* bookings */}
          <AdminDashboardCard
            title='Bookings'
            totalCount={30}
            icon={<HiDocumentText className='icon' />}
            numberOfCountLastMonth={40}
            bgColor='bg-amber-500/50'
            textColor='text-amber-500'
          />
        </section>
      </div>
    </section>
  );
};

export default AdminDashboard;
