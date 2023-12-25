import { Card, CardBody, Image } from "@nextui-org/react";

const RecommendedPlanCard = ({ mealItem }) => {
  const { name, image, description } = mealItem;
  return (
    <Card className="h-[380px] rounded-md " shadow="md" key={name}>
      <CardBody className="overflow-visible p-5 ">
        <Image
          removeWrapper
          shadow="sm"
          radius="md"
          width="100%"
          alt={name}
          className="w-full object-cover h-[180px] md:h-[200px]"
          src={image}
        />
        <div className="mt-5">
          <span className="sm:text-lg font-bold">{name}</span>
          <p className="text-[#666] mt-1 text-sm lg:text-base">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default RecommendedPlanCard;
