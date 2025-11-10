import React from 'react';
import type { Ordinance } from '../types';
import { jsPDF } from 'jspdf';
import { DownloadIcon } from './icons/DownloadIcon';

interface OrdinanceCardProps {
  ordinance: Ordinance;
}

const ExternalLinkIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);


export const OrdinanceCard: React.FC<OrdinanceCardProps> = ({ ordinance }) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const margin = 15;
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = doc.internal.pageSize.getWidth() - margin * 2;
    let y = 20;

    const checkPageBreak = (spaceNeeded: number) => {
        if (y + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    }

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const titleLines = doc.splitTextToSize(ordinance.title, usableWidth);
    checkPageBreak(titleLines.length * 8);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8;

    // Jurisdiction
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(100);
    const jurisdictionLines = doc.splitTextToSize(ordinance.jurisdiction, usableWidth);
    checkPageBreak(jurisdictionLines.length * 5 + 5);
    doc.text(jurisdictionLines, margin, y);
    y += jurisdictionLines.length * 5 + 5;

    // Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0);
    checkPageBreak(8);
    doc.text('Summary', margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(ordinance.summary, usableWidth);
    checkPageBreak(summaryLines.length * 5 + 10);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 5 + 10;

    // Key Points
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    checkPageBreak(8);
    doc.text('Key Points:', margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    ordinance.key_points.forEach(point => {
        const pointLines = doc.splitTextToSize(`• ${point}`, usableWidth - 5); // Indent bullet
        checkPageBreak(pointLines.length * 5 + 2);
        doc.text(pointLines, margin + 5, y);
        y += pointLines.length * 5 + 2;
    });

    const sanitizedJurisdiction = ordinance.jurisdiction.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${sanitizedJurisdiction}_solar_ordinance.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-sky-blue dark:text-sky-blue-400">{ordinance.title}</h3>
                <p className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-4">{ordinance.jurisdiction}</p>
            </div>
            {ordinance.source_url && (
                <a
                    href={ordinance.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-4 px-3 py-1 text-sm bg-slate-100 dark:bg-gray-700 text-sky-blue dark:text-sky-blue-300 rounded-full hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                    Source <ExternalLinkIcon className="w-4 h-4" />
                </a>
            )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">{ordinance.summary}</p>

        <div>
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Key Points:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {ordinance.key_points.map((point, index) => (
              <li key={index} className="pl-2">{point}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-blue dark:text-sky-blue-300 bg-slate-100 dark:bg-gray-700 rounded-md hover:bg-slate-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-blue dark:focus:ring-offset-gray-800 transition-colors"
            aria-label={`Download PDF for ${ordinance.title}`}
          >
            <DownloadIcon className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};