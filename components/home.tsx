"use client";

import firebaseConfig from './firebase';
import { initializeApp } from '@firebase/app';
import { getFirestore, doc, getDoc } from '@firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const toyRef = doc(db, 'Toy', 'VtbYiSMqNZe5b4nnA5Fg');

getDoc(toyRef).then((doc) => {
  if (doc.exists()) {
    const imageData = doc.data().image;
    console.log(imageData);
    console.log("trying to get image from firebase storage");
  } else {
    console.log("Document does not exist");
  }
}).catch((error) => {
  console.error("Error getting document:", error);
});



const HomeCustomize: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 1st row */}
      <div className="flex justify-between items-center py-4">
        <button className="p-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Pop Mart Customizer</h1>
        <div className="w-6 h-6"></div>
      </div>

      {/* 2nd row */}
      <div className="flex justify-center">
        <img src="https://i.imgur.com/pGwuWbn.jpeg" alt="Pop Mart Customizer" className="w-64 h-64" />

       {/*  
               <img src="/images/malaysia-intj.webp" alt="Pop Mart Customizer" className="w-64 h-64" />
       <img src="{imageData}" alt="Pop Mart Customizer" className="w-64 h-64" />
       <img src="https://drive.google.com/uc?export=view&id=1KmJWfa0kBu3-CPWhKpczalsR4n-WzOVw" alt="Pop Mart Customizer" className="w-64 h-64" />
      <img src="https://drive.usercontent.google.com/download?id=1KmJWfa0kBu3-CPWhKpczalsR4n-WzOVw&export=view&authuser=0" alt="Pop Mart Customizer" className="w-64 h-64" />
      */}
      </div>

      {/* 3rd row */}
      <div className="flex justify-center items-center space-x-4 my-4">
        <h2 className="text-xl font-bold">Customize your own now!</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Generate Toy</button>
      </div>

      {/* 4th row */}
      <div className="my-4">
        <h2 className="text-xl font-bold">Your Customized Pop Mart Toys</h2>
      </div>

      {/* 5th row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-md p-4">
          <img src="https://via.placeholder.com/150x150" alt="USA INTJ Toy" className="w-full h-auto" />
          <h3 className="text-lg font-bold mt-2">USA INTJ Toy</h3>
          <p className="text-gray-500">4.8 (120)</p>
          <p className="text-gray-500">$15.99</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <img src="https://via.placeholder.com/150x150" alt="UK ENFP Toy" className="w-full h-auto" />
          <h3 className="text-lg font-bold mt-2">UK ENFP Toy</h3>
          <p className="text-gray-500">4.5 (108)</p>
          <p className="text-gray-500">$16.99</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomize;