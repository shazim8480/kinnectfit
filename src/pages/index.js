import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { KFButton } from "@/components/KFButton";
import { KFInput } from "@/components/KFInput";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <KFButton color="primary" variant="shadow">
        button
      </KFButton>
      <KFInput />
      <Input />
    </main>
  );
}
