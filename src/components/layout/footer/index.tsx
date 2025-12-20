"use client";
import React from "react";

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4 text-white">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold">
            A
          </div>
          <span className="font-bold text-xl">ASL Redefined</span>
        </div>
        <p className="text-sm text-gray-400">
          Making sign language accessible to everyone through technology and
          community.
        </p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Learn</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="/dictionary"
              className="hover:text-white transition-colors"
            >
              Dictionary
            </a>
          </li>
          <li>
            <a href="/study" className="hover:text-white transition-colors">
              Study
            </a>
          </li>
          <li>
            <a href="/games" className="hover:text-white transition-colors">
              Games
            </a>
          </li>
          <li>
            <a
              href="/daily-signs"
              className="hover:text-white transition-colors"
            >
              Daily Signs
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} ASL Redefined. All rights reserved.
    </div>
  </footer>
);
