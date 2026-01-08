"use client";

import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { ChevronRight } from "lucide-react";

interface ThankYouProps {
	readonly onContinue: () => void;
}

export const Default = ({ onContinue }: Readonly<ThankYouProps>) => {
  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Thank You.</h2>
          <p className="text-base text-gray-800">
            Your bank will message you shortly and you&apos;ll be able to follow
            their simple prompts.
          </p>
        </div>

        <Button
          onClick={onContinue}
          className="w-full text-white py-6 text-base font-medium"
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

