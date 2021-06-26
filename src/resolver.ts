import { gql } from 'apollo-server';
import { Resolvers } from './generated/graphql';

export const typeDefs = gql`
  enum TicketStatus {
    OPEN
    PENDING
    CLOSED
  }
  type Ticket {
    id: String!
    title: String!
    description: String
    status: TicketStatus!
  }

  type Query {
    ticket(id: String!): Ticket
    tickets: [Ticket]
  }

  type Mutation {
    updateTicketStatus(id: String, status: TicketStatus): Ticket
  }
`;

export const resolvers: Resolvers = {
  Query: {
    ticket: (_, args, ctx) => ctx.dataSources.ticketsProvider.getTicket(args),
    tickets: (_, __, ctx) => ctx.dataSources.ticketsProvider.getTickets()
  },
  Mutation : {
    updateTicketStatus: (_, args, ctx) => ctx.dataSources.ticketsProvider.updateTicketStatus(args),
  }
};
