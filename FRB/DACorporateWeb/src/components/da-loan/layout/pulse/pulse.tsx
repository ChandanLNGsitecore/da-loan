"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/da-loan/ui-premetive/button";
import { Input } from "components/da-loan/ui-premetive/input";
import Link from "next/link";
import { pulseRegistrationSchema, type PulseRegistration } from "lib/schemas";
import { LoanProduct, LoanProductsBlock } from "components/da-loan/blocks/loan-products-block";

const relatedProducts: LoanProduct[] = [
	{
		id: "personal-loan",
		title: "Personal Loan",
		description: "Flexible personal loans for any purpose, with quick online approval and fixed repayments.",
		imageUrl: "/images/carousel-one.png",
		link: "/personal-loans",
	},
	{
		id: "consolidation-loan",
		title: "Consolidation Loan",
		description: "Combine all your debts into a single consolidation loan and enjoy lower monthly payments, fixed interest rates, and the peace of mind that comes with simplified finances.",
		imageUrl: "/images/carousel-two.png",
		link: "/consolidation-loans",
	},
];

export default function PulsePage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PulseRegistration>({
		resolver: zodResolver(pulseRegistrationSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			name: "",
			surname: "",
			cellPhone: "",
			email: "",
			idNumber: "",
			password: "",
		},
	});

	const onSubmit = (data: PulseRegistration) => {
		// Handle form submission
		console.log(data);
	};

	return (
    <main className="bg-white min-h-screen">
      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              DirectAxis Pulse
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-secondary-teal font-semibold mb-6">
              GET YOUR FREE CREDIT RATING
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4 text-primary">
              Pulse is a free and secure financial wellness tool that allows you
              to check your credit rating and learn how to improve it. Already
              registered?{" "}
              <Link href="#" className="font-semibold underline text-link">
                Log in here
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cellPhone"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Cell Phone Number
                  </label>
                  <Input
                    id="cellPhone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter cell phone number"
                    {...register("cellPhone")}
                  />
                  {errors.cellPhone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.cellPhone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="idNumber"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    ID Number
                  </label>
                  <Input
                    id="idNumber"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter ID number"
                    {...register("idNumber")}
                  />
                  {errors.idNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.idNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Surname
                  </label>
                  <Input
                    id="surname"
                    type="text"
                    placeholder="Enter your surname"
                    {...register("surname")}
                  />
                  {errors.surname && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.surname.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Legal Text */}
            <div className="mb-8 text-sm leading-relaxed text-primary">
              <p className="mb-4">
                By clicking &quot;SIGN UP&quot;, you agree to our terms and
                conditions and privacy policy. We will use your information to
                provide you with your free credit rating and to send you
                relevant financial wellness content. You can opt out of
                marketing communications at any time by calling us on{" "}
                <a href="tel:0217643404" className="underline text-link">
                  0217643404
                </a>
                .{" "}
                <Link href="#" className="underline text-link">
                  Click here to read our Privacy Notice.
                </Link>{" "}
                <Link href="#" className="underline text-link">
                  Click here to view these terms.
                </Link>
              </p>
            </div>

            {/* Sign Up Button */}
            <div className="mb-6">
              <Button
                type="submit"
                className="w-full md:w-auto h-12 px-8 uppercase font-semibold rounded-md"
                variant="default"
              >
                SIGN UP
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center md:text-left">
              <Link href="#" className="text-base underline text-link">
                Already registered? Log in here
              </Link>
            </div>
          </form>
        </div>
      </section>
      {/* Related Products */}
      <LoanProductsBlock
        heading="Explore related products"
        description="Discover other DirectAxis products that can help you achieve your financial goals."
        products={relatedProducts}
      />
    </main>
  );
}
