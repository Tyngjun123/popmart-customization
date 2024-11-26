// feature-specs.tsx
'use client'

import React from 'react';
//import { Milestone, Target, Puzzle, Share2, Download, ArrowLeft } from 'lucide-react';

const onBackClick = () => {
  // implementation of onBackClick function
  
};

const FeatureSpecs = () => {
  return (
    <div className="max-w-md mx-auto p-4">
       {/* Back Button */}
       <button 
        onClick={onBackClick}
        className="absolute top-0 left-4 flex items-center text-blue-700 hover:text-blue-900 transition-colors mb-4"
      >
      </button>

      <div>
        {/* Your feature specs content */}
        <span className="font-medium">Project Overview</span>
      </div>
      <div>
        <p className="mt-4 text-sm text-gray-600">
          This project overview provides a high-level summary of the entire software architecture, designed to effectively showcase my understanding from end to end.
        </p>
        <p>The Pop Mart Customizer mini program serves as a practical example to showcase my expertise during interviews.</p>
      </div>
    </div>
  );
};

export default FeatureSpecs;