import { useLayout } from '../../../contexts/LayoutContext';
import { ResumeContext } from '../../builder';
import { 
  FaPrint, 
  FaFilePdf,
  FaDownload
} from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '../../pdf/ResumePDF';

const PrintControlPanel: React.FC = () => {
  const { layoutMode, sectionVisibility, fontSizeScale, toggleSectionVisibility } = useLayout();
  const { resumeData } = useContext(ResumeContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [fitsOnePage, setFitsOnePage] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const doc = (
        <ResumePDF
          resumeData={resumeData}
          sectionVisibility={sectionVisibility}
          layoutMode={layoutMode}
        />
      );
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.name.replace(/\s+/g, '_')}_resume.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate page count and fit status
  useEffect(() => {
    const preview = document.querySelector('.preview') as HTMLElement;
    if (preview) {
      const height = preview.offsetHeight;
      const pages = Math.ceil(height / 1122); // 1122px = A4 height with 8mm margins
      setPageCount(pages);
      setFitsOnePage(height <= 1122);
    }
  }, [fontSizeScale, sectionVisibility, layoutMode]);

  const visibleSections = Object.values(sectionVisibility).filter(Boolean).length;
  const totalSections = Object.keys(sectionVisibility).length;

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`exclude-print flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg font-bold transition-all ${
          isExpanded ? 'bg-green-600 text-white' : 'bg-white text-green-600'
        }`}
        aria-label="Toggle Print Panel"
      >
        <FaPrint className="text-lg" />
        <span>Print</span>
        <span className={`w-3 h-3 rounded-full ${
          fitsOnePage ? 'bg-green-500' : pageCount === 2 ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
      </button>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="exclude-print absolute right-0 bottom-14 w-72 bg-white rounded-lg shadow-xl border-2 border-green-600 p-4">
          {/* Page Status */}
          <div className="mb-4 p-3 rounded bg-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Page Count:</span>
              <span className={`font-bold text-lg ${
                pageCount === 1 ? 'text-green-600' : 
                pageCount === 2 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {pageCount} page{pageCount !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {fitsOnePage ? '✅ Fits on 1 page' : 
                `⚠️ Exceeds 1 page by ${pageCount - 1} page${pageCount - 1 !== 1 ? 's' : ''}`
              }
            </div>
          </div>

          {/* Section Visibility Quick Actions */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700 text-sm">Quick Section Toggle</h4>
            <button
              onClick={() => {
                // Toggle all non-essential sections
                Object.keys(sectionVisibility).forEach(key => {
                  if (key !== 'workExperience' && key !== 'education') {
                    toggleSectionVisibility(key);
                  }
                });
              }}
              className="w-full px-3 py-2 bg-green-100 text-green-700 rounded text-sm font-semibold hover:bg-green-200"
            >
              {visibleSections < totalSections / 2 ? 'Show More Sections' : 'Show Less Sections'}
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="w-full px-3 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload className="inline mr-2" />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="w-full px-3 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-all mt-2"
          >
            <FaFilePdf className="inline mr-2" /> Print (Browser)
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-2 w-full px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PrintControlPanel;
