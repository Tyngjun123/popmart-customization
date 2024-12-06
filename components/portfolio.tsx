'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import firebaseConfig from './firebase';
import { initializeApp } from '@firebase/app';
import { getFirestore, doc, getDoc } from '@firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const toyRef = doc(db, 'Toy', 'VtbYiSMqNZe5b4nnA5Fg');


// Define types for countries and MBTI types
type Country = 'Malaysia' | 'Singapore' | 'Japan' | 'China';
type MBTIType = 'intj' | 'enfp' | 'intp' | 'infj';

// Define type for descriptions object
type Descriptions = {
  [key in Country]: {
    [key in MBTIType]: string;
  };
};

const Portfolio = () => {

  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    getDoc(toyRef).then((doc) => {
      if (doc.exists()) {
        const imageData = doc.data().image;
        setImageUrl(imageData);
      }
    });
  }, []);

  // Separate expansion states for each section
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    design: false,
    technical: false,
    development: false
  });
  const [country, setCountry] = useState<Country>('Malaysia');
  const [mbtiType, setMbtiType] = useState<MBTIType>('intj');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('');

  const DEFAULT_IMAGE = '/images/default-character.webp';

  // Download image function
  const downloadImage = () => {
    // Use the current image source (which could be the default image or the character image)
    const imageUrl = imageError ? DEFAULT_IMAGE : currentImageSrc || getCharacterImage(country, mbtiType);
    
    // Fetch the image
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        // Generate a filename based on current selection
        link.download = `${country}_${mbtiType}_character.webp`;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed', error);
        alert('Failed to download image. Please try again.');
      });
  };

   // New function to handle PDF download
   const downloadMiroPDF = () => {
    const pdfPath = '/pdfs/MindMap.pdf'; // Adjust this path to your local PDF file
    // Create a link element
    const link = document.createElement('a');
    link.href = pdfPath;
    
    // Set the download attribute with a filename
    link.download = 'Tree-Thinking-Miro.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle function for individual sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getCharacterImage = (country: Country, mbtiType: MBTIType) => {
    return `/images/${country}-${mbtiType}.webp`;
  };

  const getCharacterDescription = (country: Country, mbtiType: MBTIType) => {
    const descriptions: Descriptions = {
      'Malaysia': {
        'intj': 'Strategic and independent Malaysian innovator',
        'enfp': 'Creative and idealistic Malaysian dreamer',
        'intp': 'Logical and curious Malaysian thinker',
        'infj': 'Insightful and compassionate Malaysian guide',
      },
      'Singapore': {
        'intj': 'Analytical and determined Singaporean strategist',
        'enfp': 'Poetic and gentle Singaporean artist',
        'intp': 'Theoretical and abstract Singaporean philosopher',
        'infj': 'Diplomatic and thoughtful Singaporean counselor',
      },
      'China': {
        'intj': 'Methodical and focused China planner',
        'enfp': 'Harmonious and authentic China creator',
        'intp': 'Innovative and precise China researcher',
        'infj': 'Perceptive and nurturing China mentor',
      },
      'Japan': {
        'intj': 'Decisive and capable Japan architect',
        'enfp': 'Imaginative and free-spirited Japan artist',
        'intp': 'Inventive and adaptable Japan explorer',
        'infj': 'Empathetic and visionary Japan guide',
      },
    };

    return descriptions[country]?.[mbtiType] ?? 'Versatile and unique character';
  };

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    let imageLoadTimeout: NodeJS.Timeout;

    const loadImage = () => {
      setIsImageLoading(true);
      setImageError(false);
      
      loadingTimeout = setTimeout(() => {
        setIsImageLoading(false);
      });

      imageLoadTimeout = setTimeout(() => {
        setImageError(true);
        setIsImageLoading(false);
      });

      const img = new Image();
      img.src = getCharacterImage(country, mbtiType);

      img.onload = () => {
        clearTimeout(imageLoadTimeout);
        setCurrentImageSrc(img.src);
        setImageError(false);
      };

      img.onerror = () => {
        clearTimeout(imageLoadTimeout);
        setImageError(true);
        setCurrentImageSrc(DEFAULT_IMAGE);
      };
    };

    loadImage();

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(imageLoadTimeout);
    };
  }, [country, mbtiType]);

  const handleSelectionChange = (type: 'country' | 'mbti', value: Country | MBTIType) => {
    if (type === 'country') {
      setCountry(value as Country);
    } else {
      setMbtiType(value as MBTIType);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold flex-1 text-center">Pop Mart Customizer</h1>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative flex justify-center w-64 h-64 mx-auto">
              <div className={`
                absolute inset-0 flex items-center justify-center
                transition-opacity duration-300
                ${isImageLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}>
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              </div>

             {/* <img src="{imageData}" alt="Pop Mart Customizer" className="w-64 h-64" /> */ }
              <img 
                src={imageError ? DEFAULT_IMAGE : currentImageSrc || getCharacterImage(country, mbtiType)}
                alt={`${country} ${mbtiType} Character`}
                className={`
                  w-full h-full rounded-lg shadow-md object-cover
                  transition-opacity duration-300
                  ${isImageLoading ? 'opacity-0' : 'opacity-100'}
                `}
              />

              {imageError && !isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
                  <p className="text-sm text-gray-600 text-center px-4">
                    Unable to load character image. Showing default image instead.
                  </p>
                </div>
              )}
            </div>
            <p className="text-center text-sm font-medium text-gray-600">
              {getCharacterDescription(country, mbtiType)}
            </p>

            {/* Download Button - New addition */}
            <div className="flex justify-center mt-4">
              <Button 
                onClick={downloadImage}
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Character Image</span>
              </Button>
            </div>
          </div>

          {/* Selection Controls */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Country</label>
            <Select 
              value={country} 
              onValueChange={(value: Country) => handleSelectionChange('country', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Malaysia">Malaysia</SelectItem>
                <SelectItem value="Singapore">Singapore</SelectItem>
                <SelectItem value="China">China</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select MBTI Type</label>
            <Select 
              value={mbtiType} 
              onValueChange={(value: MBTIType) => handleSelectionChange('mbti', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select MBTI type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infj">INFJ</SelectItem>
                <SelectItem value="intj">INTJ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expandable Sections */}
          {/* Project Overview */}
          <div className="border rounded-lg p-4">
            <button 
              className="flex justify-between items-center w-full"
              onClick={() => toggleSection('overview')}
            >
              <span className="font-medium">Project Overview</span>
              {expandedSections.overview ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {expandedSections.overview && (
              <div>
                <p className="mt-4 text-sm text-gray-600">
                    This project overview provides a high-level summary of the entire software architecture, designed to effectively showcase my understanding from end to end.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                    The Pop Mart Customizer mini program serves as a practical example to showcase my expertise.
                </p>
            </div>
            )}
          </div>

          {/* Design & Planning */}
      <div className="border rounded-lg p-4">
        <button 
          className="flex justify-between items-center w-full"
          onClick={() => toggleSection('design')}
        >
          <span className="font-medium">Design & Planning</span>
          {expandedSections.design ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {expandedSections.design && (
          <div className="my-parent-div">
            <div>
              <h3 className="mt-4 text-sm text-gray-600">
              Design:
              </h3>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
              <li>Wireframes: Motiff(AI Generates UI), Figma</li>
              </ul>
            </div>
            <div>
              <h3 className="mt-4 text-sm text-gray-600">
              Planning:
              </h3>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
              <li>Feature specifications</li>
              <li>Flow chart: Draw.io</li>
              <li 
                onClick={downloadMiroPDF} 
                className="cursor-pointer hover:text-blue-600 hover:underline"
              >
                <div>
                  Tree thinking: Miro
                  <Download className="inline-block ml-2 h-3 w-3" />
                </div>
              </li>      
              <li>User Story</li>
              </ul>
            </div>
          </div>
        )}
      </div>

          {/* Technical & Architecture */}
          <div className="border rounded-lg p-4">
            <button 
              className="flex justify-between items-center w-full"
              onClick={() => toggleSection('technical')}
            >
              <span className="font-medium">Technical & Architecture</span>
              {expandedSections.technical ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {expandedSections.technical && (
            <div className="my-parent-div">
                <div>
                <h3 className="mt-4 text-sm text-gray-600">
                Frontend & Backend:
                </h3>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                    <li>React.js for component-based UI</li>
                    <li>Mobile-optimized responsive design</li>
                    <li>Next.js using server-side rendering.</li>
                </ul>
                </div>
                <div>
                <h3 className="mt-4 text-sm text-gray-600">
                Database:
                </h3>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                <li>Firebase, Real-time data sync</li>
                </ul>
                </div>
                <div>
                <h3 className="mt-4 text-sm text-gray-600">
                Server:
                </h3>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                <li>Vercel</li>
                </ul>
                </div>
                <div>
                <h3 className="mt-4 text-sm text-gray-600">
                Log monitoring:
                </h3>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                <li>Kibana Log</li>
                </ul>
                </div>
            </div>
            )}
          </div>

          {/* Development Process */}
          <div className="border rounded-lg p-4">
            <button 
              className="flex justify-between items-center w-full"
              onClick={() => toggleSection('development')}
            >
              <span className="font-medium">Development Process</span>
              {expandedSections.development ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {expandedSections.development && (
            <div className="my-parent-div">
                <div>
                        <h3 className="mt-4 text-sm text-gray-600">
                        Requirements gathering & design mockups: 
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                            <li>3 hours</li>
                        </ul>
                </div>
                <div>
                        <h3 className="mt-4 text-sm text-gray-600">
                        Development of frontend and backend: 
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                            <li>6 hours</li>
                        </ul>
                </div>
                <div>
                        <h3 className="mt-4 text-sm text-gray-600">
                        Testing and deployment: 
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-sm text-gray-600">
                            <li>3 hours</li>
                        </ul>
                </div>

           </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;