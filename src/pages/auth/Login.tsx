import { Logo, Title, Error, Button, SpinnerLoader, Link } from '@/components';
import { useAuth } from '@/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Navigate } from 'react-router-dom';
import { UserData as LoginData } from '../../types/typings.t';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  /**
   * page states
   */
  const { isLogging, user, loginMutateAsync } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<LoginData> = ({ email, password }) => {
    loginMutateAsync({ email, password });
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
            Faster Safer
          </span>
        </div>
      </div>

      {/*  into section */}
      <div className='mt-5 w-full px-6  sm:w-3/4 lg:w-1/2'>
        <Title title='Login' titleStyles='text-lg' />

        {/* the login details */}
        <div className='mt-3'>
          <form className='space-y-1 py-2' onSubmit={handleSubmit(onSubmit)}>
            <section className='flex w-full flex-col gap-4 py-3'>
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
              title={isLogging ? <SpinnerLoader color='fill-white' /> : 'Login'}
              type='submit'
              intent='primary'
            />
          </form>
        </div>
      </div>

      <div className='mt-10 flex justify-center flex-col items-center'>
        <span className='text-textColor tracking-wider'>Forgot Password?</span>

        <div className='flex items-center gap-3'>
          <span>Don't Have Account Yet?</span>
          <Link
            route={{
              to: '/auth/register',
              name: 'Register',
            }}
            type='link'
          />
        </div>
      </div>

      {/* Toaster */}
      <Toaster />
    </section>
  );
};

export default Login;
