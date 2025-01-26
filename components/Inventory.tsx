'use client';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Pagination } from '@mui/material';
import InventoryTable from './InventoryTable';
import { Inventory } from '@prisma/client';

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = inventoryData.filter((item: Inventory) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalFilteredItems = filteredItems.length;
  const countPages = Math.ceil(totalFilteredItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > countPages && countPages > 0) {
      setCurrentPage(countPages);
    }
  }, [filteredItems, currentPage, countPages]);

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
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-poppins font-semibold text-gray-800 mb-6'>
                Inventory List
              </h2>
              <div className='flex items-center'>
                <input
                  type='text'
                  placeholder='Search'
                  className='border border-gray-300 rounded-md px-3 py-2 mr-2 outline-none'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
              <InventoryTable currentItems={currentItems} />
            </div>
            <Pagination
              count={countPages}
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
                '& .MuiPaginationItem-root.Mui-selected:hover': {
                  bgcolor: '#485268',
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
