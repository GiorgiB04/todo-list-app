import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="bg-background flex items-center justify-between top-o py-2 border-b">
      <h2 className="text-3xl font-bold">
        ToDo App
        <span className="text-primary text-4xl">.</span>
      </h2>
      <div className="flex items-center gap-8">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
