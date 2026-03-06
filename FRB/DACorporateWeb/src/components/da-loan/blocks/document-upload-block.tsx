"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "components/da-loan/ui-primitive/button";
import { ArrowRight, Upload, UploadCloud } from "lucide-react";

export function DocumentUploadBlock() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16 space-y-16 md:space-y-32 bg-secondary-blue/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-0  max-w-[1500px] mx-auto items-center">
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">Need to Upload Documents?</h2>
          <p className="text-base md:text-lg  mb-6 lg:mb-8">
          If you&apos;re part way through a loan application, but still need to send us documentaiton like payslips, proof of residence or identify docs - you can do it here!
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button>
                <Upload className="" />
                Upload on this website
              </Button>
              <Button
              variant="outline"
              >
                <UploadCloud className="w-4 h-4" />
                Upload by WhatsApp
              </Button>
            </div>
            <div className="mt-8">
              <Link href="/loan-application/document-upload" className="flex gap-2 items-center">
              Show me how to upload Documents
              <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8 rounded-2xl bg-white shadow-lg">
          <Image src="/images/document-upload.png" alt="Document Upload" className="w-full h-full object-cover" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}