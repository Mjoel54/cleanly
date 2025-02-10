import { useQuery } from "@apollo/client";

// import helper functions
import { GET_TASKS } from "../../utils/api/index";

// import types
// import { RoomResponse } from "../../interfaces/Room";

export default function TasksList() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data?.tasks || [];
  console.log(tasks);

  return (
    <div>
      {/* {rooms.map((room: Room) => (
        <RoomCard
          key={room._id}
          roomId={room._id}
          roomName={room.name}
          taskCount={room.tasks.length}
        />
      ))} */}
      <></>
    </div>
  );
}
