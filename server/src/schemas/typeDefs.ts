const typeDefs = `
  enum TaskStatus {
    ACTIVE
    COMPLETED
    DELETED
  }

  type Task {
    _id: ID!
    name: String
    description: String
    status: TaskStatus
    dueDate: Int
    completedAt: String
    createdAt: String
    updatedAt: String
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

  input TaskInput {
    name: String!
    description: String
    status: TaskStatus
    dueDate: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    rooms: [Room]!
    room(id: ID!): Room
    tasks: [Task]!
    task(id: ID!): Task
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createRoom(name: String!): Room
    updateRoom(id: ID!, name: String!): Room
    deleteRoom(id: ID!): Room
    createTask(roomId: ID!, input: TaskInput!): Room
    updateTask(taskId: ID!, input: TaskInput!): Task
    deleteTask(taskId: ID!): Task
    deleteAllTasks: Boolean!
    deleteRoomsAndTasks: Boolean!
  }
`;

export default typeDefs;
