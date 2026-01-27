/**
 * Thank You Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the thank you step
 * of the loan application process. It defines component props and related types used
 * for displaying thank you messages and related content.
 * 
 * @file PulseCard.ts
 * @description Type definitions for Pulse card components and data structures
 * @version 1.0.0
 */

import { ComponentProps } from 'lib/component-props';
import { IPulseCard } from 'src/interfaces/IPulseCard';


/**
 * Component props for the Pulse card component
 * 
 * Extends the base ComponentProps with Pulse card-specific fields from Sitecore CMS.
 * This interface is used to type props passed to Pulse card-related React components,
 * ensuring type safety when working with Sitecore field data.
 * 
 * @interface PulseCardComponentProps
 * @extends ComponentProps
 */
export interface PulseCardComponentProps extends ComponentProps {
  /** 
   * Pulse card fields and content from Sitecore CMS
   * 
   * Contains all field configurations, labels, validation rules, and display content
   * that are managed through Sitecore for the Pulse card.
   */
  fields: IPulseCard;
}