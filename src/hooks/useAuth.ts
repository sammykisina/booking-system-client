import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '@/api';
import Cookies from 'js-cookie';
import { Toasts } from '@/components';
import { useNavigate } from 'react-router-dom';
import { UserData as LoginData, RegisterData, User } from '../types/typings.t';

const useAuth = () => {
  /**
   * hook states
   */
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
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
  };
};

export default useAuth;
