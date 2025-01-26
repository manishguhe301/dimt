'use client';
import React, { createContext, useContext, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSnackbarContext } from './SnackbarProvider';

type ModalContextType = {
  openModal: (
    type: 'edit' | 'add',
    data?: { name: string; category: string; quantity: number; id: string }
  ) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useGlobalModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useGlobalModal must be used within ModalProvider');
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    quantity: 0,
  });
  const { showSnackbar } = useSnackbarContext();

  const openModal = (
    type: 'edit' | 'add',
    data?: { name: string; category: string; quantity: number; id: string }
  ) => {
    if (type === 'edit' && data) {
      setFormData(data);
    } else {
      setFormData({ id: '', name: '', category: '', quantity: 0 });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    try {
      const { id, name, category, quantity } = formData;

      if (!name || !category || quantity === undefined) {
        throw new Error('Missing required fields: name, category, or quantity');
      }

      const requestData: {
        name: string;
        category: string;
        quantity: number;
        id?: string;
      } = {
        name,
        category,
        quantity,
      };

      if (id) {
        requestData.id = id;
      }

      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to save inventory item');
      }

      showSnackbar(
        id
          ? 'Inventory item updated successfully!'
          : 'Inventory item added successfully!',
        'success'
      );

      closeModal();
    } catch (error) {
      console.error('Error handling inventory item:', error);
      closeModal();
      showSnackbar('Failed to save inventory item.');
    }
  };
  
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle className='text-gray-800 font-bold font-poppins'>
          {formData.name ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <div className='flex flex-col gap-2'>
            <label className='block text-gray-700 font-medium mb-1'>
              Item Name
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#111827]'
            />
          </div>
          <div
            className='flex
           items-center gap-2'
          >
            <div className='flex flex-col gap-2'>
              <label className='block text-gray-700 font-medium mt-4 mb-1'>
                Category
              </label>
              <input
                type='text'
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#111827]'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='block text-gray-700 font-medium mt-4 mb-1'>
                Quantity
              </label>
              <input
                type='number'
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value, 10) || 0,
                  })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#111827]'
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={closeModal}
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              !formData.name || !formData.category || !formData.quantity
            }
            className='bg-[#111827] hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300'
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
};
