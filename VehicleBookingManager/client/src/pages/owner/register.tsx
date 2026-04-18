import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/ui/glass-card";

// ✅ Validation schema
const formSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    companyName: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    city: z.string().min(1, { message: "Please select a city" }),
    additionalInfo: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
  message: "You must accept the terms and conditions",
}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const OwnerRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      password: "",
      confirmPassword: "",
      city: "",
      additionalInfo: "",
      terms: false,
    },
  });

  // ✅ Final submit handler
  const onSubmit = async (data: FormValues) => {
    setIsRegistering(true);
    try {
      // Map frontend fields → backend expected payload
      const payload = {
        name: data.fullName,
        companyName: data.companyName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        city: data.city,
        additionalInfo: data.additionalInfo,
      };

      console.log("Sending owner registration payload:", payload);

      const response = await fetch("http://localhost:8090/api/auth/register-owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }

      toast({
        title: "Registration Successful",
        description: "Your owner account has been created. You can now log in and add your vehicles.",
      });

      navigate("/owner/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "There was an error registering your account. Please try again.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Owner Registration - TransportEase</title>
        <meta
          name="description"
          content="Register as a vehicle owner to list your vehicles on TransportEase and start earning"
        />
      </Helmet>

      <section className="py-20 mt-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Register as a Vehicle Owner
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              List your vehicles on our platform and start earning by renting them out for events and functions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="rounded-xl p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Full Name */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <Input {...register("fullName")} placeholder="Enter your full name" />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <Input type="email" {...register("email")} placeholder="Enter your email" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <Input {...register("phone")} placeholder="Enter your phone number" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Company Name */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Company Name</label>
                    <Input {...register("companyName")} placeholder="Enter your company name (optional)" />
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <Input type="password" {...register("password")} placeholder="Create a password" />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                    <Input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">City</label>
                    <Controller
                      control={control}
                      name="city"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chennai">Chennai</SelectItem>
                            <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                            <SelectItem value="Madurai">Madurai</SelectItem>
                            <SelectItem value="Trichy">Trichy</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>

                  {/* Additional Info */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalInfo">
                      Additional Information (Optional)
                    </label>
                    <Textarea
                      id="additionalInfo"
                      className="form-input w-full px-4 py-3 rounded-lg border"
                      placeholder="Mention any additional details..."
                      {...register("additionalInfo")}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                      <div className="mb-6 flex items-center">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                        <label htmlFor="terms" className="ml-2 text-gray-700">
                          I agree to the{" "}
                          <Link href="/terms" className="text-indigo-600 underline">
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                    )}
                  />
                  {errors.terms && <p className="text-red-500 text-sm mb-6">{errors.terms.message}</p>}

                  {/* Submit Button */}
                  <Button type="submit" disabled={isRegistering} className="w-full py-3 text-lg font-semibold">
                    {isRegistering ? "Registering..." : "Register"}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OwnerRegister;
