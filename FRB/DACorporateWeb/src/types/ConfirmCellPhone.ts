/**
 * Confirm Cell Phone Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the confirm cell phone step
 * of the loan application process, including component props and related types.
 */

import { ComponentProps } from 'lib/component-props';
import { IConfirmCellPhone } from 'src/interfaces/IConfirmCellPhone';

/**
 * Component props for the Confirm Cell Phone form component
 * Extends the base ComponentProps with confirm cell phone specific fields
 */
export interface ConfirmCellPhoneComponentProps extends ComponentProps {
  /** Confirm cell phone form fields from Sitecore CMS */
  fields: IConfirmCellPhone;
}