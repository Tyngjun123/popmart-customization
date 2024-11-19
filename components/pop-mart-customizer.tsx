"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, User } from 'lucide-react';

const PopMartCustomizer = () => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('');
  const [mbti, setMbti] = useState('');

  const countries = ['USA', 'Japan', 'China', 'Singapore', 'Malaysia'];
  const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                     'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

const handleCountrySelect = (value: string) => {
  setCountry(value);
  setStep(2);
};

const handleMBTISelect = (value: string) => {
  setMbti(value);
  setStep(3);
};

  const renderPopMartDisplay = () => {
    if (country === 'Malaysia' && mbti === 'INTJ') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Your Malaysian Pop Mart</h2>
          <div className="p-4 sm:p-6 bg-gradient-to-b from-orange-100 to-teal-100 rounded-lg">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-xs">
                <img 
                  src="/images/malaysia-intj.webp"
                  alt="Malaysian Pop Mart Figure" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="text-center space-y-3 w-full">
                <h3 className="font-bold text-lg">Collectible Malaysian Pop Mart</h3>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-white rounded-full shadow text-gray-700 text-sm">
                    {country}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full shadow text-gray-700 text-sm">
                    {mbti}
                  </span>
                </div>
                <p className="text-sm text-gray-700 px-2">
                  Featuring vibrant batik patterns, traditional songkok headwear,
                  and comes with a coconut drink and Malaysian flag. This special edition
                  Pop Mart celebrates Malaysian culture with its detailed design.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Customized Pop Mart</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">Country: {country}</p>
          <p className="text-gray-700">MBTI: {mbti}</p>
          <div className="mt-4 h-48 bg-blue-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-center px-4">Please select Malaysia and INTJ to see the special figure</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-4 sm:p-8">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-4 sm:p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-bold">Select Your Country</h2>
                </div>
                <Select onValueChange={handleCountrySelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-bold">Select Your MBTI</h2>
                </div>
                <Select onValueChange={handleMBTISelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your MBTI type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mbtiTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 3 && renderPopMartDisplay()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PopMartCustomizer;