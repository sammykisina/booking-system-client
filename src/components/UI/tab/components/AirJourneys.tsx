import { useTravel } from '@/hooks';
import { SpinnerLoader, TabTitle, Table } from '@/components';

const AirJourneys = () => {
  /**
   * components states
   */
  const {
    airTravels,
    isFetchingAirTravels,
    journeysColumns,
    modifyJourneysForJourneysTable,
  } = useTravel();

  return (
    <section className='h-full xs:h-[34.5rem] lg:h-[39rem]'>
      {/* title */}
      <TabTitle title='AIR JOURNEYS' />

      {/* the  body */}
      <section className='mt-5'>
        {isFetchingAirTravels ? (
          <div className='flex h-full items-center justify-center'>
            <SpinnerLoader color='fill-secondary' />
          </div>
        ) : (
          <Table
            data={modifyJourneysForJourneysTable(airTravels)}
            columns={journeysColumns}
            showFilters={true}
            tableHeight='h-[33.4rem] xs:h-[26.5rem] lg:h-[31.5rem]'
          />
        )}
      </section>
    </section>
  );
};

export default AirJourneys;
