import React, { JSX } from "react";
import {
  Image as ContentSdkImage,
  ImageField,
  LinkField,
  RichText as ContentSdkRichText,
  RichTextField,
  TextField,
  Text as ContentSdkText,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface FooterSupportLinkItem {
  fields: {
    Label?: TextField;
    Link?: LinkField;
  };
}

export type FooterProps = ComponentProps & {
  fields: {
    HeadOfficeTitle?: TextField;
    HeadOfficeImage?: ImageField;
    AddressLine1?: TextField;
    AddressLine2?: TextField;
    AddressLine3?: TextField;
    GetDirectionsLabel?: TextField;
    GetDirectionsLink?: LinkField;
    SocialMediaTitle?: TextField;
    LinkedInLink?: LinkField;
    TwitterLink?: LinkField;
    FacebookLink?: LinkField;
    ContactUsLabel?: TextField;
    ContactUsLink?: LinkField;
    CallCentreTitle?: TextField;
    PhoneNumber?: TextField;
    HoursOfOperation?: TextField;
    DirectNumberLabel?: TextField;
    DirectNumberLink?: LinkField;
    SupportTitle?: TextField;
    SupportLinks?: FooterSupportLinkItem[];
    LegalText?: RichTextField;
    LegalDocumentsLabel?: TextField;
    LegalDocumentsLink?: LinkField;
    SitemapLabel?: TextField;
    SitemapLink?: LinkField;
  };
};

export const Default = (props: FooterProps): JSX.Element => {
  const fields = props.fields;

  return (
    <footer className="w-full">
      {/* Top Section 1 */}
      <div className="w-full px-4 md:px-12 py-12 md:py-16 bg-gray-800">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Head Office Column */}
            <div className="flex flex-col">
              <div className="border-t border-gray-400 pt-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {fields?.HeadOfficeTitle && (
                    <ContentSdkText field={fields.HeadOfficeTitle} />
                  )}
                </h3>
              </div>
              {fields.HeadOfficeImage?.value?.src && (
                <div className="relative w-full aspect-600/334 mb-4 rounded-lg overflow-hidden">
                  <ContentSdkImage
                    field={fields.HeadOfficeImage}
                    alt={
                      fields.HeadOfficeImage?.value?.alt || "DirectAxis Campus"
                    }
                    loading="lazy"
                    className="object-cover absolute h-full w-full inset-0"
                  />
                </div>
              )}
              <div className="text-white space-y-1 mb-4">
                <ContentSdkText field={fields.AddressLine1} />
                <ContentSdkText field={fields.AddressLine2} />
                <ContentSdkText field={fields.AddressLine3} />
              </div>
              <a
                className="text-sm font-medium flex items-center gap-1 w-fit text-secondary-teal-tint group"
                href={fields.GetDirectionsLink?.value?.href || "#"}
              >
                <ContentSdkText field={fields.GetDirectionsLabel} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>

            {/* Social Media Section Column */}
            <div className="flex flex-col">
              <div className="border-t border-gray-400 pt-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  <ContentSdkText field={fields.SocialMediaTitle} />
                </h3>
              </div>
              <div className="flex gap-4 mb-6">
                <a
                  href={fields.LinkedInLink?.value?.href || "#"}
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-secondary-teal-tint hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href={
                    fields.TwitterLink?.value?.href ||
                    "https://x.com/DirectAxis"
                  }
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-secondary-teal-tint hover:bg-primary transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-5 w-5"
                    width="1200"
                    height="1227"
                    viewBox="0 0 1200 1227"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  href={
                    fields.FacebookLink?.value?.href ||
                    "https://www.facebook.com/DirectAxisSA/"
                  }
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-secondary-teal-tint hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <a
                className="text-sm font-medium flex items-center gap-1 w-fit text-secondary-teal-tint group"
                href={fields.ContactUsLink?.value?.href || "#"}
              >
                <ContentSdkText field={fields.ContactUsLabel} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>

            {/* Call Centre Column */}
            <div className="flex flex-col">
              <div className="border-t border-gray-400 pt-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  <ContentSdkText field={fields.CallCentreTitle} />
                </h3>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-3">
				<ContentSdkText field={fields.PhoneNumber} />
              </p>
              <p className="text-sm text-white mb-6">
                <ContentSdkText field={fields.HoursOfOperation} />
              </p>
              <a
                className="text-sm font-medium flex items-center gap-1 w-fit text-secondary-teal-tint group"
                href={fields.DirectNumberLink?.value?.href || "#"}
              >
                <ContentSdkText field={fields.DirectNumberLabel} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>

            {/* Support & Information Column */}
            <div className="flex flex-col">
              <div className="border-t border-gray-400 pt-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  <ContentSdkText field={fields.SupportTitle} />
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {fields.SupportLinks?.map((linkItem, index) => (
                  <a
                    key={index}
                    className="text-sm text-secondary-teal-tint flex items-center gap-2 hover:opacity-80 transition-opacity group"
                    href={linkItem.fields.Link?.value?.href || "#"}
                  >
                    <ContentSdkText field={linkItem.fields.Label} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div
        className="w-full px-4 md:px-12 py-8 md:py-10"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <div className="shrink-0">
              <svg
                width="39"
                height="18"
                viewBox="0 0 39 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-auto"
              >
                <g clipPath="url(#clip0_128_2389)">
                  <path
                    d="M13.0188 2.26245L12.4546 3.61423H20.0924L19.5282 2.26245H13.0188ZM11.2275 8.92174C11.1217 9.04269 11.0089 9.15652 10.889 9.27036C10.4447 9.683 9.93691 10.0174 9.36566 10.2735H9.66892H12.6027H19.8879H21.2138H22.8781L22.3139 8.92885C22.3139 8.92174 11.2275 8.92174 11.2275 8.92174ZM12.5604 4.48221C12.5816 4.69565 12.5957 4.91621 12.5957 5.13676V5.16522C12.5957 5.39289 12.5816 5.61344 12.5604 5.83399H21.0233L20.4592 4.48221C20.4592 4.48221 12.5604 4.48221 12.5604 4.48221ZM19.1615 1.39447L18.5973 0.0426884H13.9427L13.3785 1.39447H19.1615ZM21.9543 8.04664H11.8552C11.968 7.84743 12.0667 7.64111 12.1584 7.42767C12.2572 7.19289 12.3347 6.94387 12.4053 6.69486H21.3901L21.9543 8.04664Z"
                    fill="white"
                  ></path>
                  <path
                    d="M10.3389 1.39447C9.37975 0.590514 8.01157 0.113834 6.31193 0.113834H0.0775757V1.38735L10.3389 1.39447ZM0.0775757 8.92174V10.2735H6.24846C7.99041 10.2735 9.37975 9.77549 10.353 8.92885C10.36 8.92174 0.0775757 8.92174 0.0775757 8.92174ZM0.0775757 6.70198V8.05375H11.1358C11.4179 7.64822 11.6295 7.19289 11.7705 6.70909C11.7776 6.70198 0.0775757 6.70198 0.0775757 6.70198ZM11.9468 5.83399C11.975 5.61344 11.9821 5.39289 11.9821 5.16522V5.13676C11.9821 4.91621 11.968 4.69565 11.9468 4.48221H0.0775757V5.83399H11.9468ZM0.0775757 2.26245H11.1429C11.425 2.66798 11.6365 3.12332 11.7776 3.61423H0.0775757V2.26245Z"
                    fill="white"
                  ></path>
                  <path
                    d="M31.8277 12.6783H30.8544V13.6032H31.8277V12.6783Z"
                    fill="white"
                  ></path>
                  <path
                    d="M6.22025 12.7281H5.52911V13.4822H6.22025V12.7281Z"
                    fill="white"
                  ></path>
                  <path
                    d="M29.2817 14.1794H30.3114L28.8233 16.0221L30.3537 17.9644H29.2747L28.2591 16.6553L27.2224 17.9644H26.1998L27.7443 16.0292L26.2845 14.1794H27.3635L28.3226 15.3889L29.2817 14.1794Z"
                    fill="white"
                  ></path>
                  <path
                    d="M34.296 18.0356C33.083 18.0356 32.5047 17.7937 32.3566 17.1889C32.3213 17.0395 32.3143 16.9257 32.3143 16.8047H33.224C33.224 16.8617 33.224 16.9399 33.2522 17.0324C33.3228 17.2458 33.6542 17.3099 34.296 17.3099C34.973 17.3099 35.2058 17.1676 35.2058 16.8972C35.2058 16.634 34.9519 16.57 34.3524 16.4704C34.2325 16.449 33.7177 16.3708 33.5767 16.3423C32.7515 16.2213 32.3777 15.8585 32.3777 15.1613C32.3777 14.5209 32.9419 14.087 34.1056 14.087C35.1987 14.087 35.7135 14.3787 35.8899 14.8767C35.9392 15.019 35.9533 15.2253 35.9533 15.332H35.0647C35.0647 15.268 35.0577 15.1542 35.0224 15.0901C34.9378 14.9621 34.7192 14.8482 34.1338 14.8482C33.4709 14.8482 33.2734 14.9763 33.2734 15.1968C33.2734 15.396 33.4074 15.4957 33.9857 15.581C34.1338 15.6024 34.6416 15.6806 34.8108 15.7091C35.7206 15.8514 36.0944 16.1787 36.0944 16.8617C36.0944 17.6372 35.5443 18.0356 34.296 18.0356Z"
                    fill="white"
                  ></path>
                  <path
                    d="M22.2716 15.7874L23.2237 13.5036L24.1828 15.7874H22.2716ZM22.6102 12.5289L20.3322 17.9644H21.3548L21.9049 16.6411H24.5355L25.0926 17.9644H26.1152L23.8373 12.5289H22.6102Z"
                    fill="white"
                  ></path>
                  <path
                    d="M31.743 14.1794H30.8192V17.9644H31.743V14.1794Z"
                    fill="white"
                  ></path>
                  <path
                    d="M6.14266 14.2292H5.49384V17.9715H6.14266V14.2292Z"
                    fill="white"
                  ></path>
                  <path
                    d="M4.00579 16.0862C3.92116 16.3423 3.79421 16.57 3.63201 16.7621C3.4698 16.9542 3.25823 17.1036 3.01844 17.2103C2.77866 17.317 2.50362 17.3739 2.18626 17.3739H0.733453V13.1336H2.18626C2.48951 13.1336 2.76456 13.1905 3.00434 13.2901C3.24412 13.3897 3.44864 13.5391 3.6179 13.7241C3.78716 13.9091 3.9141 14.1368 3.99873 14.3929C4.08336 14.649 4.12568 14.9336 4.12568 15.2395C4.12568 15.5455 4.09042 15.8229 4.00579 16.0862ZM4.12568 13.3399C3.90705 13.098 3.63906 12.9059 3.31465 12.7636C2.99023 12.6213 2.6094 12.5502 2.1792 12.5502H0.0775757V17.9502H2.1792C2.58119 17.9502 2.94087 17.8862 3.25823 17.7581C3.57559 17.63 3.85063 17.4451 4.07631 17.2103C4.30199 16.9755 4.4783 16.6909 4.59819 16.3636C4.71808 16.0292 4.78155 15.6593 4.78155 15.2466C4.78155 14.8767 4.72513 14.5281 4.61935 14.2008C4.50651 13.8664 4.3443 13.5818 4.12568 13.3399Z"
                    fill="white"
                  ></path>
                  <path
                    d="M15.5365 14.7059C16.002 14.7059 16.3475 14.8269 16.5591 15.0617C16.6861 15.1968 16.7495 15.4174 16.7636 15.5597H17.3913C17.3843 15.4103 17.356 15.1257 17.215 14.9051C16.8835 14.3787 16.3687 14.1368 15.6 14.1368C14.9229 14.1368 14.4363 14.3075 14.0626 14.6704C13.7311 15.0047 13.5618 15.4814 13.5618 16.0862C13.5618 16.7621 13.7452 17.2458 14.1119 17.5802C14.4504 17.8862 14.9159 18.0356 15.5295 18.0356C16.1571 18.0356 16.6508 17.8791 16.9611 17.5802C17.2009 17.3597 17.349 17.0395 17.3772 16.698H16.7636C16.7495 16.8047 16.6931 17.0111 16.5309 17.1676C16.3758 17.317 16.0796 17.502 15.5506 17.502C15.1063 17.502 14.7678 17.3953 14.5492 17.1818C14.3164 16.9684 14.2036 16.6269 14.2036 16.1075C14.2036 15.6308 14.3164 15.2751 14.5351 15.0688C14.789 14.8126 15.0993 14.7059 15.5365 14.7059Z"
                    fill="white"
                  ></path>
                  <path
                    d="M20.1488 14.77V14.2293H18.971V13.404L18.3645 13.4111V14.2293H18.3081H17.7016V14.77H18.3504V17.0822C18.3504 17.7083 18.6819 18.0142 19.373 18.0142C19.5423 18.0142 19.7256 18.0071 19.8808 17.9929L20.1135 17.4308C19.9795 17.4522 19.775 17.4593 19.6481 17.4593C19.232 17.4593 18.9992 17.3597 18.9992 16.8474V14.77H20.1488Z"
                    fill="white"
                  ></path>
                  <path
                    d="M12.37 15.8443H9.76762L9.77467 15.7873C9.79583 15.4601 9.90867 15.204 10.1061 15.0332C10.353 14.7984 10.6844 14.6846 11.0935 14.6846C11.5307 14.6846 11.8763 14.8055 12.102 15.0332C12.2783 15.2111 12.37 15.4601 12.37 15.7945V15.8443ZM11.0935 14.1368C10.4306 14.1368 9.87341 14.3858 9.52078 14.8269C9.2669 15.1613 9.13995 15.5668 9.13995 16.0719C9.13995 16.6198 9.25984 17.0253 9.50668 17.3455C9.86635 17.8079 10.3882 18.0285 11.1076 18.0285C11.6718 18.0285 12.1161 17.9075 12.4334 17.6656C12.772 17.4024 12.9412 17.0822 12.9694 16.8617H12.3488C12.3277 16.9684 12.243 17.1462 12.0244 17.2885C11.8128 17.4237 11.4884 17.502 11.1146 17.502C10.6985 17.502 10.3318 17.3739 10.1061 17.1462C9.88751 16.9257 9.78172 16.6767 9.76057 16.3565V16.2996H13.0047C13.0541 15.7162 12.9271 15.1328 12.6662 14.8055C12.3418 14.3787 11.7987 14.1368 11.0935 14.1368Z"
                    fill="white"
                  ></path>
                  <path
                    d="M9.52783 14.1866C9.40088 14.1652 9.23868 14.1439 8.98479 14.1439C8.37828 14.1439 7.80703 14.4569 7.63072 14.8269V14.2293H7.00305V17.9715H7.64482V16.0008C7.64482 15.2822 8.13849 14.7771 8.84374 14.7771C8.90721 14.7771 8.96363 14.7771 9.013 14.7771C9.06236 14.6775 9.11878 14.5992 9.1752 14.521C9.28099 14.3929 9.39383 14.2791 9.52783 14.1866Z"
                    fill="white"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_128_2389">
                    <rect width="39" height="18" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm text-white mb-4 leading-relaxed">
                <ContentSdkRichText field={fields.LegalText} />
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  className="text-sm text-white hover:underline"
                  href={fields.LegalDocumentsLink?.value?.href || "#"}
                >
                  <ContentSdkText field={fields.LegalDocumentsLabel} />
                </a>
                <a
                  className="text-sm text-white hover:underline"
                  href={fields.SitemapLink?.value?.href || "#"}
                >
                  <ContentSdkText field={fields.SitemapLabel} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


