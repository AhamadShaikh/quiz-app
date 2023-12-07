import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-2">
      <div className="container mx-auto flex items-center justify-evenly">
        <Link to="/" className="text-white text-lg font-semibold">Create Form</Link>
        <Link to="/quiz" className="text-white text-lg font-semibold ml-4">Quiz</Link>
      </div>
    </nav>
  );
};

export default Navbar;
