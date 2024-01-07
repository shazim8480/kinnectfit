import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const TrainerImages = ({ selectedImage, closeImageModal, imageModalOpen }) => {
    return (
        <Modal isOpen={imageModalOpen} placement="center" onOpenChange={closeImageModal}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="p-10">
                            <div>
                                <div className="flex justify-center items-center relative w-85 h-80">
                                    <Image src={selectedImage ? selectedImage : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="clicked-image" layout="fill" className="absolute object-cover" />
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TrainerImages;