import AddRoomForm from "../components/Rooms/AddRoomForm";
import AddRoomTable from "../components/Rooms/AddRoomTable";

export default function RoomsPage() {
  return (
    <>
      <div className="p-5">
        <h2>Rooms</h2>
      </div>
      <AddRoomForm />
      <AddRoomTable />
    </>
  );
}
