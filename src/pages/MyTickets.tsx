import React from 'react';
import { useAuth } from '@/hooks';
import { SpinnerLoader, TabTitle, Table } from '@/components';

const MyTickets = () => {
  /**
   * component states
   */
  const {
    isFetchingProfile,
    profile,
    ticketColumns,
    modifyTicketsDataForTicketsTable,
  } = useAuth();

  return (
    <section className='h-full xs:h-[34.5rem] lg:h-[39rem]'>
      {/* title */}
      <TabTitle title='ALL MY TICKETS' />

      {/* the  body */}
      <section className='mt-5'>
        {isFetchingProfile ? (
          <div className='flex h-[15rem]  items-center justify-center'>
            <SpinnerLoader color='fill-callToAction' />
          </div>
        ) : (
          <Table
            data={modifyTicketsDataForTicketsTable(
              profile?.relationships?.tickets
            )}
            columns={ticketColumns}
            showFilters={true}
            tableHeight='h-[39rem] xs:h-[32.5rem]'
          />
        )}
      </section>
    </section>
  );
};

export default MyTickets;
