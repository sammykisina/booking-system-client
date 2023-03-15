import { SpinnerLoader, TabTitle, Table } from '@/components';
import { useAuth, useTravel } from '@/hooks';

const Booking = () => {
  /**
   * component states
   */
  const { ticketColumns, modifyTicketsDataForTicketsTable } = useAuth();
  const { isFetchingTickets, tickets } = useTravel();

  return (
    <section className='h-full xs:h-[34.5rem] lg:h-[39rem]'>
      {/* title */}
      <TabTitle title='ALL BOOKINGS' />

      {/* the  body */}
      <section className='mt-5'>
        {isFetchingTickets ? (
          <div className='flex h-[15rem]  items-center justify-center'>
            <SpinnerLoader color='fill-callToAction' />
          </div>
        ) : (
          <Table
            data={modifyTicketsDataForTicketsTable(tickets)}
            columns={ticketColumns}
            showFilters={true}
            tableHeight='h-[39rem] xs:h-[32.5rem]'
          />
        )}
      </section>
    </section>
  );
};

export default Booking;
