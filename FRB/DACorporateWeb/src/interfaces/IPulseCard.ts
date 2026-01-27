/**
 * Pulse Card Interface for DirectAxis Loan Application
 * 
 * This interface defines the Sitecore CMS field structure for the Pulse card
 * component. It contains all content fields that are managed through Sitecore CMS
 * for displaying the Pulse credit score card content.
 * 
 * @file IPulseCard.ts
 * @description Interface for Pulse card fields and content
 * @version 1.0.0
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Sitecore fields interface for Pulse card content
 * 
 * This interface represents all CMS-managed content fields used in the Pulse card
 * component. It includes title, description, and link fields for the Pulse credit
 * score promotion.
 */
export interface IPulseCard {

  /**
   * Title of the Pulse card
   * Displays the main heading for the Pulse credit score feature
   */
  Title: TextField;

  /**
   * Description for the Pulse card
   * Provides detailed information about the Pulse credit score service
   */
  Description: RichTextField;

  
  /**
   * Link field for the Pulse card
   * Contains the URL and text for navigating to the Pulse service
   */
  Link:LinkField ;
}