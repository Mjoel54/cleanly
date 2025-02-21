import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";

// Define interface for button items
export interface ButtonItem {
  name?: string;
  action: () => void;
  icon?: ReactNode;
  className?: string;
}

// Props for the DropdownMenu component
interface DropdownMenuProps {
  buttonIcon: ReactNode;
  buttonClassName?: string;
  menuItems: ButtonItem[];
  menuClassName?: string;
}

export const redButtonStyling =
  "block w-full px-4 py-2 text-left text-sm rounded-sm text-red-600 data-focus:bg-gray-100 data-focus:text-red-700 data-focus:outline-hidden cursor-pointer inline-flex items-center gap-x-2";

export default function DropdownMenu({
  buttonIcon,
  buttonClassName = "inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-inset cursor-pointer",
  menuItems,
  menuClassName = "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden",
}: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className={buttonClassName}>{buttonIcon}</MenuButton>
      </div>

      <MenuItems className={menuClassName}>
        <div className="m-1">
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <button
                onClick={item.action}
                className={
                  item.className ||
                  "block w-full px-4 py-2 text-left text-sm rounded-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer inline-flex items-center gap-x-2"
                }
              >
                {item.icon}
                {item.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
