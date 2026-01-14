'use client';

import { useState } from 'react';

interface RangeFilter {
  utilityWorkflow: [number, number];
  dataContent: [number, number];
  analysisInsight: [number, number];
  technologyArchitecture: [number, number];
  buyside: boolean;
  sellside: boolean;
  issuerAdvisors: boolean;
}

interface FilterControlsProps {
  filters: RangeFilter;
  onFiltersChange: (filters: RangeFilter) => void;
  vendorCount: number;
}

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
}

interface ToggleFilterProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  color: string;
}

function ToggleFilter({ label, value, onChange, color }: ToggleFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          value ? color : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <label className="text-sm font-medium text-gray-200">{label}</label>
    </div>
  );
}

function RangeSlider({ label, min, max, values, onChange }: RangeSliderProps) {
  const [minVal, maxVal] = values;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal);
    onChange([value, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal);
    onChange([minVal, value]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-200">{label}</label>
        <span className="text-sm text-gray-300 bg-gray-600 px-2 py-1 rounded">
          {minVal} - {maxVal}
        </span>
      </div>

      {/* Simple dual input approach */}
      <div className="space-y-3">
        {/* Min Value Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Min</span>
            <span className="text-xs font-medium text-emerald-400">{minVal}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-min"
          />
        </div>

        {/* Max Value Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Max</span>
            <span className="text-xs font-medium text-blue-400">{maxVal}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-max"
          />
        </div>
      </div>

      {/* Scale markers */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>{max}</span>
      </div>
      
      <style jsx>{`
        .slider-min::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #34d399;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider-max::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #60a5fa;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider-min::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #34d399;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: none;
        }

        .slider-max::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #60a5fa;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: none;
        }

        .slider-min::-webkit-slider-track,
        .slider-max::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: #4b5563;
        }

        .slider-min::-moz-range-track,
        .slider-max::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #4b5563;
          border: none;
        }

        .slider-min:focus,
        .slider-max:focus {
          outline: none;
        }

        .slider-min:focus::-webkit-slider-thumb {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(52, 211, 153, 0.4);
        }

        .slider-max:focus::-webkit-slider-thumb {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(96, 165, 250, 0.4);
        }
      `}</style>
    </div>
  );
}

export default function FilterControls({ filters, onFiltersChange, vendorCount }: FilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (dimension: keyof RangeFilter, values: [number, number]) => {
    onFiltersChange({
      ...filters,
      [dimension]: values
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      utilityWorkflow: [0, 5],
      dataContent: [0, 5],
      analysisInsight: [0, 5],
      technologyArchitecture: [0, 5],
      buyside: true,
      sellside: true,
      issuerAdvisors: true
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.utilityWorkflow[0] > 0 || filters.utilityWorkflow[1] < 5 ||
      filters.dataContent[0] > 0 || filters.dataContent[1] < 5 ||
      filters.analysisInsight[0] > 0 || filters.analysisInsight[1] < 5 ||
      filters.technologyArchitecture[0] > 0 || filters.technologyArchitecture[1] < 5 ||
      !filters.buyside ||
      !filters.sellside ||
      !filters.issuerAdvisors
    );
  };

  const CompactPreview = () => {
    const disabledFilters = [];
    if (!filters.buyside) disabledFilters.push('Buyside: Off');
    if (!filters.sellside) disabledFilters.push('Sellside: Off');
    if (!filters.issuerAdvisors) disabledFilters.push('Issuer/Advisors: Off');
    
    return (
      <div className="flex flex-wrap gap-2 text-xs text-gray-300">
        <span>Utility: {filters.utilityWorkflow[0]}-{filters.utilityWorkflow[1]}</span>
        <span>•</span>
        <span>Data: {filters.dataContent[0]}-{filters.dataContent[1]}</span>
        <span>•</span>
        <span>Insight: {filters.analysisInsight[0]}-{filters.analysisInsight[1]}</span>
        <span>•</span>
        <span>Tech: {filters.technologyArchitecture[0]}-{filters.technologyArchitecture[1]}</span>
        {disabledFilters.length > 0 && (
          <>
            <span>•</span>
            {disabledFilters.map((filter, index) => (
              <span key={index} className="text-red-400">{filter}</span>
            ))}
          </>
        )}
      </div>
    );
  };

  const ChevronIcon = () => (
    <svg 
      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg border border-gray-600 mb-8 overflow-hidden">
      {/* Header - always visible */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-600 transition-colors"
              aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
            >
              <ChevronIcon />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-white">Filter by Capabilities</h2>
              {!isExpanded && (
                <div className="mt-1">
                  <CompactPreview />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              Showing {vendorCount} vendors
            </span>
            {hasActiveFilters() && (
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-gray-200 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable content */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-h-144 opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <RangeSlider
              label="Utility/Operations"
              min={0}
              max={5}
              values={filters.utilityWorkflow}
              onChange={(values) => updateFilter('utilityWorkflow', values)}
            />
            <RangeSlider
              label="Data/Content"
              min={0}
              max={5}
              values={filters.dataContent}
              onChange={(values) => updateFilter('dataContent', values)}
            />
            <RangeSlider
              label="Analysis/Insight"
              min={0}
              max={5}
              values={filters.analysisInsight}
              onChange={(values) => updateFilter('analysisInsight', values)}
            />
            <RangeSlider
              label="Technology/Architecture"
              min={0}
              max={5}
              values={filters.technologyArchitecture}
              onChange={(values) => updateFilter('technologyArchitecture', values)}
            />
          </div>
          
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Market Segments (Show vendors that serve any selected segment)</h3>
            <div className="space-y-4">
              <ToggleFilter
                label="Buyside"
                value={filters.buyside}
                onChange={(value) => onFiltersChange({ ...filters, buyside: value })}
                color="bg-blue-500"
              />
              <ToggleFilter
                label="Sellside"
                value={filters.sellside}
                onChange={(value) => onFiltersChange({ ...filters, sellside: value })}
                color="bg-emerald-500"
              />
              <ToggleFilter
                label="Issuer/Advisors"
                value={filters.issuerAdvisors}
                onChange={(value) => onFiltersChange({ ...filters, issuerAdvisors: value })}
                color="bg-rose-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}