import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

const LoginChoice = () => {
  return (
    <>
      <Helmet>
        <title>Choose Login Type - TransportEase</title>
        <meta
          name="description"
          content="Choose whether to log in as a user or a vehicle owner in TransportEase."
        />
      </Helmet>

      {/* ✅ Same background as Home page (update image path to match your HeroSection) */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen 
        bg-[url('https://cdn.pixabay.com/photo/2017/02/15/17/57/bus-2069419_1280.jpg')] bg-cover bg-center bg-no-repeat"
      >
        {/* ✅ Overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white max-w-xl px-8"
        >
          <h1 className="text-4xl font-bold mb-6">
            Choose Your Login Type
          </h1>
          <p className="text-lg mb-10 text-gray-200">
            Log in as a <span className="font-semibold">User</span> to book vehicles, 
            or as an <span className="font-semibold">Owner</span> to manage your fleet.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/user/login">
              <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Log in as User
              </Button>
            </Link>

            <Link href="/owner/login">
              <Button className="bg-secondary hover:bg-secondary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Log in as Owner
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default LoginChoice;
