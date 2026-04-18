import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/ui/glass-card";

// ----------------- Zod Schema -----------------
const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

// ----------------- Component -----------------
const UserRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsRegistering(true);
    try {
      const response = await fetch("http://localhost:8090/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword, // ✅ send confirmPassword
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Registration failed");
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      });

      navigate("/user/login");
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
        <title>User Registration - TransportEase</title>
        <meta
          name="description"
          content="Create your account on TransportEase to book vehicles for your events and travels"
        />
      </Helmet>

      <section className="py-20 mt-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">
                  Create Your Account
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Sign up to access exclusive features and manage your transportation bookings.
                </p>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                    alt="TransportEase App Interface"
                    className="rounded-xl shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Registration Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard className="rounded-xl p-8">
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
                        <Input id="firstName" {...register("firstName")} placeholder="John" />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
                        <Input id="lastName" {...register("lastName")} placeholder="Doe" />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                      <Input id="email" type="email" {...register("email")} placeholder="your@email.com" />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <Input id="phone" type="tel" {...register("phone")} placeholder="+91 98765 43210" />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                      <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
                      {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                      <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="••••••••" />
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center mb-6 space-x-2">
                      <input type="checkbox" id="terms" {...register("terms")} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a>
                      </label>
                    </div>
                    {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>}

                    <Button type="submit" className="w-full" disabled={isRegistering}>
                      {isRegistering ? "Registering..." : "Register"}
                    </Button>
                  </form>

                  <p className="mt-6 text-center text-gray-700">
                    Already have an account? <Link href="/user/login" className="text-primary font-semibold underline">Login here</Link>
                  </p>
                </GlassCard>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegister;
