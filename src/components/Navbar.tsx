"use client";

import { useStore } from "@/lib/hooks";

const Navbar = () => {

  const { activeSection } = useStore();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
      <header className="flex items-center justify-center px-6 py-4 bg-gray-800 w-full fixed top-0 z-[999]">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                className={`px-3 py-2 rounded-md text-white hover:bg-yellow-200 hover:text-gray-800 ${
                  activeSection === "first" ? "bg-yellow-500 text-gray-800" : ""
                }`}
                onClick={() => scrollToSection("first")}
     
              >
                First
              </button>
            </li>
            <li>
              <button
                className={`px-3 py-2 rounded-md text-white hover:bg-yellow-200 hover:text-gray-800 
                  ${
                  activeSection === "second"
                    ? "bg-yellow-500 text-gray-800"
                    : ""
                  }`
                }
                onClick={() => scrollToSection("second")}

              >
                Second
              </button>
            </li>
            <li>
              <button
                className={`px-3 py-2 rounded-md text-white hover:bg-yellow-200 hover:text-gray-800 ${
                  activeSection === "third" ? "bg-yellow-500 text-gray-800" : ""
                }`}
                onClick={() => scrollToSection("third")}
       
              >
                Third
              </button>
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default Navbar;
