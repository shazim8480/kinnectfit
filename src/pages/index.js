import React from "react";

// landing page components
import Hero from "@/components/Hero/Hero";
import FAQ from "@/components/FAQ/FAQ";
import FeaturedWorkouts from "@/components/FeaturedWorkouts/FeaturedWorkouts";
import Review from "@/components/Review/Review";
import FeatureMealPlans from "@/components/FeatureMealPlans/FeatureMealPlans";

// layout
import MainLayout from "@/layouts/mainLayout";
import DownloadApp from "@/components/DownloadApp/DownloadApp";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <FeaturedWorkouts />
      <FeatureMealPlans />
      <Review />
      <DownloadApp />
      <FAQ />
    </section>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
