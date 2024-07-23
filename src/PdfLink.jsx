// src/PDFLink.tsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFile } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import TestDocument from "./TestDocument";

const PDFLink = () => {
  const [error, setError] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [data, setData] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const requestDataUrl = "https://randomuser.me/api/?results=5&inc=name,email";

  const fetchData = () => {
    setRequesting(true);
    fetch(requestDataUrl)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.results);
        setRequesting(false);
      })
      .catch((e) => {
        setError(true);
        setRequesting(false);
        setAttempts(attempts + 1);
        console.error(e);
      });
  };

  return (
    <p>
      {!requesting && !data && !error && (
        <span className="clickable" onClick={() => fetchData()}>
          - Request this document <FontAwesomeIcon icon={faFile} />
        </span>
      )}
      {requesting && (
        <span>
          <FontAwesomeIcon icon={faSpinner} spin /> retrieving document...
        </span>
      )}
      {data && !requesting && !error && (
        <PDFDownloadLink
          document={
            <PdfDocument
              title="Cost Disclosure Document"
              document={<TestDocument data={data} />}
            />
          }
          fileName="cost_disclosure.pdf"
        >
          {({ loading }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink>
      )}
      {!requesting && error && (
        <>
          <span>There has been an error. </span>
          {attempts < 3 ? (
            <span className="clickable" onClick={() => fetchData()}>
              Please try again.
            </span>
          ) : (
            <span>Please try again later.</span>
          )}
        </>
      )}
    </p>
  );
};

export default PDFLink;
