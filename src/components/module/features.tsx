"use client";
import React from "react";
import { PlayCircle, BrainCircuit, Clock } from "lucide-react";
import { FeatureCardProps } from "../../types";

const FeatureItem: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  reverse,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 md:gap-16 py-16`}
    >
      <div className="flex-shrink-0">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-gray-100 shadow-xl flex items-center justify-center text-primary-600 hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div
        className={`text-center ${
          reverse ? "md:text-left" : "md:text-right"
        } max-w-md`}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature 1 */}
        <FeatureItem
          icon={<PlayCircle size={64} className="ml-1" />}
          title="ASL in Motion"
          description="See ASL come alive with video-based learning material and AI-generated textual descriptions for clarity."
          reverse={true}
        />

        {/* Feature 2 */}
        <div className="w-full h-px bg-gray-100 my-4 md:hidden"></div>

        <FeatureItem
          icon={<BrainCircuit size={64} />}
          title="Interactive Learning"
          description="Engage in active learning with interactive exercises, quick lectures, and reviews tailored to your progress."
          reverse={false}
        />

        {/* Feature 3 */}
        <div className="w-full h-px bg-gray-100 my-4 md:hidden"></div>

        <FeatureItem
          icon={<Clock size={64} />}
          title="Time Efficient"
          description="Focus on learning the ASL most relevant to you with a modular curriculum designed for busy schedules."
          reverse={true}
        />
      </div>
    </section>
  );
};
