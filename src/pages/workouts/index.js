import MainLayout from "@/layouts/mainLayout";

const Workouts = () => {
  return <div>Workouts</div>;
};

export default Workouts;

Workouts.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
