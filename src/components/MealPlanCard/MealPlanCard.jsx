import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import Link from "next/link";

const MealPlanCard = ({ mealItem }) => {
  const { mealPlan_name, mealPlan_cover_img, mealPlan_id } = mealItem;
  console.log("mealItem", mealItem);
  return (
    <Card className="rounded-md shadow-md bg-blue-50">
      <CardBody className="overflow-visible">
        <Image
          alt="meal plan"
          className="object-cover rounded-md"
          src={mealPlan_cover_img ? mealPlan_cover_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        />
        <h4 className="mt-2 text-lg font-medium text-center text-black/70">
          {mealPlan_name}
        </h4>
      </CardBody>
      <CardFooter className="justify-center">
        <Button radius="full" size="md" color="secondary">
          <Link href={`/meal-plans/${mealPlan_id}`}>More info</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanCard;
