// Script to handle PDF download
document.getElementById('downloadPDF').addEventListener('click', function () {
    const element = document.querySelector('body');
    html2pdf(element, {
      margin: 1,
      filename: 'scan_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  });
  