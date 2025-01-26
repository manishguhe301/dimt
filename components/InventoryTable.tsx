import { Inventory } from '@prisma/client';
import React from 'react';

const InventoryTable = ({ currentItems }: { currentItems: Inventory[] }) => {
  return (
    <div className='min-h-[400px]'>
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
            <tr
              key={item.id}
              className={`border-b ${
                item.quantity < 10 ? 'bg-yellow-100' : ''
              }`}
            >
              <td className='px-4 py-3'>{item.name}</td>
              <td className='px-4 py-3'>{item.category}</td>
              <td className='px-4 py-3'>
                {item.quantity}
                {item.quantity < 10 && (
                  <span className='ml-2 inline-block bg-red-200 text-red-800 text-xs font-semibold rounded-full px-2 py-1'>
                    Low Stock
                  </span>
                )}
              </td>
              <td className='px-4 py-3 text-blue-600 cursor-pointer'>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
