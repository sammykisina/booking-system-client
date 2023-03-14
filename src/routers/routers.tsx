import {
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiChartPie,
  HiOutlineChartPie,
  HiClipboard,
  HiOutlineClipboard,
  HiArrowUpOnSquareStack,
  HiOutlineArrowUpOnSquareStack,
  HiOutlineAdjustmentsVertical,
  HiAdjustmentsVertical,
  HiOutlineCircleStack,
  HiCircleStack,
  HiPaperAirplane,
  HiOutlinePaperAirplane,
  HiUserGroup,
  HiOutlineUserGroup,
  HiBell,
  HiOutlineBell,
  HiLightBulb,
  HiOutlineLightBulb,
  HiStopCircle,
  HiOutlineStopCircle,
  HiUser,
  HiOutlineUser,
  HiShoppingBag,
  HiOutlineShoppingBag,
  HiOutlineDocumentText,
  HiDocumentText,
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

const userRoutes = [{}];

const routes = { adminRoutes };

export default routes;
