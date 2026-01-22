"use client";

import Link from "next/link";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { CheckCircle2, Clock, FileCheck, Phone, Mail, Home } from "lucide-react";
import { type UploadedDocuments } from "./document-upload";
import { ThankYouComponentProps } from "src/types/ThankYou";
import { useRouter } from "next/navigation";
import { ApplicationSubmitComponentProps } from "src/types/ApplicationSubmit";
import {
  Link as ContentSdkLink,
  Text,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';



export const Default = (props: ApplicationSubmitComponentProps) => {

  const applicationrefrence="DA4N528U4QQ";

  const formatAmount = (amount: number) => {
    return `R${amount.toLocaleString("en-ZA").replace(/,/g, " ")}`;
  };

   const router = useRouter();

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
             <Text field={props.fields.JourneyStep_Heading} />
            </h2>
            <p className="text-sm text-gray-600">
         <Text field={props.fields.JourneyStep_SubHeading} />
            </p>
            <p className="text-sm text-gray-600 text-center pt-4">
               <Text field={props.fields.EmailConfirmationTxt} />
            </p>
          </div>
        </div>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">    <Text field={props.fields.ApplicationRefreneceTxt} /></p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                {applicationrefrence}
                </p>
              </div>
             
                <div className="text-right">
                  <p className="text-xs text-gray-600"> <Text field={props.fields.LoanAmountTxt} /></p>
                  <p className="text-lg font-bold text-[#2c5f5d] mt-1">
                    {formatAmount(2000)}
                  </p>
                </div>
              
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            <Text field={props.fields.NextSectionTitle} />
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="rounded-full bg-blue-100 p-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  <Text field={props.fields.DocumentVerificationTitle} />
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <Text field={props.fields.DocumentVerificationSubTitle} />
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="rounded-full bg-secondary-light-blue/30 p-2">
                  <Phone className="w-5 h-5 text-secondary-blue" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                   <Text field={props.fields.AffordabilityAssessmentTitle} />
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <Text field={props.fields.AffordabilityAssessmentSubTitle} />
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  <Text field={props.fields.FinalDecisionTitle} />
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <Text field={props.fields.FinalDecisionSubtitle} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  Expected Timeline
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Most applications are processed within{" "}
                  <span className="font-semibold">2-3 business days</span>.
                  You&apos;ll receive regular updates via SMS and email.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800"> <Text field={props.fields.NeedHelptxt} /></h3>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-gray-600"><Text field={props.fields.CallUsTxt} /></span>
                <Link
                  href="tel:0860345678"
                  className="text-[#2c5f5d] font-medium hover:underline"
                >
                  <Text field={props.fields.CallUsNumber} />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-gray-600"><Text field={props.fields.EmailTxt} /></span>
                <Link
                  href="mailto:info@directaxis.co.za"
                  className="text-[#2c5f5d] font-medium hover:underline"
                >
                 <Text field={props.fields.EmailID} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Link href="/" className="block">
            <Button variant="default" className="w-full py-6 border-gray-300">
              <Home className="w-4 h-4 mr-2" />
              <Text field={props.fields.SubmitButtonText} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
