const typeDefs = `
  type Task {
    _id: ID!
    name: String
    description: String
    dueDate: Int
    isCompleted: Boolean
    completedAt: String
    createdAt: String
    updatedAt: String
    room: Room!
  }

  type Room {
    _id: ID!
    name: String!
    tasks: [Task]
    createdAt: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    rooms: [Room]!
    createdAt: String
    isVerified: Boolean!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    password: String!
    currentPassword: String!
  }

  input RoomInput {
    name: String!
  }

  input TaskInput {
    name: String
    description: String
    isCompleted: Boolean
    dueDate: Int
    room: ID
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
    createTask(roomId: ID!, input: TaskInput!): Task
    updateTask(taskId: ID!, input: TaskInput!): Task
    deleteTask(taskId: ID!): Task
    deleteAllTasks: Boolean!
    deleteRoomsAndTasks: Boolean!
    updateUser(input: UpdateUserInput!): Auth
    deleteUser(password: String!): Boolean!
  }
`;

export default typeDefs;
