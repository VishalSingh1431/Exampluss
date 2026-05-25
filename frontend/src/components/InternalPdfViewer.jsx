import React, { useState, useContext, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AuthContext } from '../context/AuthContext';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const InternalPdfViewer = ({ url, onClose, canDownload }) => {
  const { user } = useContext(AuthContext);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Advanced Features State
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [jumpPage, setJumpPage] = useState('');
  
  const viewerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= numPages) {
      const element = document.getElementById(`pdf_page_${page}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setJumpPage('');
  };

  const scrollToPage = (page) => {
    const element = document.getElementById(`pdf_page_${page}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={viewerRef}
      className="fixed inset-0 z-[100] bg-gray-900 flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()} // Anti-piracy: Disable right-click
    >
      {/* Top Toolbar */}
      <div className="bg-gray-800 text-white p-3 flex flex-wrap justify-between items-center shadow-md gap-3 z-10 border-b border-gray-700">
        
        {/* Left: Close & Thumbnails */}
        <div className="flex items-center space-x-3">
          <button onClick={onClose} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition" title="Close Viewer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button onClick={() => setShowThumbnails(!showThumbnails)} className={`p-2 rounded transition ${showThumbnails ? 'bg-[#008080] text-white' : 'bg-gray-700 hover:bg-gray-600'}`} title="Toggle Thumbnails">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </button>
          <span className="font-semibold hidden sm:inline">Secure Viewer</span>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center space-x-2 bg-gray-700 p-1 rounded-lg">
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-gray-600 rounded" title="Zoom Out">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
          </button>
          <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-gray-600 rounded" title="Zoom In">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </button>
          <div className="w-px h-6 bg-gray-500 mx-1"></div>
          <button onClick={handleRotate} className="p-1.5 hover:bg-gray-600 rounded" title="Rotate">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>

        {/* Right: Navigation & Actions */}
        <div className="flex items-center space-x-3">
          <form onSubmit={handleJumpToPage} className="hidden sm:flex items-center bg-gray-700 rounded overflow-hidden">
            <input 
              type="number" min="1" max={numPages || 1}
              value={jumpPage} onChange={(e) => setJumpPage(e.target.value)}
              placeholder="Page"
              className="w-16 px-2 py-1 bg-transparent text-white text-sm outline-none"
            />
            <span className="text-gray-400 text-sm px-2 border-l border-gray-600">/ {numPages || '?'}</span>
            <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-2 py-1 text-xs font-bold">GO</button>
          </form>

          <button onClick={toggleFullscreen} className="p-2 hover:bg-gray-700 rounded" title="Fullscreen">
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V6m14 4h-4V6m-4 14h4v-4m-14 4h4v-4" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            )}
          </button>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex overflow-hidden relative">
        
        {/* Thumbnails Sidebar */}
        {showThumbnails && (
          <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto p-4 flex flex-col space-y-4 shadow-xl z-10">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Pages</h3>
            {Array.from(new Array(numPages), (el, index) => (
              <button 
                key={`thumb_${index}`}
                onClick={() => scrollToPage(index + 1)}
                className="w-full aspect-[1/1.4] bg-white rounded border-2 border-transparent hover:border-[#008080] focus:border-[#008080] flex items-center justify-center text-gray-400 font-bold text-xl shadow overflow-hidden relative transition"
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* PDF Viewer Scroll Area */}
        <div className="flex-grow overflow-auto bg-gray-900 relative flex justify-center custom-scrollbar">
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008080] mb-4"></div>
              <p>Loading encrypted document...</p>
            </div>
          )}
          
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col items-center py-8"
            loading={null}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div 
                key={`page_${index + 1}`} 
                id={`pdf_page_${index + 1}`}
                className="mb-8 shadow-2xl relative"
                style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease' }}
              >
                {/* Dynamic Watermark Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-wrap justify-center items-center overflow-hidden opacity-5">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span key={i} className="text-4xl font-bold -rotate-45 m-8 text-black select-none">
                      Exampluss
                    </span>
                  ))}
                </div>

                <Page 
                  pageNumber={index + 1} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false}
                  className="bg-white"
                  scale={scale}
                  width={Math.min(window.innerWidth * 0.85, 900)}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default InternalPdfViewer;
