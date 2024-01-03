import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { LOCAL_BACKEND } from "@/constants/url";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import TrainerImages from "./TrainerImages";

export default function TrainerDetails({ isOpen, onOpenChange, trainerId }) {
    const { data: trainerDetails, loading } = useFetch(`${LOCAL_BACKEND}/trainer/${trainerId}`);
    const trainerImg = trainerDetails?.trainer?.trainerImg;

    const { isOpen: imageModalOpen, onOpen: openImageModal, onClose: closeImageModal } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState(null);

    if (loading) {
        return <div className="min-h-[80vh] flex justify-center items-center">
            <Spinner />
        </div>;
    }

    const { name, age, BMI, height, weight } = trainerDetails?.trainer;

    const handleImageClick = (image) => {
        setSelectedImage(image);
        openImageModal();
    };

    return (
        <>
            <Modal size="lg" className="p-5 h-[500px]" placement="center" isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">Trainer Details</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div>
                                        <p className="text-neutral-900 text-base font-medium">{name}</p>
                                        <p className="text-sm text-neutral-800">Age : {age} years</p>
                                        <p className="text-sm text-neutral-800">Height : {height} cm</p>
                                        <p className="text-sm text-neutral-800">Weight : {weight} kg</p>
                                        <p className="text-sm text-neutral-800">BMI : {BMI}</p>
                                    </div>
                                    <div className="mt-5 text-neutral-800 text-base font-medium">
                                        <h3 className="mb-2">Uploaded images :</h3>
                                        <div className="flex flex-wrap justify-center items-center md:grid md:grid-cols-5 gap-2">
                                            {trainerImg?.map((image, index) => (
                                                <div key={index} className="w-20 h-20 relative" onClick={() => handleImageClick(image)}>
                                                    <Image src={image} alt={`trainer-img-${index}`} layout="fill" className="absolute" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <TrainerImages imageModalOpen={imageModalOpen} selectedImage={selectedImage} closeImageModal={closeImageModal} />
        </>
    );
}
