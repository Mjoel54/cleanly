import { Room } from "../models/index.js";
const resolvers = {
    // Query resolvers handle data fetching operations
    Query: {
        // Resolver for fetching a single room by ID
        // The '_' parameter is the parent object (unused here, hence the any type)
        // The second parameter destructures the 'id' from the query arguments
        room: async (_, { id }) => {
            return await Room.findById(id);
        },
        // Resolver for fetching all rooms
        // No arguments needed for this query
        rooms: async () => {
            return await Room.find();
        },
    },
    // Mutation resolvers handle data modification operations
    Mutation: {
        // Resolver for creating a new room
        // Destructures the 'name' parameter from the mutation arguments
        createRoom: async (_, { name }) => {
            const room = new Room({ name });
            await room.save();
            return room;
        },
        // Resolver for deleting a room by ID
        // Returns the deleted room object
        deleteRoom: async (_, { id }) => {
            return await Room.findByIdAndDelete(id);
        },
    },
};
export default resolvers;
