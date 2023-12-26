import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import Link from "next/link";

const MealPlanCard = ({ mealItem }) => {
  const { name, image } = mealItem;
  return (
    <Card className="rounded-md shadow-md bg-blue-50">
      <CardBody className="overflow-visible">
        <Image
          alt="meal plan"
          className="object-cover rounded-md"
          src={image}
        />
        <h4 className="mt-2 text-lg font-medium text-center text-black/70">
          {name}
        </h4>
      </CardBody>
      <CardFooter className="justify-center">
        <Button radius="full" size="md" color="secondary">
          <Link href={`/meal-plans/${name}`}>More info</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanCard;
