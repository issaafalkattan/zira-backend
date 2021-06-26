import { DataSource } from 'apollo-datasource';
import {
  MutationUpdateTicketStatusArgs,
  QueryTicketArgs,
  Ticket
} from './generated/graphql';
import { isStatusChangeValid } from './utils/statusUtils';
import ticketsDatabase from './db';

export class TicketsProvider extends DataSource {
  public async getTicket(args: QueryTicketArgs): Promise<Ticket | boolean> {
    const tickets = ticketsDatabase.listTickets();
    const ticket = tickets.find(ticket => ticket.id === args.id);
    if (ticket) { return Promise.resolve(ticket); }
    return false;
  }

  public async getTickets(): Promise<Ticket[]> {
    const tickets = ticketsDatabase.listTickets();
    return tickets;
  }

  public async updateTicketStatus(
    args: MutationUpdateTicketStatusArgs
  ): Promise<Ticket> {
    const { id, status } = args;
    const tickets = ticketsDatabase.listTickets();
    const ticket = tickets.find(ticket => ticket.id === id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    if (status && !isStatusChangeValid(ticket.status, status)) {
      throw new Error(
        `Invalid status change. Cannot transition a ${ticket.status} ticket to ${status}.`
      );
    }
    const newTicket = { ...ticket, status: args.status } as Ticket;
    ticketsDatabase.updateTickets([...tickets.filter(ticket => ticket.id !== id), newTicket]);
    return newTicket;
  }
}
