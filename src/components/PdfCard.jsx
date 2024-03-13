import React from "react";
import { CgFileDocument } from "react-icons/cg";
import { HiOutlineDownload, HiOutlinePrinter } from "react-icons/hi";
import { FiShare2 } from "react-icons/fi";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import { saveAs } from "file-saver";

const PdfCard = ({ title }) => {
  const styles = {
    container: {
      width: "220px",
      borderRadius: "5px",
      padding: "15px 12px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    },
    flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
    bold: { fontSize: "13px", fontWeight: 600 },
    thin: { fontSize: "11px", color: "#6f6f6f", fontWeight: 500 },
    btn: {
      borderRadius: "3px",
      border: "1px solid gray",
      display: "flex",
      alignItems: "center",
      gap: "2px",
      padding: "3px",
      fontSize: "11px",
      color: "#4f4f4f",
      fontWeight: 600,
      cursor: "pointer",
      userSelect: "none",
    },
  };

  // The encodeURIComponent() function encodes a URI by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character
  // Encodes characters such as ?,=,/,&,:
  // console.log(`?x=${encodeURIComponent('test?')}`);
  // Expected output: "?x=test%3F"
  // console.log(`?x=${encodeURIComponent('шеллы')}`);
  // Expected output: "?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
  const handleShare = async (blob) => {
    await saveAs(blob, `invoice.pdf`);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Invoice`
    )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.flex}>
        <CgFileDocument color="#90e0ef" size={20} />
        <span style={styles.bold}>{title}</span>
      </div>
      <div style={styles.thin}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        eligendi reiciendis fuga doloremque
      </div>

      <div style={{ ...styles.flex, ...{ justifyContent: "space-between" } }}>
        <PDFDownloadLink document={<Invoice />} fileName="invoice.pdf">
          <div style={styles.btn}>
            <HiOutlineDownload size={14} />
            <span>Download</span>
          </div>
        </PDFDownloadLink>

        {/*The `<BlobProvider>` component in the provided code snippet is responsible for generating a Blob (Binary Large Object) from the content provided in the `document` prop, which in this case is the `<Invoice />` component. */}
        <BlobProvider document={<Invoice />}>
          {({ url, blob }) => (
            <a href={url} target="_blank" style={styles.btn}>
              <HiOutlinePrinter size={14} />
              <span>Print</span>
            </a>
          )}
        </BlobProvider>

        <BlobProvider document={<Invoice />}>
          {({ url, blob }) => (
            <div style={styles.btn} onClick={() => handleShare(url, blob)}>
              <FiShare2 size={14} />
              <span>Share</span>
            </div>
          )}
        </BlobProvider>
      </div>
    </div>
  );
};

export default PdfCard;
