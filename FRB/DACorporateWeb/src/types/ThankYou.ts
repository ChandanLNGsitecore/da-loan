/**
 * Thank You Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the thank you step
 * of the loan application process. It defines component props and related types used
 * for displaying thank you messages and related content.
 * 
 * @file ThankYou.ts
 * @description Type definitions for thank you components and data structures
 * @version 1.0.0
 */

import { ComponentProps } from 'lib/component-props';
import { IThankYou } from 'src/interfaces/IThankYou';

/**
 * Component props for the Thank You form component
 * 
 * Extends the base ComponentProps with thank you-specific fields from Sitecore CMS.
 * This interface is used to type props passed to thank you-related React components,
 * ensuring type safety when working with Sitecore field data.
 * 
 * @interface ThankYouComponentProps
 * @extends ComponentProps
 */
export interface ThankYouComponentProps extends ComponentProps {
  /** 
   * Thank you form fields and content from Sitecore CMS
   * 
   * Contains all field configurations, labels, validation rules, and display content
   * that are managed through Sitecore for the thank you step.
   */
  fields: IThankYou;
}