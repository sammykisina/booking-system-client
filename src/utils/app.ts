const generateTicketNumber: () => string = () => {
  const ticketLoops = 2;
  let ticketNumber = '';
  for (let index = 0; index <= ticketLoops; index++) {
    const number = Math.floor(Math.random() * 1000);
    ticketNumber = ticketNumber + number;
  }

  return 'ticket-' + generateTicketNumberWithDashes(ticketNumber);
};

const generateTicketNumberWithDashes: (number: string) => string = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '-');
};

const appUtils = {
  generateTicketNumber,
};

export default appUtils;
