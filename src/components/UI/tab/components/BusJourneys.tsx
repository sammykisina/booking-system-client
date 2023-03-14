import { useTravel } from '@/hooks';
import { SpinnerLoader, TabTitle, Table } from '@/components';

const BusJourneys = () => {
  /**
   * components states
   */
  const {
    busTravels,
    isFetchingBusTravels,
    journeysColumns,
    modifyJourneysForJourneysTable,
  } = useTravel();

  return (
    <section className='h-full xs:h-[34.5rem] lg:h-[39rem]'>
      {/* title */}
      <TabTitle title='BUS JOURNEYS' />

      {/* the  body */}
      <section className='mt-5'>
        {isFetchingBusTravels ? (
          <div className='flex h-full items-center justify-center'>
            <SpinnerLoader color='fill-secondary' />
          </div>
        ) : (
          <Table
            data={modifyJourneysForJourneysTable(busTravels)}
            columns={journeysColumns}
            showFilters={true}
            tableHeight='h-[33.4rem] xs:h-[26.5rem] lg:h-[31.5rem]'
          />
        )}
      </section>
    </section>
  );
};

export default BusJourneys;
