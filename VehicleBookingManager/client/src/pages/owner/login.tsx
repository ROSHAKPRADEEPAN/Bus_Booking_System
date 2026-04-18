import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import GlassCard from "@/components/ui/glass-card";
import { Link } from "wouter";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OwnerLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoggingIn(true);
    try {
      await login(data.email, data.password, "owner"); // backend login call

      toast({
        title: "Login Successful",
        description: "Welcome back to TransportEase Owner Dashboard!",
      });
      navigate("/owner/dashboard"); // Redirect to owner dashboard page after login
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: (error as Error).message || "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Owner Login - TransportEase</title>
        <meta
          name="description"
          content="Log in to your owner account to manage your vehicles and bookings"
        />
      </Helmet>

      <section className="py-20 mt-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">Vehicle Owner Login</h1>
              <p className="text-gray-600">Access your dashboard to manage your vehicles and bookings</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="rounded-xl p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="form-input w-full px-4 py-3 rounded-lg border"
                      placeholder="your@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-gray-700 font-medium" htmlFor="password">
                        Password
                      </label>
                      <a href="#" className="text-primary hover:text-primary-dark text-sm">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="form-input w-full px-4 py-3 rounded-lg border"
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex items-center mb-6">
                    <Checkbox id="rememberMe" {...register("rememberMe")} />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-gray-700 text-sm"
                    >
                      Remember me
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoggingIn}
                    className="btn-animate w-full bg-secondary hover:bg-secondary-dark text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md"
                  >
                    {isLoggingIn ? "Logging in..." : "Log In as Owner"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an owner account?{" "}
                    <Link href="/owner/register">
                      <a className="text-primary hover:text-primary-dark font-medium">
                        Register as Owner
                      </a>
                    </Link>
                  </p>
                </div>

                <div className="mt-6 text-center border-t border-gray-300 pt-6">
                  <p className="text-gray-600">
                    Looking to book a vehicle?{" "}
                    <Link href="/user/login">
                      <a className="text-primary hover:text-primary-dark font-medium">
                        User Login
                      </a>
                    </Link>
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OwnerLogin;
