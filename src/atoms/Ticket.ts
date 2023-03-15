import { atom } from 'recoil';
import { SelectionOption } from '../types/typings.t';

const showBookTicketWidgetState = atom({
  key: 'showBookTicketWidgetState',
  default: false,
});

const globalTravelMeansState = atom({
  key: 'globalTravelMeansState',
  default: '',
});

const globalJourneyInfoState = atom<{
  selectedJourney: SelectionOption;
  numberOfAdults: number;
  numberOfPersonsBtwn2And16Yrs: number;
  means: string;
} | null>({
  key: 'globalJourneyInfoState',
  default: null,
});

const showBookTicketConfirmationModalState = atom({
  key: 'showBookTicketConfirmationModalState',
  default: false,
});

const ticketAtoms = {
  showBookTicketWidgetState,
  globalTravelMeansState,
  globalJourneyInfoState,
  showBookTicketConfirmationModalState,
};

export default ticketAtoms;
