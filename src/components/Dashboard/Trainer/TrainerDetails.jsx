import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  Input,
} from "@nextui-org/react";
import { PROTOCOL_HOST } from "@/constants/url";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import TrainerImages from "./TrainerImages";

export default function TrainerDetails({ isOpen, onOpenChange, trainerId }) {
  const { data: trainerDetails, loading } = useFetch(
    `${PROTOCOL_HOST}/trainer/${trainerId}`
  );
  const trainerImg = trainerDetails?.trainer?.trainerImg;

  const {
    isOpen: imageModalOpen,
    onOpen: openImageModal,
    onClose: closeImageModal,
  } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const { name, age, BMI, height, weight } = trainerDetails?.trainer;

  const handleImageClick = (image) => {
    setSelectedImage(image);
    openImageModal();
  };

  return (
    <>
      <Modal
        size="lg"
        className="p-5"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                Trainer Details
              </ModalHeader>
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
                  <div className="mt-5 text-base font-medium text-neutral-800">
                    <h3 className="mb-2 font-medium">Uploaded images :</h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:grid md:grid-cols-5">
                      {trainerImg?.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20"
                          onClick={() => handleImageClick(image)}
                        >
                          <Image
                            src={image ? image : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={`trainer-img-${index}`}
                            layout="fill"
                            className="absolute"
                          />
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
      <TrainerImages
        imageModalOpen={imageModalOpen}
        selectedImage={selectedImage}
        closeImageModal={closeImageModal}
      />
    </>
  );
}
