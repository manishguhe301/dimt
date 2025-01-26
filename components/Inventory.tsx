'use client';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Inventory } from '@prisma/client';
import { Pagination } from '@mui/material';

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryData.slice(indexOfFirstItem, indexOfLastItem);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>
        {!loading && inventoryData.length > 0 ? (
          <>
            <h2 className='text-3xl font-poppins font-semibold text-gray-800 mb-6'>
              Inventory List
            </h2>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
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
                      <td className='px-4 py-3 text-blue-600 cursor-pointer'>
                        Edit
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              count={Math.ceil(inventoryData.length / itemsPerPage)}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color='primary'
              shape='rounded'
              sx={{
                mt: 2,
                justifyContent: 'center',
                '& .MuiPaginationItem-root': {
                  bgcolor: '#fff',
                  color: '#111827',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  bgcolor: '#111827',
                  color: '#fff',
                },
              }}
            />
          </>
        ) : (
          <div className='flex flex-col justify-center items-center h-screen'>
            <Spinner />
            <p className='text-gray-600 mt-4'>Fetching inventory data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryDashboard;
