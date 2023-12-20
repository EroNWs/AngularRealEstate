import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export class PdfService {
    // Diğer bileşen metodları ve özellikleri

    downloadPdf() {
        const data = document.getElementById('table-to-export'); // Tablonuzun ID'si
        html2canvas(data).then((canvas) => {
            const imgWidth = 208;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const position = 0;
            pdf.addImage(
                contentDataURL,
                'PNG',
                0,
                position,
                imgWidth,
                imgHeight
            );
            pdf.save('MYPdf.pdf');
        });
    }
}
