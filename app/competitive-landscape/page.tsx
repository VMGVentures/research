'use client';

import { useState, useEffect } from 'react';
import VendorGrid from './components/VendorGrid';
import FilterControls from './components/FilterControls';
import PasswordProtection from '../components/PasswordProtection';



interface VendorData {
  vendor: string;
  productCount: number;
  utilityWorkflow: number;
  dataContent: number;
  analysisInsight: number;
  technologyArchitecture: number;
  buyside: boolean;
  sellside: boolean;
  issuerAdvisors: boolean;
  marketShare: string;
  quality: string;
}

interface RangeFilter {
  utilityWorkflow: [number, number];
  dataContent: [number, number];
  analysisInsight: [number, number];
  technologyArchitecture: [number, number];
}

function parseVendorData(csvContent: string): VendorData[] {
  const lines = csvContent.trim().split('\n');
  
  // Skip header row
  const dataRows = lines.slice(1);
  
  return dataRows.map(row => {
    // Handle CSV parsing more carefully - split by comma but handle quoted fields
    const columns = parseCSVRow(row);
    
    return {
      vendor: columns[0] || '',
      productCount: parseInt(columns[1]) || 0,
      utilityWorkflow: parseInt(columns[2]) || 0,
      dataContent: parseInt(columns[3]) || 0,
      analysisInsight: parseInt(columns[4]) || 0,
      technologyArchitecture: parseInt(columns[5]) || 0,
      buyside: columns[6] === 'TRUE',
      sellside: columns[7] === 'TRUE',
      issuerAdvisors: columns[8] === 'TRUE',
      marketShare: columns[9] || '',
      quality: columns[10] || '',
    };
  });
}

// Simple CSV row parser that handles quoted fields
function parseCSVRow(row: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

function CompetitiveLandscape() {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<VendorData[]>([]);
  const [filters, setFilters] = useState<RangeFilter>({
    utilityWorkflow: [0, 5],
    dataContent: [0, 5],
    analysisInsight: [0, 5],
    technologyArchitecture: [0, 5]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Keyboard shortcut for clearing auth
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.altKey && event.key === '®') {
        event.preventDefault();
        console.log('🔄 Clearing authentication for competitive-landscape...');
        localStorage.removeItem('auth_competitive-landscape');
        window.location.reload();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load vendor data on component mount
  useEffect(() => {
    async function loadVendorData() {
      try {
        const response = await fetch('/comp-data.csv');
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        const csvContent = await response.text();
        const vendorData = parseVendorData(csvContent);
        setVendors(vendorData);
        setFilteredVendors(vendorData);
      } catch (error) {
        console.error('Error loading vendor data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVendorData();
  }, []);

  // Apply filters and search whenever filters, search term, or vendors change
  useEffect(() => {
    const filtered = vendors.filter(vendor => {
      // Apply capability range filters
      const passesRangeFilters = (
        vendor.utilityWorkflow >= filters.utilityWorkflow[0] &&
        vendor.utilityWorkflow <= filters.utilityWorkflow[1] &&
        vendor.dataContent >= filters.dataContent[0] &&
        vendor.dataContent <= filters.dataContent[1] &&
        vendor.analysisInsight >= filters.analysisInsight[0] &&
        vendor.analysisInsight <= filters.analysisInsight[1] &&
        vendor.technologyArchitecture >= filters.technologyArchitecture[0] &&
        vendor.technologyArchitecture <= filters.technologyArchitecture[1]
      );

      // Apply search filter (case-insensitive substring match)
      const passesSearchFilter = searchTerm === '' || 
        vendor.vendor.toLowerCase().includes(searchTerm.toLowerCase());

      return passesRangeFilters && passesSearchFilter;
    });
    
    setFilteredVendors(filtered);
  }, [vendors, filters, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 py-8 flex items-center justify-center">
        <div className="text-white text-lg">Loading vendor data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-white mb-4">
            Competitive Landscape
          </h1>
          <p className="text-md text-gray-300 max-w-2xl mx-auto">
            Overview of {vendors.length} vendors in the competitive landscape with their key metrics and market presence.
          </p>
        </div> */}
        
        <FilterControls 
          filters={filters}
          onFiltersChange={setFilters}
          vendorCount={filteredVendors.length}
        />
        
        {/* Search Input */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg 
                    className="h-4 w-4 text-gray-400 hover:text-gray-300 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-400 text-center">
                Searching for "{searchTerm}" • {filteredVendors.length} result{filteredVendors.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        
        <VendorGrid vendors={filteredVendors} />
      </div>
    </div>
  );
}

export default function CompetitiveLandscapeWithAuth() {
  return (
    <PasswordProtection pageSlug="competitive-landscape">
      <CompetitiveLandscape />
    </PasswordProtection>
  );
}