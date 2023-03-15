import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks';
import {
  AdminDashboard,
  Booking,
  Clients,
  Hero,
  Journeys,
  Login,
  MyTickets,
  NormalUserHome,
  Register,
} from '@/pages';

const AppRouters = () => {
  /**
   * components states
   */
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback='loading'>
            {role === 'admin' ? (
              <AdminDashboard />
            ) : role === 'user' ? (
              <NormalUserHome />
            ) : (
              <Hero />
            )}
          </Suspense>
        }
      />

      <Route
        path='/auth/login'
        element={
          <Suspense fallback='loading'>
            <Login />
          </Suspense>
        }
      />

      <Route
        path='/auth/register'
        element={
          <Suspense fallback='loading'>
            <Register />
          </Suspense>
        }
      />

      <Route
        path='/clients'
        element={
          <Suspense fallback='loading'>
            <Clients />
          </Suspense>
        }
      />

      <Route
        path='/journeys'
        element={
          <Suspense fallback='loading'>
            <Journeys />
          </Suspense>
        }
      />

      <Route
        path='/my-tickets'
        element={
          <Suspense fallback='loading'>
            <MyTickets />
          </Suspense>
        }
      />

      <Route
        path='/bookings'
        element={
          <Suspense fallback='loading'>
            <Booking />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRouters;
