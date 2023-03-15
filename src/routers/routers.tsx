import {
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiUserGroup,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiDocumentText,
  HiOutlineTicket,
  HiTicket,
} from 'react-icons/hi2';

const adminRoutes = [
  {
    name: 'Dashboard',
    inactiveIcon: <HiOutlineSquares2X2 className='icon' />,
    activeIcon: <HiSquares2X2 className='icon' />,
    to: '/',
  },
  {
    name: 'Bookings',
    inactiveIcon: <HiOutlineDocumentText className='icon' />,
    activeIcon: <HiDocumentText className='icon' />,
    to: '/bookings',
  },
  {
    name: 'Clients',
    inactiveIcon: <HiOutlineUserGroup className='icon' />,
    activeIcon: <HiUserGroup className='icon' />,
    to: '/clients',
  },
  {
    name: 'Journeys',
    inactiveIcon: <HiOutlineSquares2X2 className='icon' />,
    activeIcon: <HiSquares2X2 className='icon' />,
    to: '/journeys',
  },
];

const userRoutes = [
  {
    name: 'Book',
    inactiveIcon: <HiOutlineSquares2X2 className='icon' />,
    activeIcon: <HiSquares2X2 className='icon' />,
    to: '/',
  },
  {
    name: 'My Tickets',
    inactiveIcon: <HiOutlineTicket className='icon' />,
    activeIcon: <HiTicket className='icon' />,
    to: '/my-tickets',
  },
];

const routes = { adminRoutes, userRoutes };

export default routes;
