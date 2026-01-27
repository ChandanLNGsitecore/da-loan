// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Navigation from 'src/components/navigation/Navigation';
import * as upload from 'src/components/da-loan/ui-premetive/upload';
import * as carousel from 'src/components/da-loan/ui-premetive/carousel';
import * as radiogroupwithicon from 'src/components/da-loan/ui/radio-group-with-icon';
import * as radiogroupinput from 'src/components/da-loan/ui/radio-group-input';
import * as identitydocument from 'src/components/da-loan/ui/identity-document';
import * as fileuploadinput from 'src/components/da-loan/ui/file-upload-input';
import * as dropdownlist from 'src/components/da-loan/ui/drop-down-list';
import * as thankyou from 'src/components/da-loan/steps/thank-you';
import * as termsmodal from 'src/components/da-loan/steps/terms-modal';
import * as residentialaddress from 'src/components/da-loan/steps/residential-address';
import * as pulsecard from 'src/components/da-loan/steps/pulsecard';
import * as otpverification from 'src/components/da-loan/steps/otp-verification';
import * as OfferForm from 'src/components/da-loan/steps/OfferForm';
import * as loanreview from 'src/components/da-loan/steps/loan-review';
import * as loanpurpose from 'src/components/da-loan/steps/loan-purpose';
import * as livingarrangements from 'src/components/da-loan/steps/living-arrangements';
import * as employment from 'src/components/da-loan/steps/employment';
import * as documentupload from 'src/components/da-loan/steps/document-upload';
import * as creditcheck from 'src/components/da-loan/steps/credit-check';
import * as confirmation from 'src/components/da-loan/steps/confirmation';
import * as cellphoneconfirmation from 'src/components/da-loan/steps/cellphone-confirmation';
import * as banking from 'src/components/da-loan/steps/banking';
import * as applicationform from 'src/components/da-loan/steps/application-form';
import * as affordability from 'src/components/da-loan/steps/affordability';
import * as pulse from 'src/components/da-loan/layout/pulse';
import * as navigationmenu from 'src/components/da-loan/layout/navigation-menu';
import * as header from 'src/components/da-loan/layout/header';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Navigation', { ...Navigation }],
  ['upload', { ...upload }],
  ['carousel', { ...carousel }],
  ['radio-group-with-icon', { ...radiogroupwithicon }],
  ['radio-group-input', { ...radiogroupinput }],
  ['identity-document', { ...identitydocument }],
  ['file-upload-input', { ...fileuploadinput }],
  ['drop-down-list', { ...dropdownlist }],
  ['thank-you', { ...thankyou }],
  ['terms-modal', { ...termsmodal }],
  ['residential-address', { ...residentialaddress }],
  ['pulsecard', { ...pulsecard }],
  ['otp-verification', { ...otpverification }],
  ['OfferForm', { ...OfferForm }],
  ['loan-review', { ...loanreview }],
  ['loan-purpose', { ...loanpurpose }],
  ['living-arrangements', { ...livingarrangements }],
  ['employment', { ...employment }],
  ['document-upload', { ...documentupload }],
  ['credit-check', { ...creditcheck }],
  ['confirmation', { ...confirmation }],
  ['cellphone-confirmation', { ...cellphoneconfirmation }],
  ['banking', { ...banking }],
  ['application-form', { ...applicationform }],
  ['affordability', { ...affordability }],
  ['pulse', { ...pulse }],
  ['navigation-menu', { ...navigationmenu }],
  ['header', { ...header }],
]);

export default componentMap;
