const typeDefs = `
  enum TaskStatus {
    active
    completed
    deleted
  }

  type Task {
    _id: ID!
    name: String!
    description: String
    status: TaskStatus
    createdAt: String
  }

  type Room {
    _id: ID!
    name: String!
    tasks: [Task]!
    createdAt: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    rooms: [Room]!
    createdAt: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input RoomInput {
    name: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    rooms: [Room]!
    room(id: ID!): Room
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createRoom(name: String!): Room
    updateRoom(id: ID!, name: String!): Room
    deleteRoom(id: ID!): Room
  }
`;

export default typeDefs;
