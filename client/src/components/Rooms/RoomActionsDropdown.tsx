import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface RoomActionsDropdownProps {
  onDelete: () => void;
  onRename: () => void;
  onDuplicate: () => void;
}

export default function RoomActionsDropdown({
  onDelete,
  onRename,
  onDuplicate,
}: RoomActionsDropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer">
          Options
          <ChevronDownIcon
            className="-mr-1 size-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
        <div className="m-1">
          <MenuItem>
            <button
              onClick={onRename}
              className="block w-full px-4 py-2 text-left text-sm rounded-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
            >
              Rename
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={onDuplicate}
              className="block w-full px-4 py-2 text-left text-sm rounded-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
            >
              Duplicate
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={onDelete}
              className="block w-full px-4 py-2 text-left text-sm rounded-sm text-red-600 data-focus:bg-gray-100 data-focus:text-red-700 data-focus:outline-hidden cursor-pointer"
            >
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
