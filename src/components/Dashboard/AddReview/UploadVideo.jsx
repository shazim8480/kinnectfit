import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const UploadVideo = ({ isOpen, onOpenChange }) => {
    return (
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="p-10">
                            <div>
                                <div className="flex justify-center items-center relative w-85 h-80">
                                    <p className='text-xl'>Coming soon...</p>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UploadVideo;