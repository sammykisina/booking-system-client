import {
  Button,
  Error,
  Select,
  Title,
  Toasts,
  WidgetHeader,
} from '@/components';
import { ticketAtoms } from '@/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useTravel } from '@/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SelectionOption } from '../../../../types/typings.t';

const BookTicket = () => {
  /**
   * component states
   */
  const {
    showBookTicketWidgetState,
    globalTravelMeansState,
    globalJourneyInfoState,
    showBookTicketConfirmationModalState,
  } = ticketAtoms;
  const setShowBookTicketWidget = useSetRecoilState(showBookTicketWidgetState);
  const [globalTravelMeans, setGlobalTravelMeans] = useRecoilState(
    globalTravelMeansState
  );
  const setGlobalJourneyInfo = useSetRecoilState(globalJourneyInfoState);
  const setShowBookTicketConfirmationModal = useSetRecoilState(
    showBookTicketConfirmationModalState
  );

  const { airTravels, busTravels, trainTravels, generateJourneyOptions } =
    useTravel();
  const journeys =
    globalTravelMeans === 'BUS'
      ? busTravels
      : globalTravelMeans === 'AIR'
      ? airTravels
      : globalTravelMeans === 'TRAIN'
      ? trainTravels
      : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    numberOfAdults: string;
    numberOfPersonsBtwn2And16Yrs: string;
  }>();

  const [selectedJourney, setSelectedJourney] = useState<SelectionOption>({
    name: 'Select A Journey Among The Provided.',
    value: '',
  });

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<{
    numberOfAdults: string;
    numberOfPersonsBtwn2And16Yrs: string;
  }> = ({ numberOfAdults, numberOfPersonsBtwn2And16Yrs }) => {
    // validation
    if (selectedJourney?.value === '') {
      Toasts.errorToast('Select the journey you wish to take.');
      return;
    }

    setGlobalJourneyInfo({
      selectedJourney: selectedJourney,
      numberOfAdults: parseInt(numberOfAdults),
      numberOfPersonsBtwn2And16Yrs: parseInt(numberOfPersonsBtwn2And16Yrs),
      means: globalTravelMeans,
    });

    setShowBookTicketConfirmationModal(true);
    setShowBookTicketWidget(false);
  };

  return (
    <section>
      <WidgetHeader
        close={() => {
          setGlobalTravelMeans('');
          setShowBookTicketWidget(false);
        }}
        title={`BOOKING ${globalTravelMeans} TICKET (s)`}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 px-2 mt-3'
      >
        <div className='flex flex-col gap-y-5 rounded-md border py-4 px-2'>
          <div className='flex items-center gap-2'>
            <span className='text-textColor/50'>Journey</span>
            <Select
              multiple={false}
              options={generateJourneyOptions(journeys)}
              selectWrapperStyles='border rounded-[0.9rem] py-1 w-[16rem] xs:w-[22rem] sm:w-[30rem]'
              selectPanelStyles='max-h-[15rem] bg-white border border-dark shadow-md'
              selected={selectedJourney}
              setSelected={setSelectedJourney}
            />
          </div>
        </div>

        <div className='flex flex-col gap-y-5 rounded-md border py-4 px-2'>
          <div className='relative'>
            <input
              type='number'
              className='input peer'
              placeholder='Number Of Adults (17yrs and Above)'
              {...register('numberOfAdults', {
                required: 'Number of adults to be in this trip is required.',
              })}
            />
            <label className='inputLabel'>
              Number Of Adults (17yrs and Above)
            </label>

            {errors['numberOfAdults'] && (
              <ErrorMessage
                errors={errors}
                name='numberOfAdults'
                render={({ message }) => <Error errorMessage={message} />}
              />
            )}
          </div>
        </div>

        <div className='flex flex-col gap-y-5 rounded-md border py-4 px-2'>
          <div className='relative'>
            <input
              type='number'
              className='input peer'
              placeholder='Number of Persons Between 2 and 16 yrs (Inclusive)'
              {...register('numberOfPersonsBtwn2And16Yrs', {
                required: 'Number of adults to be in this trip is required.',
              })}
            />
            <label className='inputLabel'>
              Number of Persons Between 2 and 16 yrs
            </label>

            {errors['numberOfPersonsBtwn2And16Yrs'] && (
              <ErrorMessage
                errors={errors}
                name='numberOfPersonsBtwn2And16Yrs'
                render={({ message }) => <Error errorMessage={message} />}
              />
            )}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            title='BOOK'
            intent='primary'
            type='submit'
            fullWidth={false}
          />
        </div>
      </form>
    </section>
  );
};

export default BookTicket;
