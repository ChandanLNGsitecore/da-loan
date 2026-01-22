// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as upload from 'src/components/da-loan/ui-premetive/upload';
import * as tooltip from 'src/components/da-loan/ui-premetive/tooltip';
import * as timer from 'src/components/da-loan/ui-premetive/timer';
import * as sonner from 'src/components/da-loan/ui-premetive/sonner';
import * as slider from 'src/components/da-loan/ui-premetive/slider';
import * as sheet from 'src/components/da-loan/ui-premetive/sheet';
import * as select from 'src/components/da-loan/ui-premetive/select';
import * as scrollarea from 'src/components/da-loan/ui-premetive/scroll-area';
import * as radiogroup from 'src/components/da-loan/ui-premetive/radio-group';
import * as progress from 'src/components/da-loan/ui-premetive/progress';
import * as logo from 'src/components/da-loan/ui-premetive/logo';
import * as label from 'src/components/da-loan/ui-premetive/label';
import * as input from 'src/components/da-loan/ui-premetive/input';
import * as dropdownmenu from 'src/components/da-loan/ui-premetive/dropdown-menu';
import * as dialog from 'src/components/da-loan/ui-premetive/dialog';
import * as checkbox from 'src/components/da-loan/ui-premetive/checkbox';
import * as carousel from 'src/components/da-loan/ui-premetive/carousel';
import * as card from 'src/components/da-loan/ui-premetive/card';
import * as button from 'src/components/da-loan/ui-premetive/button';
import * as standardtextinput from 'src/components/da-loan/ui/standard-text-input';
import * as standardnumberinput from 'src/components/da-loan/ui/standard-number-input';
import * as southafricanidinput from 'src/components/da-loan/ui/south-african-id-input';
import * as rangeslider from 'src/components/da-loan/ui/range-slider';
import * as radiogroupwithicon from 'src/components/da-loan/ui/radio-group-with-icon';
import * as radiogroupinput from 'src/components/da-loan/ui/radio-group-input';
import * as incomeinput from 'src/components/da-loan/ui/income-input';
import * as identitydocument from 'src/components/da-loan/ui/identity-document';
import * as fileuploadinput from 'src/components/da-loan/ui/file-upload-input';
import * as dropdownlist from 'src/components/da-loan/ui/drop-down-list';
import * as thankyou from 'src/components/da-loan/steps/thank-you';
import * as termsmodal from 'src/components/da-loan/steps/terms-modal';
import * as residentialaddress from 'src/components/da-loan/steps/residential-address';
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
import * as loanproducts from 'src/components/da-loan/layout/loan-products';
import * as loanapplicationflow from 'src/components/da-loan/layout/loan-application-flow';
import * as herocarousel from 'src/components/da-loan/layout/hero-carousel';
import * as header from 'src/components/da-loan/layout/header';
import * as footer from 'src/components/da-loan/layout/footer';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['upload', { ...upload, componentType: 'client' }],
  ['tooltip', { ...tooltip }],
  ['timer', { ...timer }],
  ['sonner', { ...sonner }],
  ['slider', { ...slider }],
  ['sheet', { ...sheet }],
  ['select', { ...select }],
  ['scroll-area', { ...scrollarea }],
  ['radio-group', { ...radiogroup }],
  ['progress', { ...progress }],
  ['logo', { ...logo }],
  ['label', { ...label }],
  ['input', { ...input }],
  ['dropdown-menu', { ...dropdownmenu }],
  ['dialog', { ...dialog }],
  ['checkbox', { ...checkbox }],
  ['carousel', { ...carousel, componentType: 'client' }],
  ['card', { ...card }],
  ['button', { ...button }],
  ['standard-text-input', { ...standardtextinput }],
  ['standard-number-input', { ...standardnumberinput }],
  ['south-african-id-input', { ...southafricanidinput }],
  ['range-slider', { ...rangeslider }],
  ['radio-group-with-icon', { ...radiogroupwithicon, componentType: 'client' }],
  ['radio-group-input', { ...radiogroupinput, componentType: 'client' }],
  ['income-input', { ...incomeinput }],
  ['identity-document', { ...identitydocument, componentType: 'client' }],
  ['file-upload-input', { ...fileuploadinput, componentType: 'client' }],
  ['drop-down-list', { ...dropdownlist, componentType: 'client' }],
  ['thank-you', { ...thankyou, componentType: 'client' }],
  ['terms-modal', { ...termsmodal, componentType: 'client' }],
  ['residential-address', { ...residentialaddress, componentType: 'client' }],
  ['otp-verification', { ...otpverification, componentType: 'client' }],
  ['OfferForm', { ...OfferForm, componentType: 'client' }],
  ['loan-review', { ...loanreview, componentType: 'client' }],
  ['loan-purpose', { ...loanpurpose, componentType: 'client' }],
  ['living-arrangements', { ...livingarrangements, componentType: 'client' }],
  ['employment', { ...employment, componentType: 'client' }],
  ['document-upload', { ...documentupload, componentType: 'client' }],
  ['credit-check', { ...creditcheck, componentType: 'client' }],
  ['confirmation', { ...confirmation, componentType: 'client' }],
  ['cellphone-confirmation', { ...cellphoneconfirmation, componentType: 'client' }],
  ['banking', { ...banking, componentType: 'client' }],
  ['application-form', { ...applicationform, componentType: 'client' }],
  ['affordability', { ...affordability, componentType: 'client' }],
  ['pulse', { ...pulse, componentType: 'client' }],
  ['navigation-menu', { ...navigationmenu, componentType: 'client' }],
  ['loan-products', { ...loanproducts }],
  ['loan-application-flow', { ...loanapplicationflow }],
  ['hero-carousel', { ...herocarousel }],
  ['header', { ...header, componentType: 'client' }],
  ['footer', { ...footer }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
]);

export default componentMap;
