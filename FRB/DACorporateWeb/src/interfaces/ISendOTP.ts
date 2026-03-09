/**
 * Send OTP Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the send OTP step
 * of the loan application journey. It contains all content fields that are managed
 * through Sitecore CMS for the send OTP form component.
 * 
 * @file ISendOTP.ts
 * @description Interface for send OTP form fields and content
 * @version 1.0.0
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Sitecore fields interface for send OTP form content
 * 
 * This interface represents all CMS-managed content fields used in the send OTP
 * step of the loan application process. It includes heading content, form field
 * configurations, and validation settings.
 */
export interface ISendOTP {
  /**
   * Sub-heading message displayed on the send OTP page
   * Used to provide additional context or instructions to the user
   */
  SubHeadingMessage: RichTextField;

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

  /**
   * Unique identifier for the cellphone input field
   * Used for form field identification and validation mapping
   */
  Email_FieldID: TextField;

  /**
   * Display label for the email input field
   * This text is shown to users as the field label
   */
  Email_Label: TextField;



  /**
   * Regular expression pattern for email validation
   * Defines the acceptable format for email addresses
   * Example: Should validate standard email formats

   */
  Email_ValidationRegex: TextField;

  /**
   * Error message displayed when email validation fails
   * Shown to users when their input doesn't match the validation regex
   */
  Email_ValidationErrorMessage: TextField;

  /**
   * Placeholder text for the email input field
   * Provides users with an example of the expected input format
   * Example: "E.g. user@example.com"
   */
  Email_Placeholder: TextField;
   SubmitButtonText: TextField;

  /* Text content for the back button**/
  BackButtonText: TextField;

    /* Text content for the send cellphone message**/
  SendCellPhoneMessage: TextField;

    /* Text content for the send email message**/
  SendEmailMessage: TextField;


  SendLink: LinkField;

SendCellphoneBtnTxt: TextField;
SendEmailBtnTxt: TextField;
  
}