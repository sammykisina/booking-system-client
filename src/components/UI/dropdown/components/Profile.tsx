import { useAuth } from '@/hooks';
import { Button, Link, TabTitle } from '@/components';

const Profile = () => {
  /**
   * component states
   */
  const { user } = useAuth();

  /**
   * component functions
   */
  return (
    <section className='w-[15rem] py-2 px-3 flex flex-col gap-2'>
      {/* title */}
      <div>
        <TabTitle title='Your Profile' />
      </div>

      {user ? (
        ''
      ) : (
        <div>
          <Link
            route={{
              to: '/auth/login',
              name: 'Login',
            }}
            type='link'
          />
        </div>
      )}
    </section>
  );
};

export default Profile;
