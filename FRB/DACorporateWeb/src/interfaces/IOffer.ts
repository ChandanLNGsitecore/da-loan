/**
 * Loan Offer Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the congratulations/offer step
 * of the loan application journey. It contains all content fields that are managed
 * through Sitecore CMS for displaying loan offer details, messages, and loan summary information.
 * 
 * @file IOffer.ts
 * @description Interface for loan offer content fields and messaging
 * @version 1.0.0
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Sitecore fields interface for loan offer congratulations content
 * 
 * This interface represents all CMS-managed content fields used in the loan offer
 * congratulations step where users see their approved loan amount, terms, and
 * personalized messages based on their qualification status.
 */
export interface IOffer {

  /**
   * Main heading for the current journey step
   * Typically displays "Congratulations!" or similar celebration message
   */
  JourneyStep_Heading: TextField;

  /**
   * Sub-heading for the journey step
   * Provides additional context about the loan offer or approval status
   */
  JourneyStep_SubHeading: TextField;

  
  /**
   * Text content for the form submit button
   * Button label for proceeding to the next step (e.g., "Continue with R15,000")
   */
  SubmitButtonText: TextField;

  /**
   * Message displayed when user qualifies for more than requested amount
   * Congratulates user on excellent credit profile and explains additional borrowing capacity
   */
  OverQualifiedMessage: TextField;

  /**
   * Message displayed when user doesn't qualify for full requested amount
   * Explains shortfall and may offer credit improvement suggestions
   */
  ShortfallFallMessage: TextField;

  /**
   * Message displayed when user qualifies for exact requested amount
   * Confirms perfect match between request and approval
   */
  ExactMatchMessage: TextField;

  /**
   * Label for monthly repayment amount display
   * Used in loan summary section to show calculated monthly payment
   */
  MonthlyRepayment: TextField;

  /**
   * Label for loan term display
   * Shows the repayment period in months in the loan summary
   */
  LoanTerm: TextField;

  /**
   * Label for interest rate display
   * Shows the applicable interest rate percentage in loan summary
   */
  IntrestRate: TextField;

  /**
   * Rich text message about income and expense verification
   * Explains next steps regarding income/expense confirmation process
   */
  IncomeExpenseMessage: RichTextField;

}