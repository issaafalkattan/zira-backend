import { DataSource } from 'apollo-datasource';
import { QueryTicketArgs, Ticket, TicketStatus, MutationUpdateTicketStatusArgs } from './generated/graphql';
import { isStatusChangeValid } from './utils';

let tickets: Ticket[] = [
  {
    id: 'zira-0001',
    title: 'Wake up',
    description: 'an instance of a person waking up or being woken up.',
    status: TicketStatus['Closed']
  },
  {
    id: 'zira-0002',
    title: 'Eat breakfast',
    description:
      'the first meal of the day especially when taken in the morning. 2 : the food prepared for a breakfast eat your breakfast',
    status: TicketStatus['Pending']
  }
];

export class TicketsProvider extends DataSource {
  public async getTicket(args: QueryTicketArgs): Promise<Ticket | boolean> {
    const ticket = tickets.find(ticket => ticket.id === args.id);
    if(ticket)
    return Promise.resolve(ticket);
    return false;
  }

  public async getTickets(): Promise<Ticket[]> {
    return Promise.resolve(tickets);
  }

  public async updateTicketStatus(args: MutationUpdateTicketStatusArgs): Promise<Ticket> {
     const { id, status } = args;
     const ticket = tickets.find(ticket => ticket.id === id);
     if(!ticket){
       throw new Error("Ticket not found")
     }
     if(status && !isStatusChangeValid(ticket.status, status)){
       throw new Error(`Invalid status change. Cannot transition a ${ticket.status} ticket to ${status}.`)
     }
     const newTicket = { ...ticket, status: args.status } as Ticket;
     tickets = [...tickets.filter(ticket => ticket.id !== id), newTicket];
     return newTicket;
  }
}
 