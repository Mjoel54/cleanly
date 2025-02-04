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

  type Query {
    rooms: [Room]!
  }
`;

export default typeDefs;
