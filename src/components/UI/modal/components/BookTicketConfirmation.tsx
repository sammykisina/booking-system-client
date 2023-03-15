import React from 'react';
import { Button, ModalHeader, SpinnerLoader, Title } from '@/components';
import { ticketAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAuth, useTravel } from '@/hooks';
import { appUtils } from '@/utils';

const BookTicketConfirmation = () => {
  /**
   * component states
   */
  const { globalJourneyInfoState, showBookTicketConfirmationModalState } =
    ticketAtoms;
  const [globalJourneyInfo, setGlobalJourneyInfo] = useRecoilState(
    globalJourneyInfoState
  );
  const setShowBookTicketConfirmationModal = useSetRecoilState(
    showBookTicketConfirmationModalState
  );
  const { createTicketMutateAsync, isCreatingTicket } = useTravel();
  const { generateTicketNumber } = appUtils;
  const { user } = useAuth();

  return (
    <section>
      <ModalHeader
        close={() => {
          setGlobalJourneyInfo(null);
          setShowBookTicketConfirmationModal(false);
        }}
        title='TICKET CONFIRMATION AND PAYMENT'
      />

      {/* ticket info */}
      {globalJourneyInfo?.selectedJourney && (
        <div className='flex flex-col gap-2 mt-5 px-2'>
          <Title title='Selected Journey Information.' />

          <div className='flex flex-col ml-5'>
            <span>{globalJourneyInfo?.selectedJourney?.name}</span>
            <span className='font-bold'>
              {globalJourneyInfo?.selectedJourney?.price} USD per Person
            </span>

            <span className='font-bold'>
              {(globalJourneyInfo?.numberOfPersonsBtwn2And16Yrs +
                globalJourneyInfo?.numberOfAdults) *
                globalJourneyInfo?.selectedJourney?.price!}{' '}
              USD In Total
            </span>
          </div>
        </div>
      )}

      <div className='border  mx-2 mt-2 border-textColor/10' />

      <p className='text-center'>
        {globalJourneyInfo?.numberOfPersonsBtwn2And16Yrs! +
          globalJourneyInfo?.numberOfAdults!}{' '}
        ticket (s) will be booked under this account.
      </p>

      <div className='flex justify-end w-full px-3 mt-3'>
        <Button
          title={
            isCreatingTicket ? <SpinnerLoader color='fill-primary' /> : 'Pay'
          }
          intent='primary'
          type='button'
          purpose={() =>
            createTicketMutateAsync({
              journey: globalJourneyInfo?.selectedJourney?.name!,
              price: globalJourneyInfo?.selectedJourney?.price!,
              user_id: user?.id!,
              numberOfTotalTickets:
                globalJourneyInfo?.numberOfPersonsBtwn2And16Yrs! +
                globalJourneyInfo?.numberOfAdults!,
              means: globalJourneyInfo?.means!,
            })
          }
          fullWidth={false}
        />
      </div>
    </section>
  );
};

export default BookTicketConfirmation;
