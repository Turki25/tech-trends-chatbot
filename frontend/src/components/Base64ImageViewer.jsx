import React from 'react';

function Base64ImageViewer({ base64String }) {
  if (!base64String) {
    return null; // Don't render anything if there's no image
  }

  return (
    <div className="base64-image-viewer flex justify-center items-center">
      <img
        src={`data:image/png;base64,${base64String}`}
        alt="Base64 Preview"
        className="max-w-4xl max-h-96 object-contain"
      />
    </div>
  );
}

export default Base64ImageViewer;
