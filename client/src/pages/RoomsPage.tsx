import AddRoomForm from "../components/Rooms/AddRoomForm";
import RoomTable from "../components/Rooms/RoomTable";

export default function RoomsPage() {
  return (
    <>
      <div className="p-5">
        <h2>Rooms</h2>
      </div>
      <AddRoomForm />
      <RoomTable />
    </>
  );
}
