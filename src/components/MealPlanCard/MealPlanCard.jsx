
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import Link from "next/link";

const MealPlanCard = ({ mealItem }) => {
  const { mealPlan_name, mealPlan_cover, id } = mealItem;
  return (
    <Card className="rounded-md shadow-md bg-blue-50">
      <Image
        alt="meal plan"
        className="object-fit rounded-md w-full h-[300px] "
        src={mealPlan_cover[0]}
        layout='fill'
      />
      <CardBody className="relative">
        <h4 className="mt-2 text-lg font-medium text-center text-black/70">
          {mealPlan_name}
        </h4>
      </CardBody>
      <CardFooter className="justify-center">
        <Button radius="full" size="md" color="secondary">
          <Link href="/meal-plans/[mealPlanId]" as={`/meal-plans/${id}`}>
            More info
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanCard;
