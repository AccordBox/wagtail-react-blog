import React from "react";
import { Disclosure } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  LightBulbIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import { classNames } from "../utils";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

const navigation = [
  {name: "Dashboard", href: "#", current: false},
  {name: "Team", href: "#", current: false},
  {name: "Projects", href: "#", current: false},
  {name: "Calendar", href: "#", current: false},
];


function TopNav() {
  const [colorTheme, setColorTheme] = useDarkMode();

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-opacity-75 border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-500"
    >
      {({open}) => (
        <>
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true"/>
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    to="/"
                  >
                    <span className="text-bold text-grey-800">
                      React Wagtail Demo
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? ""
                            : "text-gray-500 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                  onClick={() =>
                    setColorTheme(colorTheme === "dark" ? "light" : "dark")
                  }
                >
                  {colorTheme === "light" ? (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>

            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export { TopNav };
