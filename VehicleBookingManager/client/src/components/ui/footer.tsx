import { Link } from "wouter";
import { Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-6 w-6 text-secondary-light" />
              <span className="text-white font-poppins font-semibold text-xl">TransportEase</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making transportation booking simple, efficient, and reliable for events and functions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/transportease/" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/vehicles">
                  <a className="text-gray-400 hover:text-white transition-colors">Vehicles</a>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <a className="text-gray-400 hover:text-white transition-colors">Cost Calculator</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">For Customers</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <Link href="/user/login">
                  <a className="text-gray-400 hover:text-white transition-colors">Customer Login</a>
                </Link>
              </li>
              <li>
                <Link href="/vehicles">
                  <a className="text-gray-400 hover:text-white transition-colors">Book a Vehicle</a>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <a className="text-gray-400 hover:text-white transition-colors">Cost Calculator</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">For Vehicle Owners</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/owner/login">
                  <a className="text-gray-400 hover:text-white transition-colors">Owner Login</a>
                </Link>
              </li>
              <li>
                <Link href="/owner/register">
                  <a className="text-gray-400 hover:text-white transition-colors">List Your Vehicle</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Owner Dashboard</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Payment Info</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Owner Guidelines</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} TransportEase. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
