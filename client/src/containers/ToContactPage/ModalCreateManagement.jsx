import { Dialog } from '@headlessui/react';
import FormUpdateContact from 'components/FormUpdateContact/FormUpdateContact';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ModalCreateManagement = ({ isOpen, setIsOpen }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div >
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4 ">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto  rounded bg-white">
                        <div className="p-8 max-w-[800px] block">
                            <FormUpdateContact />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ModalCreateManagement