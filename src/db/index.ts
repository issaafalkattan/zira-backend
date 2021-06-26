import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Ticket } from '../generated/graphql';
import dummyData from './dummyData';


class TicketsDatabase {

  db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config("tickets", true, false, '/'));
  }

  populate = (): void => {
    this.db.push('tickets', dummyData);
  }

  listTickets = (): Ticket[] => {
    const tickets = this.db.getData("/");
    return tickets;
  }

  updateTickets = (newTickets: Ticket[]): void => {
    this.db.push('/', newTickets);
  }
}

export default new TicketsDatabase();