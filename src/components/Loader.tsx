import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800"></div>
        </div>
    );
};

export default Loader;
