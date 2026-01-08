/**
 * Affordability Assessment Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the affordability assessment step
 * of the loan application process. It defines component props and related types used
 * for calculating and displaying customer affordability metrics.
 * 
 * @file Affordability.ts
 * @description Type definitions for affordability assessment components and data structures
 * @version 1.0.0
 */

import { ComponentProps } from 'lib/component-props';
import { IAffordability } from 'src/interfaces/IAffordability';

/**
 * Component props for the Affordability Assessment form component
 * 
 * Extends the base ComponentProps with affordability-specific fields from Sitecore CMS.
 * This interface is used to type props passed to affordability-related React components,
 * ensuring type safety when working with Sitecore field data.
 * 
 * @interface AffordabilityComponentProps
 * @extends ComponentProps
 */
export interface AffordabilityComponentProps extends ComponentProps {
  /** 
   * Affordability assessment form fields and content from Sitecore CMS
   * 
   * Contains all field configurations, labels, validation rules, and display content
   * that are managed through Sitecore for the affordability assessment step.
   * This includes income fields, expense inputs, and calculation display options.
   */
  fields: IAffordability;
}