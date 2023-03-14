import { useState } from 'react';
import { FaBus, FaTrain, FaPlane } from 'react-icons/fa';
import { BusJourneys, Tab, TrainJourneys, AirJourneys } from '@/components';

const Journeys = () => {
  /**
   * page states
   */
  const [index, setIndex] = useState(0);
  const journeyTabs = [
    {
      label: 'Bus',
      content: <BusJourneys />,
      icon: <FaBus className='icon' />,
    },
    {
      label: 'Train',
      content: <TrainJourneys />,
      icon: <FaTrain className='icon' />,
    },
    {
      label: 'Air',
      content: <AirJourneys />,
      icon: <FaPlane className='icon' />,
    },
  ];

  return (
    <section className='h-full '>
      <Tab
        tabsData={journeyTabs}
        tabsBodyStyles='lg:grid grid-cols-6 duration-300'
        index={index}
        iconsOnlyTabs
        setIndex={setIndex}
        iconsOnlyTabsStyles='flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1'
        tabsContentHeight='mt-[1rem] py-2 lg:mt-0 scrollbar-hide'
      />
    </section>
  );
};

export default Journeys;
