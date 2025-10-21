import { AlertTriangle, X } from 'lucide-react';

export const ExitConfirmationModal = () => {

  return (
    // Backdrop for the modal (full screen, darkened)
    <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Modal Content Card */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
        // Prevent closing modal when clicking inside the card
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Wait! Are You Sure?
          </h3>
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Message */}
        <div className="p-5 text-gray-700 dark:text-gray-300">
          <p className="text-lg mb-4">
            If you leave now, you will lose **all unsaved progress** on this lesson.
          </p>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            It looks like you haven't completed this lesson yet.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-b-2xl flex justify-end space-x-3">
          
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-lg font-semibold rounded-xl text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors shadow-md"
          >
            Stay in Lesson
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-lg font-semibold rounded-xl text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md focus:ring-4 focus:ring-red-300 focus:outline-none"
          >
            Leave Anyway
          </button>
        </div>
      </div>
    </div>
  );
};
