/**
 * Send OTP Types for DirectAxis Loan Application
 * 
 * This file contains TypeScript type definitions for the send OTP step
 * of the loan application process, including component props and related types.
 */

import { ComponentProps } from 'lib/component-props';
import { ISendOTP } from 'src/interfaces/ISendOTP';

/**
 * Component props for the Send OTP form component
 * Extends the base ComponentProps with send OTP specific fields
 */
export interface SendOTPComponentProps extends ComponentProps {
  /** Send OTP form fields from Sitecore CMS */
  fields: ISendOTP;
}