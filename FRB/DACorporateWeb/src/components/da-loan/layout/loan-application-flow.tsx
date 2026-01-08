import { Check, Save } from "lucide-react";
import React, { JSX } from 'react';
import {
  Link as ContentSdkLink,
  Text,
  RichText as ContentSdkRichText,
  Field,
  LinkField,
  TextField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import componentMap from ".sitecore/component-map";

interface Fields {
  Heading?: TextField;
  Feature1?: TextField;
  Feature2?: TextField;
  Bodytext?: RichTextField;
  ResumePrompt?: TextField;
  ResumeLink: LinkField;
  ResumeLinkText?: TextField;
}

type LoanApplicationProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: LoanApplicationProps): JSX.Element => {
  const { fields } = props;

  if (!fields) {
    return (
      <span className="is-empty-hint">No Fields Found</span>
    );
  }
  return (
    <section className="bg-primary pt-8 md:pt-32">
      <div className="min-h-screen py-8 px-4 max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8">
        <section>
          <div className="w-full mx-auto  text-white p-4 md:p-8 rounded-lg flex flex-col items-center gap-8 flex-wrap md:flex-nowrap">
            <h2 className="text-4xl font-medium text-white font-heading text-center">
              <Text field={fields.Heading} />
            </h2>
            <div className="flex items-center gap-4 text-sm justify-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span><Text field={fields.Feature1} /></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span><Text field={fields.Feature2} /></span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-yellow-50 p-4 rounded-lg mt-4 border border-yellow-200 md:w-100 w-full">
              <Save className="w-10 h-auto text-gray-600" />
              <p className="text-sm text-gray-800">
                <ContentSdkRichText field={fields.Bodytext} />
              </p>
            </div>
            <div className="text-center text-sm text-white">
              <Text field={fields.ResumePrompt} />{" "}
              <ContentSdkLink field={fields.ResumeLink}>
                <Text field={fields.ResumeLinkText} />
              </ContentSdkLink>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full mx-auto">
            <AppPlaceholder
              name="headless-loan-app-form"
              rendering={props.rendering}
              page={props.page}
              componentMap={componentMap}
            />
          </div>
        </section>
      </div>
    </section>
  );
};
