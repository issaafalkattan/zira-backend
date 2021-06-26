import { TicketStatus } from "../generated/graphql";

export const dummyData = [
    {
        id: 'zira-0001',
        title: 'Wake up',
        description: 'an instance of a person waking up or being woken up.',
        status: TicketStatus.Closed
      },
      {
        id: 'zira-0002',
        title: 'Eat breakfast',
        description:
          'the first meal of the day especially when taken in the morning. 2 : the food prepared for a breakfast eat your breakfast',
        status: TicketStatus.Pending
      }
]

export default dummyData;