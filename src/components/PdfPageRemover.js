import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPageRemover = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageNumbersToRemove, setPageNumbersToRemove] = useState("");
    const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setModifiedPdfUrl(null); // Clear the previous modified PDF URL
    };

    const handlePageNumbersChange = (e) => {
        setPageNumbersToRemove(e.target.value);
    };

    const removePages = async () => {
        if (!selectedFile) {
            alert("Please select a PDF file.");
            return;
        }

        try {
            const pdfBytes = await fetch(URL.createObjectURL(selectedFile)).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(pdfBytes);

            const pageNumbers = pageNumbersToRemove
                .split(',')
                .map((page) => parseInt(page.trim(), 10))
                .filter((page) => !isNaN(page));

            const pagesToRemove = [];

            // Build a list of pages to remove based on the specified page numbers
            for (const pageNumber of pageNumbers) {
                const pageIndexToRemove = pageNumber - 1;
                if (pageIndexToRemove >= 0 && pageIndexToRemove < pdfDoc.getPageCount()) {
                    pagesToRemove.push(pageIndexToRemove);
                }
            }

            // Remove the pages in reverse order to avoid shifting page indexes
            for (let i = pagesToRemove.length - 1; i >= 0; i--) {
                pdfDoc.removePage(pagesToRemove[i]);
            }

            const modifiedPdfBytes = await pdfDoc.save();

            const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
            const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
            // Set the URL for the modified PDF
            setModifiedPdfUrl(modifiedPdfUrl);
        } catch (error) {
            alert("An error occurred while processing the PDF: " + error.message);
        }
    };
    // Handle the download of the modified PDF
    const downloadModifiedPdf = () => {
        if (modifiedPdfUrl) {
            const downloadLink = document.createElement('a');
            downloadLink.href = modifiedPdfUrl;
            downloadLink.download = 'modified.pdf';
            downloadLink.click();
        }
    };

    return (
        <div className="pdf-container">
            <div className="pdf-remover ">
                <h1>PDF Page Remover</h1>
                <hr />
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <input
                    className='ml-4'
                    type="text"
                    placeholder="Enter Page Number Here (e.g., 2,4,7)"
                    value={pageNumbersToRemove}
                    onChange={handlePageNumbersChange}
                />
                <button className='ml-5' onClick={removePages}>Remove Pages</button>
                <button className='ml-5' onClick={downloadModifiedPdf}>Download Modified PDF</button>
            </div>
            {selectedFile && (
                <div className="pdf-viewer">
                    <h1>Selected PDF:</h1>
                    <hr />
                    <div style={{ height: '400px', overflow: 'auto' }}>
                        {pageNumbersToRemove.split(',').map((pageNumber) => (
                            <div key={pageNumber.trim()}>
                                <Document file={URL.createObjectURL(selectedFile)}>
                                    <Page key={pageNumber.trim()} pageNumber={parseInt(pageNumber.trim(), 10)} />
                                </Document>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PdfPageRemover;
