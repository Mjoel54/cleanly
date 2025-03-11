// import RoomActionsDropdown from "./RoomActionsDropdown";
// import EditableRoomName from "./EditableRoomName";
// import RoomActions from "./RoomActions";
import RoomItemMenu from "./RoomItemMenu";
import fridgeIcon from "../../images/fridge.svg";

interface RoomCardProps {
  roomId: string;
  roomName: string;
  taskCount: number;
}

export default function RoomCard({
  roomId,
  roomName,
  taskCount,
}: RoomCardProps) {
  return (
    <div className="bg-white shadow-sm sm:rounded-lg my-5 ring-1 ring-black/5">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          {/* Left section: Room name + Task count */}
          <div className="flex w-full sm:w-auto justify-between items-center sm:justify-start sm:space-x-6">
            <div className="ring-1 shadow-sm ring-black/5 rounded-md p-2 bg-orange-500">
              {/* <p className="text-white">icon</p> */}
              <img
                src={fridgeIcon}
                alt="fridge"
                className="w-8 h-8 brightness-0 invert"
              />
            </div>
            <div className="min-w-[150px]">
              {/* Adjust `min-w-[150px]` to a comfortable width */}
              <h3 className="font-semibold">{roomName}</h3>
            </div>
            <div className="text-right w-24">
              {/* Use `w-24` to standardize width */}
              <h3 className="text-gray-600">
                {taskCount !== 1 ? `${taskCount} tasks` : `${taskCount} task`}
              </h3>
            </div>
          </div>
          {/* Right section: Dropdown */}
          <div>
            {/* <RoomActions roomId={roomId} currentName={roomName} /> */}
            <RoomItemMenu roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  );
}
