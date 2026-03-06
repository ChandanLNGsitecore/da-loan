"use client";

import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThankYouComponentProps } from "src/types/ThankYou";
import { Text } from "@sitecore-content-sdk/nextjs";


export const Default = (props: ThankYouComponentProps) => {

  const router = useRouter();
  const redirectUrl ="/";

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900"><Text field={props.fields.JourneyStep_Heading} /></h2>
          <p className="text-base text-gray-800">
            <Text field={props.fields.JourneyStep_SubHeading} />
          </p>
        </div>

        <Button
          onClick={() => router.push(redirectUrl)}
          className="w-full text-white py-6 text-base font-medium"
        >
         <Text field={props.fields.SubmitButtonText} />
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

