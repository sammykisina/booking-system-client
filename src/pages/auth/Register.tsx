import { Logo, Title, Error, Button, SpinnerLoader, Link } from '@/components';
import { useAuth } from '@/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Navigate } from 'react-router-dom';
import { RegisterData } from '../../types/typings.t';
import { Toaster } from 'react-hot-toast';

const Register = () => {
  /**
   * page states
   */
  const { user, isRegisteringUser, registerUserMutateAsync } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<RegisterData> = ({ email, password, name }) => {
    registerUserMutateAsync({ name, email, password });
  };

  if (user) return <Navigate to='/' replace />;

  return (
    <section className='mx-auto flex h-[630px] w-full max-w-[1100px] flex-col items-center  justify-center sm:px-[24px]'>
      {/* logo & into */}
      <div className='mb-5 flex flex-col items-center'>
        <Logo
          logoStyles='text-[3rem] text-textColor'
          dotStyles='w-2 h-2 bg-callToAction'
        />

        <div className='flex items-center gap-3'>
          <div className='text-lg text-textColor'>PackUK</div>
          <span className='rounded-full px-3 text-white text-xs flex items-center justify-center leading-loose bg-callToAction/40'>
            Join Us With A Few Clicks
          </span>
        </div>
      </div>

      {/*  into section */}
      <div className='mt-5 w-full px-6  sm:w-3/4 lg:w-1/2'>
        <Title title='Register' titleStyles='text-lg' />

        {/* the login details */}
        <div className='mt-3'>
          <form className='space-y-1 py-2' onSubmit={handleSubmit(onSubmit)}>
            <section className='flex w-full flex-col gap-4 py-3'>
              <div className='relative'>
                <input
                  type='text'
                  {...register('name', {
                    required: 'Name is required.',
                  })}
                  className='input peer'
                  placeholder='Name'
                />
                <label className='inputLabel'>Name</label>

                {errors['name'] && (
                  <ErrorMessage
                    errors={errors}
                    name='name'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>

              <div className='relative'>
                <input
                  type='email'
                  {...register('email', {
                    required: 'Email is required.',
                  })}
                  className='input peer'
                  placeholder='Email'
                />
                <label className='inputLabel'>Email</label>

                {errors['email'] && (
                  <ErrorMessage
                    errors={errors}
                    name='email'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>

              <div className='relative'>
                <input
                  type='password'
                  {...register('password', {
                    required: 'Enter your password.',
                  })}
                  className='input peer'
                  placeholder='Password'
                />
                <label className='inputLabel'>Password</label>

                {errors['password'] && (
                  <ErrorMessage
                    errors={errors}
                    name='password'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>
            </section>

            <Button
              title={
                isRegisteringUser ? (
                  <SpinnerLoader color='fill-textColor' />
                ) : (
                  'Register'
                )
              }
              type='submit'
              intent='primary'
            />
          </form>
        </div>
      </div>

      <div className='mt-10 flex justify-center flex-col items-center'>
        <div className='flex items-center gap-3'>
          <span>Have an Account?</span>
          <Link
            route={{
              to: '/auth/login',
              name: 'Login',
            }}
            type='link'
          />
        </div>
      </div>

      {/* the Toaster */}
      <Toaster />
    </section>
  );
};

export default Register;
