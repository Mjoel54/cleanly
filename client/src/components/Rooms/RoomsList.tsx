import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchAllRooms } from "../../store/roomsSlice"; // Make sure path is correct
import RoomCard from "./RoomCard";
import { motion } from "framer-motion";
import { RoomResponse } from "../../interfaces/Room";

export default function RoomsList() {
  const { rooms } = useSelector((state: RootState) => state.rooms);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  // if (loading) return <p>Loading rooms...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!rooms || rooms.length === 0) return <p>No rooms found</p>;

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
            key={room._id}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          >
            <RoomCard
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
