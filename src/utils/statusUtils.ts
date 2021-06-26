import { TicketStatus } from '../generated/graphql';

export const STATUS_ORDER = {
  OPEN: 0,
  PENDING: 1,
  CLOSED: 2
};

export const isStatusChangeValid = (
  prevStatus: TicketStatus,
  newStatus: TicketStatus
): boolean => {
  if (STATUS_ORDER[prevStatus] < STATUS_ORDER[newStatus]) { return true; }
  return false;
};
