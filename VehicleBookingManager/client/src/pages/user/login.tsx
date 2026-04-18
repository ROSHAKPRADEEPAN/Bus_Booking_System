import { useState } from "react";
import { useLocation, Link } from "wouter";
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UserLogin = () => {
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
      await login(data.email, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back to TransportEase!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error?.message || "Invalid credentials. Please check your email and password.",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>User Login - TransportEase</title>
        <meta
          name="description"
          content="Log in to your TransportEase account to book vehicles and manage your bookings."
        />
      </Helmet>

      <section className="py-20 mt-16 bg-gray-50 min-h-screen flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <GlassCard className="rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Log in to continue booking your preferred vehicles.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 font-medium" htmlFor="password">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-primary-dark text-sm"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center mb-6">
                <Checkbox id="rememberMe" {...register("rememberMe")} />
                <label htmlFor="rememberMe" className="ml-2 text-gray-700 text-sm">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition duration-300 shadow-md"
              >
                {isLoggingIn ? "Logging in..." : "Log In"}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link href="/user/register">
                  <a className="text-primary hover:text-primary-dark font-medium">
                    Sign up
                  </a>
                </Link>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </>
  );
};

export default UserLogin;
