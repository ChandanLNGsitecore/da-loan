/**
 * Application Submit Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the application submission
 * confirmation step of the loan application journey. It contains all content fields that 
 * are managed through Sitecore CMS for displaying submission confirmation, contact information,
 * and next steps after the user submits their loan application.
 * 
 * @file IApplicationSubmit.ts
 * @description Interface for application submission confirmation content fields
 * @version 1.0.0
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Sitecore fields interface for application submission confirmation content
 * 
 * This interface represents all CMS-managed content fields used in the application
 * submission confirmation step where users receive confirmation of their submission,
 * contact information, and next steps in the application process.
 */
export interface IApplicationSubmit {

  /**
   * Main heading for the application submission page
   * Displays the primary heading after successful application submission
   * @example "Application Submitted Successfully" or "Thank You for Applying"
   */
  JourneyStep_Heading: TextField;

  /**
   * Sub-heading for the application submission page
   * Provides additional context about the submission or what happens next
   * @example "We've received your loan application"
   */
  JourneyStep_SubHeading: TextField;

  
  /**
   * Text content for the primary action button
   * Button label for next action after submission
   * @example "Return to Homepage" or "View Application Status"
   */
  SubmitButtonText: TextField;

  /**
   * Email confirmation text or label
   * Text explaining email confirmation that was sent to the user
   * @example "A confirmation email has been sent to your registered email address"
   */
  EmailConfirmationTxt: TextField;

  /**
   * Application reference text or label
   * Displays or labels the application reference number for tracking
   * Note: Property name contains typo "Refrenece" instead of "Reference"
   * @example "Your application reference number is:" or "Reference: APP123456"
   */
  ApplicationRefreneceTxt: TextField;

  /**
   * Title for the next section or steps section
   * Heading for the section that shows what happens next
   * @example "What Happens Next?" or "Next Steps"
   */
  NextSectionTitle: TextField;

  /**
   * "Need Help" text or label
   * Label or heading for the help/support section
   * @example "Need Help?" or "Have Questions?"
   */
  NeedHelptxt: TextField;

  /**
   * "Call Us" text or label
   * Label or text prompting users to call for assistance
   * @example "Call us at:" or "Contact our support team"
   */
  CallUsTxt: TextField;

  /**
   * Contact phone number
   * Phone number for customer support or inquiries
   * @example "0800 100 500" or "+27 11 123 4567"
   */
  CallUsNumber: TextField;

  /**
   * Email text or label
   * Label or text for email contact information
   * @example "Email us at:" or "Send us an email"
   */
  EmailTxt: TextField;

  /**
   * Email address for contact
   * Email address where users can reach support or inquiries
   * @example "support@directaxis.co.za"
   */
  EmailID: TextField;

  /**
   * Loan amount text or label
   * Label or description for the loan amount display
   * @example "Loan Amount:" or "Your requested loan amount"
   */
  LoanAmountTxt: TextField;

  /**
   * Title for the document verification step
   * Heading that describes the document verification stage
   * @example "Document Verification" or "Step 1: Verify Your Documents"
   */
  DocumentVerificationTitle: TextField;

  /**
   * Subtitle for the document verification step
   * Additional description or instructions for document verification
   * @example "Upload your ID and proof of income"
   */
  DocumentVerificationSubTitle: TextField;

  /**
   * Title for the affordability assessment step
   * Heading that describes the affordability assessment stage
   * @example "Affordability Assessment" or "Step 2: Financial Review"
   */
  AffordabilityAssessmentTitle: TextField;

  /**
   * Subtitle for the affordability assessment step
   * Additional description or instructions for affordability assessment
   * @example "We'll review your income and expenses"
   */
  AffordabilityAssessmentSubTitle: TextField;

  /**
   * Title for the final decision step
   * Heading that describes the final decision stage
   * @example "Final Decision" or "Step 3: Loan Approval"
   */
  FinalDecisionTitle: TextField;

  /**
   * Subtitle for the final decision step
   * Additional description or instructions for the final decision
   * @example "We'll notify you of our decision within 24 hours"
   */
  FinalDecisionSubtitle: TextField;
  
    AlertTitle: TextField;

   AlertDescription: RichTextField;

}