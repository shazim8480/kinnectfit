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
                                    <Image src={selectedImage} alt="clicked-image" layout="fill" className="absolute object-cover" />
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