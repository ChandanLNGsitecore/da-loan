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
import * as termsmodalinput from 'src/components/da-loan/ui/terms-modal-input';
import * as standardtextinput from 'src/components/da-loan/ui/standard-text-input';
import * as standardnumberinput from 'src/components/da-loan/ui/standard-number-input';
import * as southafricanidinput from 'src/components/da-loan/ui/south-african-id-input';
import * as select from 'src/components/da-loan/ui/select';
import * as rangeslider from 'src/components/da-loan/ui/range-slider';
import * as radiogroupwithicon from 'src/components/da-loan/ui/radio-group-with-icon';
import * as radiogroupinput from 'src/components/da-loan/ui/radio-group-input';
import * as incomeinput from 'src/components/da-loan/ui/income-input';
import * as identitydocument from 'src/components/da-loan/ui/identity-document';
import * as fileuploadinput from 'src/components/da-loan/ui/file-upload-input';
import * as dropdownlist from 'src/components/da-loan/ui/drop-down-list';
import * as alert from 'src/components/da-loan/ui/alert';
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
import * as cancelapplication from 'src/components/da-loan/steps/cancel-application';
import * as banking from 'src/components/da-loan/steps/banking';
import * as applicationform from 'src/components/da-loan/steps/application-form';
import * as applicationdetailsform from 'src/components/da-loan/steps/application-details-form';
import * as affordability from 'src/components/da-loan/steps/affordability';
import * as tools from 'src/components/da-loan/layout/tools/tools';
import * as toolsloancalculator from 'src/components/da-loan/layout/tools/loan-calculator/tools-loan-calculator';
import * as toolsconsolidationcalculator from 'src/components/da-loan/layout/tools/consolidation-calculator/tools-consolidation-calculator';
import * as pulse from 'src/components/da-loan/layout/pulse/pulse';
import * as personalloans from 'src/components/da-loan/layout/personal-loans/personal-loans';
import * as navigationmenu from 'src/components/da-loan/layout/navigation-menu/navigation-menu';
import * as makeaplan from 'src/components/da-loan/layout/make-a-plan/make-a-plan';
import * as makeaplanoptionstoconsiderifyouarefeelingfinancialpressure from 'src/components/da-loan/layout/make-a-plan/articles/options-to-consider-if-you-are-feeling-financial-pressure/make-a-plan-options-to-consider-if-you-are-feeling-financial-pressure';
import * as loanuismallalt from 'src/components/da-loan/layout/loan-ui-small-alt/loan-ui-small-alt';
import * as loanui from 'src/components/da-loan/layout/loan-ui/loan-ui';
import * as loanproducts from 'src/components/da-loan/layout/loan-products/loan-products';
import * as loanapplicationflowalt from 'src/components/da-loan/layout/loan-application-flow-alt/loan-application-flow-alt';
import * as loanapplicationflow from 'src/components/da-loan/layout/loan-application-flow/loan-application-flow';
import * as imagine from 'src/components/da-loan/layout/imagine/imagine';
import * as imaginearticlesusingaloantoconsolidateyourcredit from 'src/components/da-loan/layout/imagine/articles/using-a-loan-to-consolidate-your-credit/imagine-articles-using-a-loan-to-consolidate-your-credit';
import * as herocarousel from 'src/components/da-loan/layout/hero-carousel/hero-carousel';
import * as header from 'src/components/da-loan/layout/header/header';
import * as headertop from 'src/components/da-loan/layout/header/header-top';
import * as footer from 'src/components/da-loan/layout/footer/footer';
import * as topicsdata from 'src/components/da-loan/layout/direct-talk/topics-data';
import * as directtalk from 'src/components/da-loan/layout/direct-talk/direct-talk';
import * as articlessingleparentfinances from 'src/components/da-loan/layout/direct-talk/articles/single-parent-finances/articles-single-parent-finances';
import * as consolidationloans from 'src/components/da-loan/layout/consolidation-loans/consolidation-loans';
import * as altslider from 'src/components/da-loan/layout/alt-slider/alt-slider';
import * as statistics from 'src/components/da-loan/blocks/statistics';
import * as staggeredreviews from 'src/components/da-loan/blocks/staggered-reviews';
import * as slidercomponent from 'src/components/da-loan/blocks/slider-component';
import * as pulseblock from 'src/components/da-loan/blocks/pulse-block';
import * as promocard from 'src/components/da-loan/blocks/promo-card';
import * as offerslider from 'src/components/da-loan/blocks/offer-slider';
import * as loansummary from 'src/components/da-loan/blocks/loan-summary';
import * as loanproductsblock from 'src/components/da-loan/blocks/loan-products-block';
import * as loancalculator from 'src/components/da-loan/blocks/loan-calculator';
import * as homearticles from 'src/components/da-loan/blocks/home-articles';
import * as herocarouselfeatured from 'src/components/da-loan/blocks/hero-carousel-featured';
import * as herocarouselblock from 'src/components/da-loan/blocks/hero-carousel-block';
import * as financialcardcarousel from 'src/components/da-loan/blocks/financial-card-carousel';
import * as faqaccordion from 'src/components/da-loan/blocks/faq-accordion';
import * as documentuploadblock from 'src/components/da-loan/blocks/document-upload-block';
import * as consolidationsummary from 'src/components/da-loan/blocks/consolidation-summary';
import * as consolidationcalculator from 'src/components/da-loan/blocks/consolidation-calculator';
import * as consolidationbenefits from 'src/components/da-loan/blocks/consolidation-benefits';
import * as accountselectionform from 'src/components/da-loan/blocks/account-selection-form';
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
  ['terms-modal-input', { ...termsmodalinput, componentType: 'client' }],
  ['standard-text-input', { ...standardtextinput }],
  ['standard-number-input', { ...standardnumberinput }],
  ['south-african-id-input', { ...southafricanidinput }],
  ['select', { ...select, componentType: 'client' }],
  ['range-slider', { ...rangeslider }],
  ['radio-group-with-icon', { ...radiogroupwithicon, componentType: 'client' }],
  ['radio-group-input', { ...radiogroupinput, componentType: 'client' }],
  ['income-input', { ...incomeinput }],
  ['identity-document', { ...identitydocument, componentType: 'client' }],
  ['file-upload-input', { ...fileuploadinput, componentType: 'client' }],
  ['drop-down-list', { ...dropdownlist, componentType: 'client' }],
  ['alert', { ...alert }],
  ['thank-you', { ...thankyou, componentType: 'client' }],
  ['terms-modal', { ...termsmodal, componentType: 'client' }],
  ['residential-address', { ...residentialaddress, componentType: 'client' }],
  ['pulsecard', { ...pulsecard, componentType: 'client' }],
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
  ['cancel-application', { ...cancelapplication, componentType: 'client' }],
  ['banking', { ...banking, componentType: 'client' }],
  ['application-form', { ...applicationform, componentType: 'client' }],
  ['application-details-form', { ...applicationdetailsform, componentType: 'client' }],
  ['affordability', { ...affordability, componentType: 'client' }],
  ['tools', { ...tools }],
  ['tools-loan-calculator', { ...toolsloancalculator }],
  ['tools-consolidation-calculator', { ...toolsconsolidationcalculator }],
  ['pulse', { ...pulse, componentType: 'client' }],
  ['personal-loans', { ...personalloans }],
  ['navigation-menu', { ...navigationmenu, componentType: 'client' }],
  ['make-a-plan', { ...makeaplan }],
  ['make-a-plan-options-to-consider-if-you-are-feeling-financial-pressure', { ...makeaplanoptionstoconsiderifyouarefeelingfinancialpressure }],
  ['loan-ui-small-alt', { ...loanuismallalt }],
  ['loan-ui', { ...loanui }],
  ['loan-products', { ...loanproducts }],
  ['loan-application-flow-alt', { ...loanapplicationflowalt, componentType: 'client' }],
  ['loan-application-flow', { ...loanapplicationflow }],
  ['imagine', { ...imagine }],
  ['imagine-articles-using-a-loan-to-consolidate-your-credit', { ...imaginearticlesusingaloantoconsolidateyourcredit }],
  ['hero-carousel', { ...herocarousel }],
  ['header', { ...header, componentType: 'client' }],
  ['header-top', { ...headertop, componentType: 'client' }],
  ['footer', { ...footer }],
  ['topics-data', { ...topicsdata }],
  ['direct-talk', { ...directtalk }],
  ['articles-single-parent-finances', { ...articlessingleparentfinances }],
  ['consolidation-loans', { ...consolidationloans }],
  ['alt-slider', { ...altslider, componentType: 'client' }],
  ['statistics', { ...statistics, componentType: 'client' }],
  ['staggered-reviews', { ...staggeredreviews, componentType: 'client' }],
  ['slider-component', { ...slidercomponent, componentType: 'client' }],
  ['pulse-block', { ...pulseblock, componentType: 'client' }],
  ['promo-card', { ...promocard }],
  ['offer-slider', { ...offerslider, componentType: 'client' }],
  ['loan-summary', { ...loansummary }],
  ['loan-products-block', { ...loanproductsblock, componentType: 'client' }],
  ['loan-calculator', { ...loancalculator, componentType: 'client' }],
  ['home-articles', { ...homearticles }],
  ['hero-carousel-featured', { ...herocarouselfeatured, componentType: 'client' }],
  ['hero-carousel-block', { ...herocarouselblock, componentType: 'client' }],
  ['financial-card-carousel', { ...financialcardcarousel, componentType: 'client' }],
  ['faq-accordion', { ...faqaccordion, componentType: 'client' }],
  ['document-upload-block', { ...documentuploadblock, componentType: 'client' }],
  ['consolidation-summary', { ...consolidationsummary, componentType: 'client' }],
  ['consolidation-calculator', { ...consolidationcalculator, componentType: 'client' }],
  ['consolidation-benefits', { ...consolidationbenefits }],
  ['account-selection-form', { ...accountselectionform, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
]);

export default componentMap;
