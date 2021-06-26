import { DataSource } from 'apollo-datasource';
import { QueryTicketArgs, Ticket, TicketStatus } from './generated/graphql';

const tickets: Ticket[] = [
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
  public async getTicket(args: QueryTicketArgs): Promise<Ticket | undefined> {
    const ticket = tickets.find(ticket => ticket.id === args.id);
    return Promise.resolve(ticket);
  }

  public async getTickets(): Promise<Ticket[]> {
    return Promise.resolve(tickets);
  }
}
