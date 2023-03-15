import { Logo, Link } from '@/components';

const Hero = () => {
  return (
    <section className='relative h-full flex flex-col gap-3 justify-center items-center border rounded-[2rem]'>
      <Logo
        logoStyles='text-[3rem] text-textColor'
        dotStyles='w-2 h-2 bg-callToAction'
      />

      <div>
        <span className='text-[3rem]'>Simple Booking.</span>
        <div className='flex items-center gap-3 justify-end'>
          <div className='w-[5rem] h-[2rem] border-2 border-textColor  rounded-full' />
          <span className='text-[2rem] '>Easy Savings.</span>
        </div>
      </div>

      <span className='font-bold mt-5 text-xl'>
        Easy way to your next destination.
      </span>

      <Link
        route={{
          to: '/auth/register',
          name: 'Get Started',
        }}
        type='large'
        fullWidth={true}
      />

      <div className='w-5 h-5 bg-callToAction absolute top-[20px] left-[30px] animate-pulse rounded-full' />
      <div className='w-5 h-5 bg-callToAction absolute bottom-[20px] right-[30px] animate-pulse rounded-full' />
    </section>
  );
};

export default Hero;
