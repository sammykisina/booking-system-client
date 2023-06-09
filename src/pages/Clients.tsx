import { useClient } from '@/hooks';
import { SpinnerLoader, TabTitle, Table } from '@/components';

const Clients = () => {
  /**
   * page states
   */
  const {
    clients,
    isFetchingClients,
    modifyClientsDataForClientsTable,
    clientColumns,
  } = useClient();
  console.log('clients', clients);

  /**
   * page functions
   */
  return (
    <section className='h-full xs:h-[34.5rem] lg:h-[39rem]'>
      {/* title */}
      <TabTitle title='YOUR CLIENTS' />

      {/* the  body */}
      <section className='mt-5'>
        {isFetchingClients ? (
          <div className='flex h-[15rem]  items-center justify-center'>
            <SpinnerLoader color='fill-callToAction' />
          </div>
        ) : (
          <Table
            data={modifyClientsDataForClientsTable(clients)}
            columns={clientColumns}
            showFilters={true}
            tableHeight='h-[39rem] xs:h-[32.5rem]'
          />
        )}
      </section>
    </section>
  );
};

export default Clients;
