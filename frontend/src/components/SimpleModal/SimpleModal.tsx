import { ReactNode } from 'react';
import CloseIcon from '../Icons/CloseIcon';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  title: String; 
  children:ReactNode;
}


function SimpleModal({isOpen, closeModal, title, children}: Props) {


  return (
    <div className="p-4">

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl justify-center font-bold">{title}</h2>
              <button 
                onClick={closeModal} 
                className="text-gray-600 hover:text-gray-900"
              >
                <CloseIcon/>
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleModal;