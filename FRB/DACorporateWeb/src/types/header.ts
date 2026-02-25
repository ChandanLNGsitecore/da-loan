/**
 * Header Types for DirectAxis Website
 */

import { ComponentProps } from 'lib/component-props';
import { IHeaderFields, IMenuLinkItem, INavigationLinkItem } from '../interfaces/IHeader';

// Export interfaces
export type { IMenuLinkItem, INavigationLinkItem, IHeaderFields };

// Component props
export interface HeaderComponentProps extends ComponentProps {
  fields: IHeaderFields;
  componentMap?: Map<string, React.ComponentType<unknown>>;
}