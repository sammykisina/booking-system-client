import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { ClientAPI } from '@/api';
import { Client } from '../types/typings.t';
import { format } from 'date-fns';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

const useClient = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const clientColumns = useMemo<
    ColumnDef<{ name: string; email: string; joinedAt: string }>[]
  >(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Joined At',
        accessorKey: 'joinedAt',
      },
    ],
    []
  );

  /**
   * hook functions
   */
  const { data: clients, isLoading: isFetchingClients } = useQuery({
    queryKey: ['clients', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'admin') {
        return (await ClientAPI.getClients()) as Client[];
      }

      return [];
    },
  });

  const modifyClientsDataForClientsTable = (clients: Client[] | undefined) => {
    let modifiedClientsData = [] as unknown[];

    clients?.map((client) => {
      modifiedClientsData = [
        ...modifiedClientsData,
        {
          name: client?.attributes?.name,
          email: client?.attributes?.email,
          joinedAt: format(
            new Date(client?.attributes?.joinedAt),
            'EE, MMM d, yyy'
          ),
        },
      ];
    });

    return modifiedClientsData;
  };

  return {
    clients,
    isFetchingClients,
    modifyClientsDataForClientsTable,
    clientColumns,
  };
};

export default useClient;
