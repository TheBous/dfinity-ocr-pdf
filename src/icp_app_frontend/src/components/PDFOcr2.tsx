/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// @ts-ignore
// import pdfTest from "../../../../test.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PDFOcr2() {
    const canvasRef = useRef();

    const [pdfRef, setPdfRef] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [text, setText] = useState('');

    const renderPage = useCallback(async (pageNum, pdf = pdfRef) => {
        if (pdf) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = canvasRef.current;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            await page.render(renderContext);
        }
    }, [pdfRef]);

    useEffect(() => {
        renderPage(currentPage, pdfRef);
    }, [pdfRef, currentPage, renderPage]);

    useEffect(() => {
        const readPDF = async () => {
            try {
                const loadingTask = pdfjsLib.getDocument("https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf");
                // Test 2
                // const loadingTask = pdfjsLib.getDocument("https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf");
                // const loadingTask = pdfjsLib.getDocument(pdfTest);
                const loadedPdf = await loadingTask.promise;
                setPdfRef(loadedPdf);

                const totalPageCount = loadedPdf.numPages;
                const countPromises = [];

                for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
                    const page = await loadedPdf.getPage(currentPage);
                    const textContent = await page.getTextContent();
                    const text = await textContent.items.map(s => s.str).join('');
                    countPromises.push(text);
                }

                const texts = await Promise.all(countPromises);
                console.warn(texts.join());
                const joinedText = texts.join('');
                setText(joinedText);
                return joinedText;
            } catch (error) {
                console.error('Error reading PDF:', error);
            }
        };

        readPDF();
    }, []);

    return (
        <div>
            <canvas style={{ width: '30%', height: 'auto' }} ref={canvasRef}></canvas>
            <h1>Text: </h1>
            <span>
                {text}
            </span>
        </div>)
}
