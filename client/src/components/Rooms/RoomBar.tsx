import Dropdown from "./Dropdown";

interface RoomBarProps {
  key: string;
  roomName: string;
  taskCount: number;
}

export default function RoomBar({ key, roomName, taskCount }: RoomBarProps) {
  return (
    <div className="bg-white shadow-sm sm:rounded-lg my-5">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          {/* Left section: Room name + Task count */}
          <div className="flex w-full sm:w-auto justify-between sm:justify-start sm:space-x-6">
            <div className="min-w-[150px]">
              {/* Adjust `min-w-[150px]` to a comfortable width */}
              <h3 className="font-semibold">{roomName}</h3>
            </div>
            <div className="text-right w-24">
              {/* Use `w-24` to standardize width */}
              <h3 className="text-gray-600">{taskCount} tasks</h3>
            </div>
          </div>
          {/* Right section: Dropdown */}
          <div>
            <Dropdown roomId={key} />
          </div>
        </div>
      </div>
    </div>
  );
}
