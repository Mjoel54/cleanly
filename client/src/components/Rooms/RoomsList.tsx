import { useQuery } from "@apollo/client";
import RoomCard from "./RoomCard";

// import helper functions
import { GET_ROOMS } from "../../utils/api/index";

// import types
// import { RoomResponse } from "../../interfaces/Room";

export default function RoomsList() {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rooms = data?.rooms || [];
  // console.log(rooms);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {rooms.map((room: Room) => (
        <RoomCard
          key={room._id}
          roomId={room._id}
          roomName={room.name}
          taskCount={room.tasks.length}
        />
      ))}
    </div>
  );
}
