import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner, Input } from "@nextui-org/react";
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
            <Modal size="lg" className="p-5" placement="center" isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">Trainer Details</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            label="Name"
                                            defaultValue={name}
                                            variant="faded"
                                            isDisabled
                                        />
                                        <Input
                                            label="Age"
                                            defaultValue={`${age} years`}
                                            variant="faded"
                                            isDisabled
                                        />
                                        <Input
                                            // style={{ color: "" }}
                                            color={"primary"}
                                            label="Height"
                                            defaultValue={`${height} cm`}
                                            variant="faded"
                                            isDisabled
                                        />
                                        <Input
                                            label="Weight"
                                            defaultValue={`${weight} kg`}
                                            variant="faded"
                                            isDisabled
                                        />
                                        <Input
                                            label="BMI"
                                            defaultValue={`${BMI} `}
                                            variant="faded"
                                            isDisabled
                                        />
                                    </div>
                                    <div className="mt-5 text-neutral-800 text-base font-medium">
                                        <h3 className="mb-2 font-medium">Uploaded images :</h3>
                                        <div className="flex flex-wrap justify-center items-center md:grid md:grid-cols-5 gap-2 mb-10">
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
