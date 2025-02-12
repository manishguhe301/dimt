'use client';
import { Inventory } from '@prisma/client';
import React from 'react';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useSnackbarContext } from '@/providers/SnackbarProvider';
import { useGlobalModal } from '@/providers/ModalProvider';

const InventoryTable = ({
  currentItems,
  setInventoryData,
}: {
  currentItems: Inventory[];
  setInventoryData: React.Dispatch<React.SetStateAction<Inventory[]>>;
}) => {
  const { showSnackbar } = useSnackbarContext();
  const { openModal } = useGlobalModal();

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/inventory?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setInventoryData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
        showSnackbar('Item deleted successfully!', 'success');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
      showSnackbar('Failed to delete item.', 'error');
    }
  };

  return (
    <div className='min-h-[400px] max-sm:overflow-scroll'>
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
              <td className='px-4 py-3 max-sm:'>
                {item.quantity}
                {item.quantity < 10 && (
                  <span className='ml-2 inline-block bg-red-200 text-red-800 text-xs font-semibold rounded-full px-2 py-1 max-sm:text-[10px] max-sm:ml-0'>
                    Low Stock
                  </span>
                )}
              </td>
              <td className='px-4 py-3 flex items-center gap-4'>
                <p
                  className='text-blue-600 cursor-pointer flex items-center gap-2'
                  onClick={() => openModal('edit', item)}
                >
                  Edit{' '}
                  <CreateRoundedIcon color='inherit' sx={{ fontSize: 16 }} />
                </p>

                <p
                  className='text-red-600 cursor-pointer flex items-center gap-2'
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                  <DeleteForeverRoundedIcon
                    color='error'
                    sx={{ fontSize: 16 }}
                  />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
