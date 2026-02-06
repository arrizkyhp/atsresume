import { useLayout } from '../../../contexts/LayoutContext';
import { FaColumns, FaExpand, FaCog, FaTimes } from 'react-icons/fa';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { useState } from 'react';

const LayoutControlPanel: React.FC = () => {
  const {
    layoutMode,
    setLayoutMode,
    sectionVisibility,
    toggleSectionVisibility,
    fontSizeScale,
    setFontSizeScale,
  } = useLayout();

  const [isExpanded, setIsExpanded] = useState(false);

  const sections = [
    { key: 'summary', label: 'Summary', icon: '📝' },
    { key: 'education', label: 'Education', icon: '🎓' },
    { key: 'workExperience', label: 'Work Experience', icon: '💼' },
    { key: 'projects', label: 'Projects', icon: '🚀' },
    { key: 'skills', label: 'Skills', icon: '⚡' },
    { key: 'languages', label: 'Languages', icon: '🌍' },
    { key: 'certifications', label: 'Certifications', icon: '📜' },
  ];

  const layouts = [
    { mode: 'three-column' as const, label: '3-Column', icon: <FaColumns />, description: 'Left: 1 col, Right: 2 cols' },
    { mode: 'two-column' as const, label: '2-Column', icon: <FaColumns />, description: 'Equal width columns' },
    { mode: 'full-width' as const, label: 'Full Width', icon: <FaExpand />, description: 'Single column, full width' },
  ];

  const visibleSections = Object.values(sectionVisibility).filter(Boolean).length;
  const totalSections = Object.keys(sectionVisibility).length;

  return (
    <div className="fixed top-20 left-10 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`exclude-print flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg font-bold transition-all ${
          isExpanded ? 'bg-fuchsia-700 text-white' : 'bg-white text-fuchsia-600'
        }`}
        aria-label="Toggle Layout Settings"
        title="Layout Settings"
      >
        <FaCog className="text-lg" />
        <span>Layout</span>
      </button>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="exclude-print absolute left-0 top-14 w-80 bg-white rounded-lg shadow-xl border-2 border-fuchsia-700 p-4 max-h-[80vh] overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-fuchsia-700">Layout Settings</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Layout Mode Selection */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700 text-sm">Layout Mode</h4>
            <div className="grid grid-cols-3 gap-2">
              {layouts.map(({ mode, label, icon, description }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLayoutMode(mode)}
                  className={`p-2 border-2 rounded flex flex-col items-center gap-1 transition-all ${
                    layoutMode === mode
                      ? 'border-fuchsia-700 bg-fuchsia-100'
                      : 'border-gray-300 hover:border-fuchsia-500'
                  }`}
                  title={description}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Control */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700 text-sm">Font Size</h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFontSizeScale(Math.max(80, fontSizeScale - 5))}
                className="px-3 py-1 bg-gray-200 rounded text-black font-bold hover:bg-gray-300 transition-colors"
                aria-label="Decrease font size"
              >
                -
              </button>
              <span className="flex-1 text-center font-mono font-semibold text-gray-700">{fontSizeScale}%</span>
              <button
                type="button"
                onClick={() => setFontSizeScale(Math.min(120, fontSizeScale + 5))}
                className="px-3 py-1 bg-gray-200 rounded text-black font-bold hover:bg-gray-300 transition-colors"
                aria-label="Increase font size"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setFontSizeScale(100)}
                className="px-3 py-1 bg-fuchsia-700 rounded text-white text-sm hover:bg-fuchsia-600 transition-colors"
                aria-label="Reset font size"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Section Visibility Toggles */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700 text-sm">Section Visibility</h4>
            <div className="text-xs text-gray-600 mb-2">
              {visibleSections} of {totalSections} visible
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sections.map(({ key, label, icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSectionVisibility(key)}
                  className={`flex items-center gap-2 p-2 rounded transition-all ${
                    sectionVisibility[key]
                      ? 'bg-white text-black border border-gray-300'
                      : 'bg-gray-200 text-gray-600 border border-gray-300'
                  }`}
                  aria-label={`Toggle ${label}`}
                >
                  {sectionVisibility[key] ? (
                    <MdCheckCircle className="text-green-600 text-lg" />
                  ) : (
                    <MdCancel className="text-gray-500 text-lg" />
                  )}
                  <span className="text-xs">{icon}</span>
                  <span className="text-xs font-medium flex-1 text-left">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-Fit Button */}
          <div>
            <button
              type="button"
              onClick={() => {
                const preview = document.querySelector('.preview') as HTMLElement;
                if (preview) {
                  let scale = 100;
                  while (preview.offsetHeight > 1122 && scale > 70) {
                    scale -= 2;
                    setFontSizeScale(scale);
                  }
                }
              }}
              className="w-full p-3 bg-fuchsia-700 text-white rounded font-semibold hover:bg-fuchsia-600 transition-all"
              aria-label="Auto-fit to one page"
            >
              🎯 Auto-Fit to 1 Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutControlPanel;
