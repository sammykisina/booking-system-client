import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { TravelAPI } from '@/api';
import {
  Journey,
  SelectionOption,
  Ticket,
  TicketsData,
} from '../types/typings.t';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Toasts } from '@/components';
import ticketAtoms from '../atoms/Ticket';
import { useSetRecoilState } from 'recoil';

const useTravel = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const { globalJourneyInfoState, showBookTicketConfirmationModalState } =
    ticketAtoms;
  const setGlobalJourneyInfo = useSetRecoilState(globalJourneyInfoState);
  const setShowBookTicketConfirmationModal = useSetRecoilState(
    showBookTicketConfirmationModalState
  );
  const journeysColumns = useMemo<
    ColumnDef<{
      departure: string;
      destination: string;
      dayOfWeek: string;
      price: number;
      journeyTime: string;
      startTime: string;
    }>[]
  >(
    () => [
      {
        header: 'Departure',
        accessorKey: 'departure',
      },
      {
        header: 'Destination',
        accessorKey: 'destination',
      },
      {
        header: 'Day',
        accessorKey: 'dayOfWeek',
      },
      {
        header: 'Price',
        accessorKey: 'price',
      },
      {
        header: 'Journey Time',
        accessorKey: 'journeyTime',
      },
      {
        header: 'Start Time',
        accessorKey: 'startTime',
      },
    ],
    []
  );

  /**
   * hook functions
   */
  const { data: busTravels, isLoading: isFetchingBusTravels } = useQuery({
    queryKey: ['busTravels', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin' || role === 'user') {
        return (await TravelAPI.getBusTravels()) as Journey[];
      }

      return [];
    },
  });

  const { data: trainTravels, isLoading: isFetchingTrainTravels } = useQuery({
    queryKey: ['trainTravels', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin' || role === 'user') {
        return (await TravelAPI.getTrainTravels()) as Journey[];
      }

      return [];
    },
  });

  const { data: airTravels, isLoading: isFetchingAirTravels } = useQuery({
    queryKey: ['airTravels', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin' || role === 'user') {
        return (await TravelAPI.getAirTravels()) as Journey[];
      }

      return [];
    },
  });

  const { data: tickets, isLoading: isFetchingTickets } = useQuery({
    queryKey: ['tickets', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin') {
        return (await TravelAPI.getTickets()) as Ticket[];
      }

      return [];
    },
  });

  const modifyJourneysForJourneysTable = (journeys: Journey[] | undefined) => {
    let modifiedJourneysData = [] as unknown[];

    journeys?.map((journey) => {
      modifiedJourneysData = [
        ...modifiedJourneysData,
        {
          departure: journey?.attributes?.departure,
          destination: journey?.attributes?.destination,
          dayOfWeek: journey?.attributes?.dayOfWeek,
          price: journey?.attributes?.price,
          journeyTime: journey?.attributes?.journeyTime,
          startTime: journey?.attributes?.startTime,
        },
      ];
    });

    return modifiedJourneysData;
  };

  const generateJourneyOptions = (journeys: Journey[] | undefined) => {
    let journeyOptions = [] as unknown[];

    journeys?.map((journey) => {
      journeyOptions = [
        ...journeyOptions,
        {
          name:
            `From ` +
            journey?.attributes?.departure +
            ` to ` +
            journey?.attributes?.destination +
            ` on ` +
            journey?.attributes?.dayOfWeek +
            ` @ ` +
            journey?.attributes?.startTime,
          value: journey?.id,
          price: journey?.attributes?.price,
          journeyTime: journey?.attributes?.journeyTime,
        },
      ];
    });

    return journeyOptions as SelectionOption[];
  };

  const { mutateAsync: createTicketMutateAsync, isLoading: isCreatingTicket } =
    useMutation({
      mutationFn: (newTicketData: TicketsData) => {
        return TravelAPI.createTicket(newTicketData);
      },

      onSuccess: async (data) => {
        setGlobalJourneyInfo(null);
        setShowBookTicketConfirmationModal(false);
        Toasts.successToast(data.message);
      },

      onError: async () => {
        setGlobalJourneyInfo(null);
        setShowBookTicketConfirmationModal(false);
      },
    });

  return {
    busTravels,
    isFetchingBusTravels,
    modifyJourneysForJourneysTable,
    journeysColumns,
    trainTravels,
    isFetchingTrainTravels,
    airTravels,
    isFetchingAirTravels,
    generateJourneyOptions,
    createTicketMutateAsync,
    isCreatingTicket,
    isFetchingTickets,
    tickets,
  };
};

export default useTravel;
