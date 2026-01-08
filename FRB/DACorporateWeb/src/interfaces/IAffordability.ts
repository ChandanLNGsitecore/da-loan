/**
 * Affordability Assessment Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the affordability assessment step
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
export interface IAffordability {
  /**
   * Sub-heading message displayed on the affordability assessment page
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

  // =============================================================================
  // AFFORDABILITY DISPLAY SECTION
  // =============================================================================

  /**
   * Title for the estimated disposable income section
   * Displays the main heading for income calculation results
   */
  EstimatedDisposableTitle: TextField;

  /**
   * Subtitle for the estimated disposable income section
   * Provides additional context for the calculated disposable income
   */
  EstimatedDisposableSubTitle: TextField;

  /**
   * Text content for the view affordability button
   * Button label that allows users to view detailed affordability breakdown
   */
  ViewAffordabilityButtonText: TextField;
  
/*  * Text content for the back button**/
  BackBtnText: TextField;

  /**
   * Title for the affordability details modal or section
   * Main heading when viewing affordability breakdown
   */
  ViewAffordabilityTitle: TextField;

  /**
   * Disclaimer text for affordability calculations
   * Legal or informational text about the accuracy of calculations
   */
  ViewAffordabilitDisclaimer: TextField;

  /**
   * Detailed description of the affordability assessment
   * Rich text content explaining how the affordability is calculated
   */
  ViewAffordabilityDescription: RichTextField;

  // =============================================================================
  // LIVING EXPENSES FIELD CONFIGURATION
  // =============================================================================

  /**
   * Unique identifier for the living expenses input field
   * Used for form field identification and validation mapping
   */
  LivingExpenses_FieldID: TextField;

  /**
   * Display label for the living expenses input field
   * This text is shown to users as the field label
   */
  LivingExpenses_Label: TextField;

  /**
   * Indicates whether the living expenses field is required
   * Controls form validation for this field
   */
  LivingExpenses_Required: boolean;

  /**
   * Validation regex pattern for living expenses field
   * Defines the allowed format for living expenses input
   */
  LivingExpenses_ValidationRegex: TextField;

  /**
   * Error message displayed when living expenses validation fails
   * Shown to user when input doesn't meet validation requirements
   */
  LivingExpenses_ValidationErrorMessage: TextField;

  /**
   * Minimum character length for living expenses input
   * Enforces minimum input length validation
   */
  LivingExpenses_MinLength: TextField;

  /**
   * Maximum character length for living expenses input
   * Enforces maximum input length validation
   */
  LivingExpenses_MaxLength: TextField;

  /**
   * Placeholder text for the living expenses input field
   * Hint text displayed in the input field when empty
   */
  LivingExpenses_Placeholder: TextField;

  // =============================================================================
  // NET INCOME FIELD CONFIGURATION
  // =============================================================================

  /**
   * Unique identifier for the net income input field
   * Used for form field identification and validation mapping
   */
  NetIncome_FieldID: TextField;

  /**
   * Display label for the net income input field
   * This text is shown to users as the field label
   */
  NetIncome_Label: TextField;

  /**
   * Indicates whether the net income field is required
   * Controls form validation for this field
   */
  NetIncome_Required: boolean;

  /**
   * Validation regex pattern for net income field
   * Defines the allowed format for net income input
   */
  NetIncome_ValidationRegex: TextField;

  /**
   * Error message displayed when net income validation fails
   * Shown to user when input doesn't meet validation requirements
   */
  NetIncome_ValidationErrorMessage: TextField;

  /**
   * Minimum character length for net income input
   * Enforces minimum input length validation
   */
  NetIncome_MinLength: TextField;

  /**
   * Maximum character length for net income input
   * Enforces maximum input length validation
   */
  NetIncome_MaxLength: TextField;

  /**
   * Placeholder text for the net income input field
   * Hint text displayed in the input field when empty
   */
  NetIncome_Placeholder: TextField;

  // =============================================================================
  // MONTHLY COMMITMENT FIELD CONFIGURATION
  // =============================================================================

  /**
   * Unique identifier for the monthly commitment input field
   * Used for form field identification and validation mapping
   */
  MonthlyCommitment_FieldID: TextField;

  /**
   * Display label for the monthly commitment input field
   * This text is shown to users as the field label
   */
  MonthlyCommitment_Label: TextField;

  /**
   * Indicates whether the monthly commitment field is required
   * Controls form validation for this field
   */
  MonthlyCommitment_Required: boolean;

  /**
   * Validation regex pattern for monthly commitment field
   * Defines the allowed format for monthly commitment input
   */
  MonthlyCommitment_ValidationRegex: TextField;

  /**
   * Error message displayed when monthly commitment validation fails
   * Shown to user when input doesn't meet validation requirements
   */
  MonthlyCommitment_ValidationErrorMessage: TextField;

  /**
   * Minimum character length for monthly commitment input
   * Enforces minimum input length validation
   */
  MonthlyCommitment_MinLength: TextField;

  /**
   * Maximum character length for monthly commitment input
   * Enforces maximum input length validation
   */
  MonthlyCommitment_MaxLength: TextField;

  /**
   * Placeholder text for the monthly commitment input field
   * Hint text displayed in the input field when empty
   */
  MonthlyCommitment_Placeholder: TextField;

  // =============================================================================
  // FORM SUBMISSION
  // =============================================================================

  /**
   * Text content for the form submit button
   * Button label for proceeding to the next step in the application
   */
  SubmitButtonText: TextField;
}