"use client";


import {
    TextField,
    Text as ContentSdkText,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";


export type HeaderTopProps = ComponentProps & {
    fields: {
        HelpText?: TextField;
        PhoneNumber?: TextField;
        HoursOfOperation?: TextField;
        DirectNumberLabel?: TextField;
    };
};

export const Default = (props: HeaderTopProps) => {
    const fields = props.fields;

    return (

        <div className="bg-primary text-white">
            <div className="container mx-auto px-4 py-2 lg:px-8">
                <div className="flex items-center justify-center h-12 font-medium gap-8">
                    <span><ContentSdkText field={fields.HelpText} /> <a href={`tel:${fields.PhoneNumber?.value}`} className="font-bold underline"><ContentSdkText field={fields.PhoneNumber} /> </a></span>
                    <span className="hidden md:inline">|</span>
                    <span className="hidden md:inline"><ContentSdkText field={fields.HoursOfOperation} /></span>
                    <span className="hidden md:inline">|</span>
                    <span className="hidden md:inline"><ContentSdkText field={fields.DirectNumberLabel} /></span>
                </div>
            </div>
        </div>
    );
};