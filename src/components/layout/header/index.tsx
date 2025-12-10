"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              ASL Redefined
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                isActive("/") ? "text-primary-600" : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/curriculum"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Curriculum
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              About
            </Link>
            <Link
              to="/login"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-gray-50"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 mt-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
