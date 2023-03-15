import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthAPI } from '@/api';
import Cookies from 'js-cookie';
import { Toasts } from '@/components';
import { useNavigate } from 'react-router-dom';
import {
  Client,
  UserData as LoginData,
  RegisterData,
  Ticket,
  User,
} from '../types/typings.t';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const useAuth = () => {
  /**
   * hook states
   */
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const ticketColumns = useMemo<
    ColumnDef<{ name: string; email: string; joinedAt: string }>[]
  >(
    () => [
      {
        header: 'Ticket Number',
        accessorKey: 'ticketNumber',
      },
      {
        header: 'Booked At',
        accessorKey: 'bookedAt',
      },
      {
        header: 'Journey',
        accessorKey: 'journey',
      },
      {
        header: 'Means',
        accessorKey: 'means',
      },
      {
        header: 'Price',
        accessorKey: 'price',
      },
    ],
    []
  );

  /**
   * hook functions
   */
  const { mutateAsync: loginMutateAsync, isLoading: isLogging } = useMutation({
    mutationFn: (loginData: LoginData) => {
      return AuthAPI.login(loginData);
    },

    onSuccess: async (data) => {
      Cookies.set('user', JSON.stringify(data.user));
      Cookies.set('token', data.token);

      navigate('/');
      refresh();
      Toasts.successToast(data.message);
    },
  });

  const { mutateAsync: registerUserMutateAsync, isLoading: isRegisteringUser } =
    useMutation({
      mutationFn: (registerUserData: RegisterData) => {
        return AuthAPI.registerUser(registerUserData);
      },

      onSuccess: async (data) => {
        Cookies.set('user', JSON.stringify(data.user));
        Cookies.set('token', data.token);

        navigate('/');
        refresh();
        Toasts.successToast(data.message);
      },
    });

  const { data: profile, isLoading: isFetchingProfile } = useQuery({
    queryKey: ['profile', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role, userId] = queryKey;

      if (role === 'admin' || role === 'user') {
        return (await AuthAPI.getProfile(user?.id!)) as Client;
      }

      return [];
    },
  });

  const modifyTicketsDataForTicketsTable = (tickets: Ticket[] | undefined) => {
    let modifiedTicketData = [] as unknown[];

    tickets?.map((ticket) => {
      modifiedTicketData = [
        ...modifiedTicketData,
        {
          journey: ticket?.attributes?.journey,
          means: ticket?.attributes?.means,
          price: ticket?.attributes?.price,
          ticketNumber: ticket?.attributes?.ticketNumber,
          bookedAt: format(
            new Date(ticket?.attributes?.createdAt),
            'EE, MMM d, yyy'
          ),
        },
      ];
    });

    return modifiedTicketData;
  };

  // const {
  //   mutateAsync: updatePasswordMutateAsync,
  //   isLoading: isUpdatingPassword,
  // } = useMutation({
  //   mutationFn: (data: { email: string; password: string }) => {
  //     return AuthAPI.updatePassword(data);
  //   },

  //   onSuccess: async (data) => {
  //     Notifications.successNotification(data.message);
  //   },
  // });

  // const redirect = async () => await router.push("/");
  // const refresh = async () => router.refresh();

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    setToken(undefined);
    setUser(undefined);

    refresh();
    navigate('/');
  };

  const refresh = () => window.location.reload();

  useEffect(() => {
    const user = Cookies.get('user') && JSON?.parse(Cookies.get('user') || '');
    const token = Cookies.get('token');
    if (token !== undefined || token !== '') {
      setToken(token);
    }

    if (user !== undefined || user !== '') {
      setUser(user);
    }
  }, []);

  return {
    user,
    token,
    loginMutateAsync,
    isLogging,
    logout,
    // updatePasswordMutateAsync,
    // isUpdatingPassword,
    // signupMutateAsync,
    isRegisteringUser,
    registerUserMutateAsync,
    profile,
    isFetchingProfile,
    ticketColumns,
    modifyTicketsDataForTicketsTable,
  };
};

export default useAuth;
