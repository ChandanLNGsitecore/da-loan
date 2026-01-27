/**
 * Offer Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the thank you step
 * of the loan application process. It defines component props and related types used
 * for displaying thank you messages and related content.
 * 
 * @file Offer.ts
 * @description Type definitions for offer components and data structures
 * @version 1.0.0
 */

import { ComponentProps } from 'lib/component-props';
import { IOffer } from 'src/interfaces/IOffer';



/**
 * Component props for the Offer form component
 * 
 * Extends the base ComponentProps with offer-specific fields from Sitecore CMS.
 * This interface is used to type props passed to offer-related React components,
 * ensuring type safety when working with Sitecore field data.
 * 
 * @interface OfferComponentProps
 * @extends ComponentProps
 */
export interface OfferComponentProps extends ComponentProps {
  /** 
   * Offer form fields and content from Sitecore CMS
   * 
   * Contains all field configurations, labels, validation rules, and display content
   * that are managed through Sitecore for the offer step.
   */
  fields: IOffer;
  /**
   * Component map for rendering nested Sitecore components
   * Passed from parent to avoid circular dependency
   */
  componentMap?: Map<string, React.ComponentType<unknown>>;
}