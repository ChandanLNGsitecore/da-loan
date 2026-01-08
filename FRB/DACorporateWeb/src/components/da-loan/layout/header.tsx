/**
 * Header Component for DirectAxis Website
 * 
 * This component renders the main website header with responsive navigation,
 * logo, and action buttons. It integrates with Sitecore CMS for content management.
 */

"use client";

import React, { JSX } from "react";
import { Button } from "components/da-loan/ui-premetive/button";
import { DesktopNavigation, MobileMenuButton } from "components/da-loan/layout/navigation-menu";
import {
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { HeaderComponentProps } from 'src/types/header';

/**
 * Default Header Component
 * 
 * Renders a responsive header with:
 * - Logo/brand (left side)
 * - Desktop navigation (center)
 * - Action buttons (right side)
 * - Mobile menu button (mobile only)
 * 
 * @param props - Component props including Sitecore fields and rendering context
 * @returns JSX.Element - The rendered header component
 */
export const Default = (props: HeaderComponentProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;

  return (
    <header className="">
      {/* Main header container with responsive padding */}
      <div className="container mx-auto px-4 py-2 lg:px-8 md:py-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand Section (Left) */}
          <div className="flex items-center shrink-0">
            <ContentSdkLink field={fields.HeaderLink}>
              <ContentSdkRichText 
                className="promo-h-8 w-auto" 
                field={fields.HeaderLogo} 
              />
            </ContentSdkLink>
          </div>

          {/* Desktop Navigation Section (Center) */}
          <div className="hidden md:block flex-1">
            <DesktopNavigation {...props} />
          </div>

          {/* Action Buttons & Mobile Menu (Right) */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Desktop Action Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
              {/* Primary Continue Button */}
              <Button
                asChild
                className="bg-button-primary border-0 rounded-md px-4 py-2 h-9 text-sm font-medium"
              >
                <ContentSdkLink field={fields.Continue} />
              </Button>
              
              {/* Secondary Login Button */}
              <Button 
                asChild 
                variant="outline" 
                className="text-sm font-medium"
              >
                <ContentSdkLink field={fields.Login} />
              </Button>
            </div>
            
            {/* Mobile Menu Button - Hidden on desktop */}
            <div className="md:hidden">
              <MobileMenuButton {...props} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
