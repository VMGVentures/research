'use client';

import RadarChart from "./RadarCharts";

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

interface VendorGridProps {
  vendors: VendorData[];
}

function VendorCard({ vendor }: { vendor: VendorData }) {
  const totalScore = vendor.utilityWorkflow + vendor.dataContent + vendor.analysisInsight + vendor.technologyArchitecture;
  const maxScore = 20; // Assuming max score of 5 for each category
  const scorePercentage = (totalScore / maxScore) * 100;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMarketSegments = (vendor: VendorData) => {
    const segments = [];
    if (vendor.buyside) segments.push('Buyside');
    if (vendor.sellside) segments.push('Sellside');
    if (vendor.issuerAdvisors) segments.push('Issuer/Advisors');
    return segments;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 truncate">
          {vendor.vendor}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
          {vendor.productCount} Product{vendor.productCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Score bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Score</span>
          <span className="text-sm text-gray-500">{totalScore}/{maxScore}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getScoreColor(scorePercentage)}`}
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Capabilities breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Utility/Operations:</span>
          <span className="font-medium">{vendor.utilityWorkflow}/5</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Data/Content:</span>
          <span className="font-medium">{vendor.dataContent}/5</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Analysis/Insight:</span>
          <span className="font-medium">{vendor.analysisInsight}/5</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Technology:</span>
          <span className="font-medium">{vendor.technologyArchitecture}/5</span>
        </div>
      </div>

      {/* Market segments */}
      <div className="mb-3">
        <span className="text-sm text-gray-600 block mb-2">Market Segments:</span>
        <div className="flex flex-wrap gap-1">
          {getMarketSegments(vendor).map((segment) => (
            <span 
              key={segment}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {segment}
            </span>
          ))}
          {getMarketSegments(vendor).length === 0 && (
            <span className="text-gray-400 text-xs">No segments</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VendorGrid({ vendors }: VendorGridProps) {
  // Sort vendors by total score (descending)
  const sortedVendors = [...vendors].sort((a, b) => {
    const scoreA = a.utilityWorkflow + a.dataContent + a.analysisInsight + a.technologyArchitecture;
    const scoreB = b.utilityWorkflow + b.dataContent + b.analysisInsight + b.technologyArchitecture;
    return scoreB - scoreA;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedVendors.map((vendor, index) => {
        return (
        <div key={vendor.vendor + index}>
            {/* <VendorCard key={vendor.vendor + index} vendor={vendor} /> */}
            <RadarChart key={vendor.vendor + index + 1} vendor={vendor} />
        </div>
      )})}
    </div>
  );
}