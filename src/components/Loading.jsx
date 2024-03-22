import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-75 z-50">
      <div className="loader ease-linear rounded-full border-8 border-red-400 h-24 w-24 animate-bounceIn"></div>
    </div>
  );
}

export default Loading;