import React from 'react';

function Base64ImageViewer({ base64String }) {
  if (!base64String) {
    return null; // Don't render anything if there's no image
  }

  return (
    <div className="base64-image-viewer flex justify-center items-center p-4">
      <img
        src={`data:image/png;base64,${base64String}`}
        alt="Base64 Preview"
        className="max-w-full max-h-80 sm:max-h-96 object-contain rounded shadow-md"
      />
    </div>
  );
}

export default Base64ImageViewer;