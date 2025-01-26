import { Inventory } from '@prisma/client';
import React from 'react';

const InventoryTable = ({ currentItems }: { currentItems: Inventory[] }) => {
  return (
    <div>
      <table className='min-w-full table-auto'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='px-4 py-3 text-left'>Item Name</th>
            <th className='px-4 py-3 text-left'>Category</th>
            <th className='px-4 py-3 text-left'>Quantity</th>
            <th className='px-4 py-3 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item: Inventory) => (
            <tr key={item.id} className='border-b'>
              <td className='px-4 py-3'>{item.name}</td>
              <td className='px-4 py-3'>{item.category}</td>
              <td className='px-4 py-3'>{item.quantity}</td>
              <td className='px-4 py-3 text-blue-600 cursor-pointer'>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
