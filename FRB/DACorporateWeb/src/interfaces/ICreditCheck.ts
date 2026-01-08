/**
 * Credit Check Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the credit check step
 * of the loan application journey. It contains all content fields that are managed
 * through Sitecore CMS for the credit check form component.
 * 
 * @file ICreditCheck.ts
 * @description Interface for credit check form fields and content
 * @version 1.0.0
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Sitecore fields interface for credit check form content
 * 
 * This interface represents all CMS-managed content fields used in the credit check
 * step of the loan application process. It includes heading content, form field
 * configurations, and validation settings.
 */
export interface ICreditCheck {
  /**
   * Sub-heading message displayed on the credit check page
   * Used to provide additional context or instructions to the user
   */
  SubHeadingMessage: TextField;

  /**
   * Main heading for the current journey step
   * Typically displays the step name or progress indicator
   */
  JourneyStep_Heading: TextField;

  /**
   * Sub-heading for the journey step
   * Provides additional context about the current step in the application process
   */
  JourneyStep_SubHeading: TextField;

  /**
   * Unique identifier for the cellphone input field
   * Used for form field identification and validation mapping
   */
  CellPhone_FieldID: TextField;

  /**
   * Display label for the cellphone number input field
   * This text is shown to users as the field label
   */
  CellPhone_Label: TextField;

  /**
   * Indicates whether the cellphone field is mandatory
   * When true, the field must be completed before form submission
   */
  CellPhone_Required: boolean;

  /**
   * Regular expression pattern for cellphone number validation
   * Defines the acceptable format for South African cellphone numbers
   * Example: Should validate 10-digit numbers starting with 0
   */
  CellPhone_ValidationRegex: TextField;

  /**
   * Error message displayed when cellphone validation fails
   * Shown to users when their input doesn't match the validation regex
   */
  CellPhone_ValidationErrorMessage: TextField;

  /**
   * Placeholder text for the cellphone input field
   * Provides users with an example of the expected input format
   * Example: "E.g. 079 343 2356"
   */
  CellPhone_Placeholder: TextField;
   SubmitButtonText: TextField;

  
}