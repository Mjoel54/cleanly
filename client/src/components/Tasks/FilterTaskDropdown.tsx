import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  ChevronDownIcon,
  TrashIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

export default function FilterTaskDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="p-0">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer">
          Filter
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="p-1">
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <CalendarDaysIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
              />
              Due Date
            </a>
          </MenuItem>
        </div>
        <div className="p-1">
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <CheckCircleIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
              />
              Status
            </a>
          </MenuItem>
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <Squares2X2Icon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
              />
              Room
            </a>
          </MenuItem>
        </div>

        <div className="p-1">
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <TrashIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
              />
              Remove filters
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
