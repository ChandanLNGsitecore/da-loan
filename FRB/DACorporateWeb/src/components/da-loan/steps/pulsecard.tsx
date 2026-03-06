"use client";

import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { ArrowRight } from "lucide-react";
import { PulseCardComponentProps } from "src/types/PulseCard";
import { Text, Link as ContentSdkLink, RichText as ContentSdkRichText } from "@sitecore-content-sdk/nextjs";



export const Default = (props: PulseCardComponentProps) => {

  return (
    <Card className="bg-blue-50 border-green-300 mt-24">
    	<CardContent className="p-4 space-y-3">
							<div className="flex items-start gap-2">
								<div className="space-y-2">
									<h3 className="font-semibold text-gray-900"><Text field={props.fields.Title} /></h3>
									<p className="text-sm text-gray-700">
										<ContentSdkRichText field={props.fields.Description} />
									</p>
								</div>
							</div>
							<Button asChild variant="outline" className="w-full hover:bg-gray-50 border-green-900 text-green-700 hover:text-primary font-medium shadow-none">
								
									<ContentSdkLink field={props.fields.Link}>
                   { props.fields.Link.value?.text }

										
										<ArrowRight className="w-4 h-4" />
									</ContentSdkLink>
							</Button>
						</CardContent>
            </Card>
  );
};

