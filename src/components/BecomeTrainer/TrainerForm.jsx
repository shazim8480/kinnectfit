import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { KFInput } from "../UI/KFInput";
import { useForm } from "react-hook-form";
import { KFButton } from "../UI/KFButton";
import { useSelector } from "react-redux";
import { calculateBmi } from "@/lib/getBMI";
import Image from "next/image";

import { CldUploadButton, CldImage } from "next-cloudinary";
import { useAddTrainerMutation } from "@/redux/feature/trainer/trainer-api";
import { useRouter } from "next/navigation";

const TrainerForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  //   add trainer query //
  const [addTrainer] = useAddTrainerMutation();

  const [weightValue, setWeightValue] = useState(null);

  const [heightValue, setHeightValue] = useState(null);

  const handleHeightChange = (e) => {
    setHeightValue(e.target.value);
  };
  const handleWeightChange = (e) => {
    setWeightValue(e.target.value);
  };

  const calculatedBmi = calculateBmi(heightValue, weightValue);
  // console.log("🚀 ~ file: TrainerForm.jsx:16 ~ TrainerForm ~ bmi:", bmi);
  //   console.log(typeof bmi);

  const userProfile = useSelector((state) => state.user);
  // console.log("🚀 ~ userProfile:", userProfile);
  const accessToken = userProfile?.user?.accessToken;

  //   file upload section
  const [files, setFiles] = useState([]);
  //   console.log("🚀 ~ file: TrainerForm.jsx:40 ~ TrainerForm ~ files:", files);

  const addFile = (newFile) => {
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
  };

  //   const handleFileChange = (e) => {
  //     // this gives us the data on what files are selected
  //     // however, it's of type `FileList` which is hard to modify.
  //     const fileList = e.target.files;
  //     // let's convert `FileList` into a `File[]`
  //     if (fileList) {
  //       const files = [...fileList];
  //       setFiles(files);
  //     }
  //   };

  // transform files into data urls
  //   const imageUrls = files?.map((file) => URL.createObjectURL(file));
  //   console.log(
  //     "🚀 ~ file: TrainerForm.jsx:55 ~ TrainerForm ~ imageUrls:",
  //     imageUrls
  //   );

  useEffect(() => {
    resetField("bmi");
    if (calculatedBmi) {
      setValue("bmi", calculatedBmi.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [calculatedBmi]);

  const onSubmit = async (data) => {
    console.log("form data", data);
    // return;
    if (Object.keys(errors).length === 0) {
      const trainerDataObj = {
        user: userProfile?.user?.user?.id,
        age: data.age,
        height: data.height,
        weight: data.weight,
        bmi: data.bmi,
        // status: "pending",
        images: files,
      };
      let addTrainerResponse = await addTrainer({ data: trainerDataObj, accessToken });
      console.log("trainer submission ready data ===>", addTrainerResponse);
      if (addTrainerResponse?.data?.statusCode === 200) {
        router.push("/dashboard/health-summary");
      }
      else {
        alert(addTrainerResponse?.error?.data?.message);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        action="#"
        method="POST"
      >
        <section className="grid justify-center grid-cols-1 gap-8 my-10 place-content-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {/* Name */}
          <div>
            <div className="mt-4 text-sm font-medium text-left">
              <label>Trainer Name</label>
            </div>
            <KFInput
              id="name"
              name="name"
              label="name"
              placeholder={userProfile?.user?.user?.name}
              isDisabled
              variant="faded"
              size="xl"
              className="mt-3"
            />
          </div>

          {/* Email */}
          <div>
            <div className="mt-4 text-sm font-medium text-left">
              <label>Trainer Email</label>
            </div>
            <KFInput
              id="email"
              name="email"
              label="email"
              placeholder={userProfile?.user?.user?.email}
              isDisabled
              variant="faded"
              size="xl"
              className="mt-3"
            />
          </div>

          {/* Age */}
          <div>
            <div className="mt-4 text-sm font-medium text-left">
              <label>Enter your Age</label>
            </div>
            <KFInput
              id="age"
              name="age"
              required
              label="age"
              placeholder="Age"
              variant="bordered"
              size="xl"
              className="mt-3"
              {...register("age", {
                required: "Please select your age",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Please enter age in digit.",
                },
              })}
            />
            {errors.age && (
              <p className="mt-1 text-left text-red-500">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* height */}
          <div>
            <div className="mt-5 mb-2 text-sm font-medium text-left">
              <label>Enter your Height (cm)</label>
            </div>

            <KFInput
              id="height"
              name="height"
              required
              label="height"
              variant="bordered"
              size="xl"
              placeholder="cm"
              {...register("height", {
                onChange: (e) => handleHeightChange(e),
                required: "Please enter your height",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Please enter height in digit.",
                },
              })}
            />
            {errors.height && (
              <p className="mt-1 text-left text-red-500">
                {errors.height.message}
              </p>
            )}
          </div>

          {/* weight */}
          <div>
            <div className="flex items-center justify-between">
              <div className="mt-4 text-sm font-medium text-left">
                <label>Enter your Weight (kg)</label>
              </div>
            </div>
            <KFInput
              id="weight"
              name="weight"
              required
              label="weight"
              variant="bordered"
              size="xl"
              placeholder={"kg"}
              className="mt-2"
              {...register("weight", {
                onChange: (e) => handleWeightChange(e),
                required: "Please enter your weight",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Please enter weight in digit.",
                },
              })}
            />
            {errors.weight && (
              <p className="mt-1 text-left text-red-500">
                {errors.weight.message}
              </p>
            )}
          </div>

          {/* calculate BMI */}
          <div>
            <div className="flex items-center justify-between">
              <div className="mt-4 text-sm font-medium text-left">
                <label>BMI Calculation</label>
              </div>
            </div>
            <KFInput
              id="bmi"
              name="bmi"
              label="bmi"
              variant="faded"
              isReadOnly
              placeholder={calculatedBmi ? calculatedBmi.toFixed(2) : null}
              size="xl"
              className="mt-2"
              {...register("bmi", {
                pattern: {
                  value: /^18\.5|19(?:\.\d)?|2[0-3](?:\.\d)?|24\.[0-9]$/,
                  message: "BMI Range should be between 18.5 to 24.9",
                },
              })}
            />
            {errors.bmi && (
              <p className="mt-1 text-left text-red-500">
                {errors.bmi.message}
              </p>
            )}
          </div>

          {/* Upload Images */}
          <div className="col-span-2">
            <label
              htmlFor="cover-photo"
              className="block mt-4 text-sm font-medium leading-6 text-gray-900"
            >
              Upload Images
            </label>
            <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
              <div className="text-center">
                <PhotoIcon
                  className="w-12 h-12 mx-auto text-gray-300"
                  aria-hidden="true"
                />
                <div className="h-[20px] my-4 text-sm leading-6">
                  <label
                    htmlFor="file_upload"
                    className="font-semibold text-center text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <CldUploadButton
                      onUpload={(results) => {
                        if (results) {
                          const fileList = results?.info?.secure_url;
                          addFile(fileList);
                        }
                      }}
                      uploadPreset="kinnectfit_app"
                    />
                  </label>
                  {/* Delete */}
                  {/* {files?.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setFiles([])}
                      className="ml-[20px] font-semibold text-center text-red-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                    >
                      Clear
                    </button>
                  ) : null} */}
                </div>
                <p className="relative mb-5 text-xs leading-5 text-gray-600">
                  PNG, JPG up to 10MB
                </p>
                {/* show uploaded images */}
                {files ? (
                  <div className="relative flex items-center justify-center">
                    {files?.map((file, i) => {
                      //   console.log("showing file", file);
                      return (
                        <CldImage
                          key={i}
                          className="mr-5"
                          width="140"
                          height="80"
                          src={file}
                          alt="trainer_img"
                        />
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* submit registration */}
        <div className="pt-6 mx-auto space-y-4 text-center">
          <KFButton size="lg" type="submit">
            Register
          </KFButton>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;
