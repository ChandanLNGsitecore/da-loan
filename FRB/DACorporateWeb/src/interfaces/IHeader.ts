/**
 * Header Interface for DirectAxis Website
 * 
 * Defines the Sitecore CMS field structure for header components.
 * This interface represents all content fields managed through Sitecore
 * that are used in the header component.
 */

import { TextField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

/**
 * Base menu link item structure
 */
export interface IMenuLinkItem {
  Link: LinkField;
  isLink: boolean;
}

/**
 * Navigation link wrapper with fields structure
 * Matches Sitecore's field structure pattern
 */
export interface INavigationLinkItem {
  fields: IMenuLinkItem;
}

/**
 * Sitecore fields interface for header content
 * Defines all CMS-managed content fields used in the header component
 */
export interface IHeaderFields {
  /** Main logo/brand image displayed in header */
  HeaderLogo: RichTextField;
  
  /** Primary action button (Continue/Apply) */
  Continue: LinkField;
  
  /** Login/account access button */
  Login: LinkField;
  
  /** Logo wrapper link (usually points to homepage) */
  HeaderLink: LinkField;
  
  /** Primary navigation menu items */
  FirstLevelMenu: Array<INavigationLinkItem>;
  
  /** Secondary/dropdown navigation menu items */
  MoreLinks: Array<INavigationLinkItem>;
  
  /** Title text for the dropdown/more links section */
  MoreLinkTitle: TextField;
}