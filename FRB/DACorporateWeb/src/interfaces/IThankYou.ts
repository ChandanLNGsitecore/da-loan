/**
 * Affordability Assessment Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the thank you step
 * of the loan application journey. It contains all content fields that are managed
 * through Sitecore CMS for the affordability calculation and display component.
 * 
 * @file IAffordability.ts
 * @description Interface for affordability assessment form fields and content
 * @version 1.0.0
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Sitecore fields interface for affordability assessment content
 * 
 * This interface represents all CMS-managed content fields used in the affordability
 * step of the loan application process. It includes heading content, form field
 * configurations, validation settings, and calculation display options.
 */
export interface IThankYou {

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
   * Text content for the form submit button
   * Button label for proceeding to the next step in the application
   */
  SubmitButtonText: TextField;
}