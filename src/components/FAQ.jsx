import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is KinnectFit?",
    answer:
      "KinnectFit is a comprehensive fitness app designed to help you achieve your health and wellness goals. We offer a user-friendly interface, compelling features, and personalized guidance to track your progress, stay motivated, and reach your full potential",
  },
  {
    question: "How does the Activity Tracking work?",
    answer:
      "You can easily log your meals, exercise routines, and other physical activities in the KinnectFit database. Track your progress over time and gain valuable insights into your fitness journey",
  },
  {
    question: "What does the Nutritional Database offer?",
    answer:
      "Our extensive Nutritional Database provides detailed information on various foods and beverages, including calories, macronutrients, and micronutrients. Make informed choices and optimize your diet for better results.",
  },
  {
    question: "What kind of Workout Plans are available?",
    answer:
      "KinnectFit offers pre-built workout plans for a variety of fitness goals, including weight loss, muscle gain, and specific body sculpting. You can also personalize existing plans or create your own custom routines.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-4xl mx-auto divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="flex items-center ml-6 h-7">
                          {open ? (
                            <MinusSmallIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="pr-12 mt-2">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
