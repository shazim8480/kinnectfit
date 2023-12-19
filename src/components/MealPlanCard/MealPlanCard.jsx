import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";

const MealPlanCard = ({ mealItem }) => {
  const { name, image } = mealItem;
  return (
    <Card className="py-4">
      <CardBody className="overflow-visible py-2">
        <Image
          alt="meal plan"
          className="object-cover rounded-xl"
          src={image}
        />
        <h4 className="text-xl font-medium text-black/90 text-center my-2">
          {name}
        </h4>
      </CardBody>
      <CardFooter className="justify-center">
        <Button radius="full" size="md" color="primary">
          More info
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanCard;
