/**
 * Credit Check Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the credit check step
 * of the loan application process, including component props and related types.
 */

import { ComponentProps } from 'lib/component-props';
import { ICreditCheck } from 'src/interfaces/ICreditCheck';

/**
 * Component props for the Credit Check form component
 * Extends the base ComponentProps with credit check specific fields
 */
export interface CreditCheckComponentProps extends ComponentProps {
  /** Credit check form fields from Sitecore CMS */
  fields: ICreditCheck;
}