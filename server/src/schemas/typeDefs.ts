// GraphQL type definitions for a room management system
// Define the Room type which represents a single room in the system

// The room(id: ID!) query takes a required ID parameter and returns a single Room

const typeDefs = `
  type Room {
    _id: ID!
    name: String
  }

  type Query {
    room(id: ID!): Room
    rooms: [Room]
  }

  type Mutation {
    createRoom(name: String!): Room
    deleteRoom(id: ID!): Room
  }
`;

export default typeDefs;
