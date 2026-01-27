import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "lib/utils";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";

const alertVariants = cva(
  "rounded-lg border",
  {
    variants: {
      variant: {
        info: "bg-blue-50 border-blue-200 text-gray-700",
        success: "bg-teal-50 border-teal-200 text-gray-700",
        warning: "bg-amber-50 border-amber-200 text-gray-700",
        danger: "bg-red-50 border-red-200 text-gray-700",
        secondary: "bg-gray-50 border-gray-200 text-gray-700",
      },
    },
    defaultVariants: { variant: "info" },
  }
);

const iconColorVariants = {
  info: "text-blue-600",
  success: "text-[#2c5f5d]",
  warning: "text-amber-600",
  danger: "text-red-600",
  secondary: "text-gray-600",
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  children?: React.ReactNode;
  /** Optional icon to display at the start of the alert */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional title for the alert */
  title?: string;
  /** Optional array of tags to display */
  tags?: string[];
  /** Render as a Card component instead of a div */
  asCard?: boolean;
}

/**
 * Consolidated Alert component with Bootstrap-style variants
 * Supports icons, titles, tags, and card styling
 * 
 * @example
 * // Simple alert
 * <Alert variant="info">This is an informational alert</Alert>
 * 
 * @example
 * // Alert with icon
 * <Alert variant="info" icon={Info}>Message with icon</Alert>
 * 
 * @example
 * // Alert with title and icon
 * <Alert variant="warning" icon={Clock} title="Expected Timeline">
 *   Content here
 * </Alert>
 * 
 * @example
 * // Alert with tags
 * <Alert variant="info" title="Available Languages" tags={['English', 'Afrikaans']}>
 *   Select your preferred language
 * </Alert>
 * 
 * @example
 * // Alert as card
 * <Alert variant="secondary" asCard>
 *   <AlertSummary title="Total" value="R 5,000" variant="success" />
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", icon: IconComponent, title, tags, asCard, children, ...props }, ref) => {
    // Ensure variant is never null/undefined
    const safeVariant = variant || "info";
    
    // Determine padding based on whether we have icon/title/tags
    const hasHeader = IconComponent || title;
    const hasTags = tags && tags.length > 0;
    const paddingClass = IconComponent && !title ? "p-3" : "p-4";
    
    // Type assertion for icon component
    const Icon = IconComponent as React.ComponentType<{ className?: string }> | undefined;
    
    const content = (
      <>
        {/* Case 1: Icon with no title - render icon and content side-by-side */}
        {Icon && !title && children && (
          <div className={cn("flex items-center gap-2", hasTags ? "mb-3" : "")}>
            <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", iconColorVariants[safeVariant])} />
            <div className="flex-1 text-sm">{children}</div>
          </div>
        )}
        
        {/* Case 2: Title with optional icon - render as header */}
        {title && (
          <div className={cn("flex items-center gap-2", hasTags || children ? "mb-3" : "")}>
            {Icon && <Icon className={cn("w-5 h-5 shrink-0", iconColorVariants[safeVariant])} />}
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          </div>
        )}
        
        {/* Case 3: Content below title */}
        {title && children && (
          <div className={hasTags ? "mb-3" : ""}>{children}</div>
        )}
        
        {/* Case 4: No icon, no title, just content */}
        {!Icon && !title && children && (
          <div className={hasTags ? "mb-3" : ""}>{children}</div>
        )}
        
        {/* Tags rendering */}
        {hasTags && (
          <div className="flex gap-2 flex-wrap">
            {tags!.map((tag, index) => (
              <span
                key={index}
                className="text-sm font-medium text-[#2c5f5d] bg-white px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </>
    );

    if (asCard) {
      return (
        <Card ref={ref} className={cn(alertVariants({ variant: safeVariant }), className)} {...props}>
          <CardContent className="p-4">{content}</CardContent>
        </Card>
      );
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant: safeVariant }), paddingClass, className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-sm font-semibold text-gray-900 mb-1", className)}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-700", className)}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

interface AlertDetailProps {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  className?: string;
}

/**
 * Detail row component for use within Alert
 * @example
 * <Alert variant="info" title="Contact Details">
 *   <div className="space-y-2">
 *     <AlertDetail icon={Mail} label="Email" value="test@example.com" />
 *     <AlertDetail icon={Phone} label="Cellphone" value="+27 123 456 789" />
 *   </div>
 * </Alert>
 */
export const AlertDetail: React.FC<AlertDetailProps> = ({ icon: IconComponent, label, value, className }) => {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {IconComponent && <IconComponent className="w-4 h-4 text-gray-500" />}
      <span className="text-gray-600">{label}: </span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
};

AlertDetail.displayName = "AlertDetail";

export interface AlertSummaryProps {
  title: string;
  value: string | React.ReactNode;
  variant?: "info" | "success" | "warning" | "danger" | "secondary";
  className?: string;
}

/**
 * Summary component for displaying key-value pairs prominently
 * @example
 * <Alert variant="secondary" asCard>
 *   <AlertSummary title="Estimated disposable income" value="R 5,000" variant="success" />
 * </Alert>
 */
export const AlertSummary: React.FC<AlertSummaryProps> = ({ 
  title, 
  value, 
  variant = "secondary",
  className 
}) => {
  const valueColorVariants = {
    info: "text-blue-600",
    success: "text-[#2c5f5d]",
    warning: "text-amber-600",
    danger: "text-red-600",
    secondary: "text-gray-900",
  };

  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className={cn("text-lg font-bold", valueColorVariants[variant])}>
        {value}
      </p>
    </div>
  );
};

AlertSummary.displayName = "AlertSummary";

// export { 
//   Alert, 
//   AlertTitle, 
//   AlertDescription, 
//   AlertDetail, 
//   AlertSummary 
// }

// export type { 
//   AlertProps, 
//   AlertSummaryProps 
// }

