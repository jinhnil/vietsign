import React from "react";
import {
  BookOpen,
  Calendar,
  Gamepad2,
  Monitor,
  Smartphone,
} from "lucide-react";
import { LearningToolProps, DictionaryMode } from "../../types";

interface HeroProps {
  onOpenTool: (mode: DictionaryMode) => void;
}

const ToolCard: React.FC<LearningToolProps> = ({
  icon,
  title,
  description,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group transform hover:-translate-y-1"
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="text-primary-600 group-hover:text-primary-700 transition-colors bg-green-50 p-3 rounded-full">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onOpenTool }) => {
  return (
    <section className="relative pt-16 min-h-[600px] flex flex-col md:flex-row">
      {/* Left Side: Dark Green */}
      <div className="w-full md:w-1/2 bg-primary-700 text-white flex flex-col justify-center px-8 lg:px-20 py-20 md:py-0 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          ASL Learning <br />
          <span className="text-green-200">Redefined</span>
        </h1>
        <p className="text-green-100 mb-10 max-w-md text-lg">
          Master American Sign Language with our AI-powered interactive
          curriculum. Start your journey today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
            <Monitor size={20} />
            <span>Desktop</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
            <Smartphone size={20} />
            <span>iOS & Android</span>
          </button>
        </div>
      </div>

      {/* Right Side: Light Green/Gray */}
      <div className="w-full md:w-1/2 bg-primary-50 flex flex-col justify-center px-8 lg:px-20 py-20 md:py-0 relative">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Explore Our Learning Tools
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ToolCard
              icon={<BookOpen size={24} />}
              title="Dictionary"
              description="Search by sign, topic, or handshape using AI."
              onClick={() => onOpenTool(DictionaryMode.SEARCH)}
            />
            <ToolCard
              icon={<Calendar size={24} />}
              title="Sign of the Day"
              description="Have a sign delivered to your inbox daily."
              onClick={() => onOpenTool(DictionaryMode.SIGN_OF_DAY)}
            />
            <ToolCard
              icon={<Gamepad2 size={24} />}
              title="Learning Games"
              description="Review signs by topic or handshape."
              onClick={() => onOpenTool(DictionaryMode.GAME)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
