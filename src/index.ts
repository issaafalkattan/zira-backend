import { ApolloServer } from 'apollo-server';

import { TicketsProvider } from './provider';
import { resolvers, typeDefs } from './resolver';
import ticketsDatabse from './db';

export interface Context {
  dataSources: {
    ticketsProvider: TicketsProvider;
  };
}

const dataSources = (): Context['dataSources'] => {
  return {
    ticketsProvider: new TicketsProvider()
  };
};

const server = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  dataSources
});

// Populate db with some dummy data
ticketsDatabse.populate();

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
