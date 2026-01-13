"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/logo.webp";
import { IoMdArrowDropdown } from "react-icons/io";
import { NAV_LINKS, MenuType } from "@/lib/constants";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType | null>(null);

  const dropdownRef = useRef<HTMLLIElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [])

  return (
    <header className="px-30 py-5 shadow-md bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between">
        <Image src={Logo} alt="logo" width={400} priority />

        <ul
          className="flex items-center gap-10 text-base">
          {/* Static Links */}
          {["Home", "About", "Showcase", "Contact"].map((link) => (
            <li key={link} className="cursor-pointer text-teal-500 hover:text-teal-700 transition">
              {link}
            </li>
          ))}

          {/* Dynamic Dropdown Links */}
          {NAV_LINKS.map((item) => (
            <li
              key={item.type}
              ref={activeMenu === item.type ? dropdownRef : null}
              className="relative flex items-center cursor-pointer text-teal-500"
              onClick={() => setActiveMenu(activeMenu === item.type ? null : item.type)}
            >
              {item.title}
              <IoMdArrowDropdown className={`text-lg transition-transform ${activeMenu === item.type ? "rotate-180" : ""}`}
              />

              <div
                className={`absolute top-10 -left-5 shadow-lg border border-stone-100 bg-white min-w-50 rounded-md z-10 transition-all duration-200 ease-out ${activeMenu === item.type ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
              >

                {item.options.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-stone-100 transition whitespace-nowrap"
                  >
                    {option}
                  </div>
                ))}

              </div>
            </li>
          ))}

          <li>
            <button
              className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-2 rounded-full cursor-pointer transition"
            >
              Download
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;