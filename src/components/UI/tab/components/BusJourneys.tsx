import { useAuth, useTravel } from '@/hooks';
import {
  BookTicket,
  Button,
  SpinnerLoader,
  TabTitle,
  Table,
  Widget,
} from '@/components';
import { ticketAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

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
  const { showBookTicketWidgetState, globalTravelMeansState } = ticketAtoms;
  const setShowBookTicketWidget = useSetRecoilState(showBookTicketWidgetState);
  const setGlobalTravelMeans = useSetRecoilState(globalTravelMeansState);
  const { user } = useAuth();

  return (
    <section className='h-full xs:h-[34.5rem] lg:h-[39rem]'>
      <div className='flex items-center justify-between'>
        {/* title */}
        <TabTitle title='BUS JOURNEYS' />

        <div className={`${user?.role === 'admin' && 'hidden'}`}>
          <Button
            title='GET TICKET'
            type='button'
            intent='primary'
            fullWidth={false}
            purpose={() => {
              setGlobalTravelMeans('BUS');
              setShowBookTicketWidget(true);
            }}
          />
        </div>
      </div>

      {/* the  body */}
      <section className='mt-5'>
        {isFetchingBusTravels ? (
          <div className='flex h-[15rem] items-center justify-center'>
            <SpinnerLoader color='fill-callToAction' />
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
