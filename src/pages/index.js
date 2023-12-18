import React from "react";

// landing page components
import Hero from "@/components/Hero/Hero";
import FAQ from "@/components/FAQ/FAQ";
import FeaturedWorkouts from "@/components/FeaturedWorkouts/FeaturedWorkouts";

// layout
import MainLayout from "@/layouts/mainLayout";
import Review from "@/components/Review/Review";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <Review />
      <FeaturedWorkouts />
      <FAQ />
    </section>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
