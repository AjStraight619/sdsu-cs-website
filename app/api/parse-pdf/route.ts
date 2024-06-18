// import { NextRequest, NextResponse } from "next/server";
// import PDFParser from "pdf2json"

// export async function POST(req: NextRequest) {
//   const { body } = await req.json()
//   console.log("body: ", body)
//   const pdfParser = new PDFParser();

//   pdfParser.on('pdfParser_dataError', (errData) => {
//     console.error(errData.parserError);
//     reject(errData.parserError);
//   });

//   pdfParser.on('pdfParser_dataReady', async (pdfData) => {
//     const textContent = pdfParser.getRawTextContent();
//   }


//   return NextResponse.json({ message: "yoyoyoyoyoy" })
// }
