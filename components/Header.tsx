import React from 'react';

const Header = () => {
  return (
    <header className='bg-gray-900 text-white p-6'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-xl md:text-3xl font-poppins font-bold max-sm:text-center'>
          Inventory Management System
        </h1>
      </div>
    </header>
  );
};

export default Header;
