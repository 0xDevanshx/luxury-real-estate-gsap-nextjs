"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy.",
  }),
});

type NewsletterFormData = z.infer<typeof schema>;

export default function NewsletterSignup() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted successfully:", data);
    // TODO: wire up real API endpoint here
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="relative w-full bg-[#111] text-white py-24 md:py-32 z-10 border-t border-white/5">
      <div className="max-w-screen-md mx-auto px-6 text-center">
        
        <div className="mb-12">
          <span className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6 block">
            Market Intelligence
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            Stay ahead of the curve.
          </h2>
          <p className="text-lg text-white/60 font-light max-w-lg mx-auto">
            Subscribe to our weekly brief for exclusive off-market listings, macroeconomic analysis, and global real estate trends.
          </p>
        </div>

        <div className="relative min-h-[200px] flex items-center justify-center">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-light mb-2">Welcome to the Inner Circle</h3>
              <p className="text-white/60">Your first market report will arrive shortly.</p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="w-full max-w-md mx-auto text-left animate-in fade-in duration-500"
            >
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full bg-transparent border-b border-white/40 hover:border-white/70 focus:border-white py-4 pr-12 text-lg lg:text-xl outline-none transition-colors placeholder:text-white/40"
                  {...register("email")}
                  disabled={isSubmitting || isSuccess}
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-magnetic
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {isSubmitting ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <ArrowRight size={24} />
                  )}
                </button>
                
                {errors.email && (
                  <p id="email-error" className="absolute -bottom-8 left-0 text-amber-500/90 text-sm mt-2">{errors.email.message}</p>
                )}
                {errors.consent && (
                  <p className="absolute -bottom-14 left-0 text-amber-500/90 text-sm mt-2">{errors.consent.message}</p>
                )}
              </div>

              <div className="flex items-start gap-3 mt-8">
                <div className="flex items-center h-5 mt-1">
                  <input
                    {...register("consent")}
                    id="consent"
                    type="checkbox"
                    disabled={isSubmitting}
                    className={`w-4 h-4 rounded-sm border ${
                      errors.consent ? "border-amber-500" : "border-white/40"
                    } bg-transparent appearance-none checked:bg-white checked:border-white relative transition-colors cursor-pointer checked:after:content-['✓'] checked:after:absolute checked:after:text-black checked:after:text-xs checked:after:font-bold checked:after:left-[2px] checked:after:top-[-1px] disabled:opacity-50`}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="consent" className="text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors">
                    I consent to receiving marketing communications and agree to the <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
                  </label>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
