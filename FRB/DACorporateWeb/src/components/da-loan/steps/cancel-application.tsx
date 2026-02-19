"use client";

import Link from "next/link";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { useRouter } from "next/navigation";
import { ComponentProps } from "lib/component-props";
import {
    Text as ContentSdkText,
    RichTextField,
    TextField,
    RichText as ContentSdkRichText,
} from "@sitecore-content-sdk/nextjs";

export type CancelApplicationProps = ComponentProps & {
    fields: {
        Heading: TextField;
        BackButtonText: TextField;
        CancelButtonText: TextField;
        Text: RichTextField;
    };
    readonly onBack?: () => void;
};

export const Default = (props: CancelApplicationProps) => {
   const router = useRouter();
    const { onBack } = props;

    const handleBack = () => {
        if (onBack && typeof onBack === "function") {
            onBack();
        } else {
            router.back();
        }
    };
    return (
        <Card className="w-full mx-auto bg-white">
            <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        <ContentSdkText field={props.fields.Heading} />
                    </h2>
                    <p className="text-sm text-gray-600">
                        <ContentSdkRichText field={props.fields.Text} />
                    </p>
                </div>

                <div className="space-y-3">
                    <Button onClick={handleBack} variant="outline" className="w-full py-6">
                        <ContentSdkText field={props.fields.BackButtonText} />
                    </Button>
                    <Link href="/" className="block">
                        <Button variant="default" className="w-full py-6 border-gray-300">
                            <ContentSdkText field={props.fields.CancelButtonText} />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};