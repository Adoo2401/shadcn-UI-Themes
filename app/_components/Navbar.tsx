"use client";

import Theme from "./Theme";


const Navbar = () => {
  
  return (
    <div className="flex items-center p-4">
      <div className="flex w-full justify-end space-x-2 min-[350px]:space-x-2.5 sm:space-x-5  flex-wrap items-center">
        <Theme />
      </div>
    </div>
  );
};

export default Navbar;
