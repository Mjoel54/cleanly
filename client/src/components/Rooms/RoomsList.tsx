import { useQuery } from "@apollo/client";
import RoomCard from "./RoomCard";
import { motion } from "framer-motion";
import { RoomResponse } from "../../interfaces/Room";

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
    <div>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {rooms.map((room: RoomResponse) => (
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          >
            <RoomCard
              key={room._id}
              roomId={room._id}
              roomName={room.name}
              taskCount={room.tasks.length}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
