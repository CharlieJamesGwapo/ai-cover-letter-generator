import jsPDF from 'jspdf';
import { CoverLetter } from './types';

export function generatePDF(letter: CoverLetter): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - 2 * margin;
  const lineHeight = 7;

  let yPosition = margin;

  // Add header with user info
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(letter.userInfo.name, margin, yPosition);

  yPosition += lineHeight + 5;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const contactInfo = `${letter.userInfo.email} | ${letter.userInfo.phone}`;
  pdf.text(contactInfo, margin, yPosition);

  yPosition += lineHeight + 10;

  // Add date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  pdf.text(dateStr, margin, yPosition);

  yPosition += lineHeight + 10;

  // Add cover letter content
  pdf.setFontSize(11);
  const splitText = pdf.splitTextToSize(letter.content, maxWidth);

  for (const line of splitText) {
    if (yPosition + lineHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    pdf.text(line, margin, yPosition);
    yPosition += lineHeight;
  }

  // Download the PDF
  const filename = `cover-letter-${letter.userInfo.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
  pdf.save(filename);
}
