'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  processName: string;
}

const DeleteProcessModal = ({ isOpen, onClose, onConfirm, processName }: DeleteProcessModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-card-background dark:bg-card-background-dark p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-error dark:text-error-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-text dark:text-text-dark">
                      Eliminar Input
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-text-muted dark:text-text-muted-dark">
                        ¿Estás seguro que deseas eliminar {processName || "sin nombre"}? Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark px-4 py-2 text-sm font-medium text-text dark:text-text-dark hover:bg-info-background dark:hover:bg-info-background-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-error dark:bg-error-dark px-4 py-2 text-sm font-medium text-text-light hover:bg-error-hover dark:hover:bg-error-hover-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-error dark:focus-visible:ring-error-dark focus-visible:ring-offset-2"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteProcessModal; 