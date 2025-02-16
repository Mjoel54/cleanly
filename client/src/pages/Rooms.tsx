import AddRoomForm from "../components/Rooms/AddRoomForm";
import RoomsList from "../components/Rooms/RoomsList";

export default function Rooms() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8 text-center py-6">
            Manage the rooms in your household
          </h2>
        </div>
        <AddRoomForm />
        <RoomsList />
      </div>
    </>
  );
}
