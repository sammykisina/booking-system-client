import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { TravelAPI } from '@/api';
import { Journey } from '../types/typings.t';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

const useTravel = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
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

  return {
    busTravels,
    isFetchingBusTravels,
    modifyJourneysForJourneysTable,
    journeysColumns,
    trainTravels,
    isFetchingTrainTravels,
    airTravels,
    isFetchingAirTravels,
  };
};

export default useTravel;
