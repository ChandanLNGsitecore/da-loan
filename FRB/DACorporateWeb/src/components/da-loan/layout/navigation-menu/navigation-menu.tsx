/**
 * Navigation Menu Components for DirectAxis Website
 * 
 * This module contains both desktop and mobile navigation components that integrate
 * with Sitecore CMS for dynamic menu content. Supports responsive design with
 * dropdown menus and mobile slide-out navigation.
 */

"use client";

import React, { JSX } from "react";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose, } from "components/da-loan/ui-premetive/sheet";
import { Logo } from "components/da-loan/ui-premetive/logo";
import {
  Link as ContentSdkLink,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "components/da-loan/ui-premetive/dropdown-menu";
import { HeaderComponentProps } from 'src/types/header';

/**
 * Desktop Navigation Component
 * 
 * Renders horizontal navigation for desktop screens with:
 * - Primary navigation links
 * - Dropdown menu for secondary links
 * - Hover effects and transitions
 * 
 * @param props - Header props containing Sitecore fields and rendering context
 * @returns JSX.Element - The rendered desktop navigation
 */
export const DesktopNavigation = (props: HeaderComponentProps): JSX.Element => {
  const { fields } = props;
  
  return (
    <nav className="flex items-center gap-8 flex-1 justify-center">
      {/* Primary Navigation Links */}
      {fields.FirstLevelMenu.map((linkitem, index) => (
        <ContentSdkLink 
          key={index}
          className="text-primary hover:text-secondary-teal-dark transition-colors font-medium" 
          field={linkitem.fields.Link}
        />
      ))}
      
      {/* Secondary Navigation Dropdown */}
      {fields.MoreLinks.length > 0 && (
        <DropdownMenu>
          {/* Dropdown Trigger Button */}
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="text-primary hover:text-secondary-teal-dark transition-colors font-medium flex items-center gap-1 outline-none"
            >
              {/* Dynamic dropdown title from Sitecore */}
              <Text field={fields.MoreLinkTitle} />
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          
          {/* Dropdown Content */}
          <DropdownMenuContent
            align="end"
            className="w-56 shadow-2xl border-gray-200 p-2"
          >
            {/* Secondary navigation items */}
            {fields.MoreLinks.map((secondeleveitem, index) => (
              <DropdownMenuItem
                key={secondeleveitem.fields.Link?.value?.href || index}
                asChild
                className="text-base py-2.5"
              >
                <ContentSdkLink field={secondeleveitem.fields.Link} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}

/**
 * Mobile Menu Button Component
 * 
 * Renders a slide-out navigation panel for mobile devices with:
 * - Animated hamburger menu trigger
 * - Full-screen overlay navigation
 * - Animated menu items with staggered delays
 * - Primary and secondary navigation links
 * - Action buttons for login/continue
 * 
 * @param props - Header props containing Sitecore fields and rendering context
 * @returns JSX.Element - The rendered mobile menu component
 */
export const MobileMenuButton = (props: HeaderComponentProps): JSX.Element => {
  const { fields } = props;
  const [open, setOpen] = useState(false); // Mobile menu open/close state

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Mobile Menu Trigger Button */}
      <SheetTrigger asChild>
        <button
          className="bg-primary text-white flex flex-col items-center justify-center gap-1 h-16 px-4 hover:bg-secondary-green transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
          <span className="text-xs font-medium uppercase tracking-wide">
            MENU
          </span>
        </button>
      </SheetTrigger>
      
      {/* Mobile Menu Panel */}
      <SheetContent side="right" className="w-full border-none">
        {/* Menu Header with Logo */}
        <SheetHeader>
          <SheetTitle className="animate-in fade-in slide-in-from-left duration-300">
            <Logo className="h-8 w-auto" variant="dark" />
          </SheetTitle>
        </SheetHeader>
        
        {/* Navigation Content */}
        <nav className="flex flex-col gap-4 mt-8 p-8">
          {/* Primary Navigation Links */}
          {fields.FirstLevelMenu.map((firstlevelitem, index) => (
            <SheetClose key={firstlevelitem.fields.Link?.value?.href || index} asChild>
              <ContentSdkLink  
                className="text-primary hover:text-secondary-teal-dark transition-all duration-200 font-medium text-lg transform hover:translate-x-2 hover:scale-105 menu-item-animate"
                style={{
                  animationDelay: `${(index + 1) * 80}ms`, // Staggered animation
                }} 
                field={firstlevelitem.fields.Link} 
              />
            </SheetClose>
          ))}
          
          {/* Secondary Navigation Section */}
          {fields.MoreLinks.length > 0 && (
            <div
              className="flex flex-col gap-3 pt-4 border-t menu-item-animate"
              style={{
                animationDelay: `${(fields.MoreLinks.length + 1) * 80}ms`,
              }}
            >
              {/* Section Title */}
              <div className="text-primary font-medium text-lg mb-2">
                <Text field={fields.MoreLinkTitle} />
              </div>
              
              {/* Secondary Links */}
              {fields.MoreLinks.map((secondeleveitem, index) => (
                <SheetClose key={secondeleveitem.fields.Link?.value?.href || index} asChild>
                  <ContentSdkLink 
                    className="text-primary hover:text-secondary-teal-dark transition-all duration-200 font-medium text-base pl-4 py-2 transform hover:translate-x-2 hover:scale-105 menu-item-animate"
                    style={{
                      animationDelay: `${
                        (fields.FirstLevelMenu.length + 2 + index) * 80
                      }ms`,
                    }} 
                    field={secondeleveitem.fields.Link} 
                  />
                </SheetClose>
              ))}
            </div>
          )}
          
          {/* Action Buttons Section */}
          {(fields.Continue || fields.Login) && (
            <div
              className="flex flex-col gap-3 pt-6 border-t menu-item-animate"
              style={{
                animationDelay: `${
                  (fields.FirstLevelMenu.length + fields.MoreLinks.length + 2) * 80
                }ms`,
              }}
            >
              {/* Primary Continue Button */}
              {fields.Continue && (
                <SheetClose asChild>
                  <ContentSdkLink 
                    field={fields.Continue}
                    className="bg-button-primary border-0 rounded-md px-4 py-2 h-9 text-sm font-medium text-white text-center inline-block"
                  />
                </SheetClose>
              )}
              
              {/* Secondary Login Button */}
              {fields.Login && (
                <SheetClose asChild>
                  <ContentSdkLink 
                    field={fields.Login}
                    className="border border-primary text-primary rounded-md px-4 py-2 h-9 text-sm font-medium text-center inline-block hover:bg-primary hover:text-white transition-colors"
                  />
                </SheetClose>
              )}
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
