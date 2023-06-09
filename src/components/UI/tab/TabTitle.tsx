import { Title } from '@/components';
import type { FC } from 'react';

type TabTitleProps = {
  title: string;
  titleStyles?: string;
};

const TabTitle: FC<TabTitleProps> = ({ title }) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='icon rounded-full bg-callToAction' />
      <Title title={title} />
    </div>
  );
};

export default TabTitle;
