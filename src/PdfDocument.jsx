import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
    color: "black",
    fontFamily: "Arial, sans-serif",
    backgroundImage:
      'url("https://beyond-projects-files.s3.ca-central-1.amazonaws.com/Template/aifaBGimage.png")',
    backgroundSize: "40%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: 8,
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  extraInfo: {
    fontSize: 10,
    textAlign: "center",
  },
});

// Dummy data for the table
const dummyData = [
  { inspector: "Zeeshan", date: "12-09-23", time: "09:20", amount: "100 AED" },
  { inspector: "Ali", date: "13-09-23", time: "10:00", amount: "150 AED" },
  { inspector: "Sara", date: "14-09-23", time: "11:30", amount: "200 AED" },
  { inspector: "Maya", date: "15-09-23", time: "12:45", amount: "250 AED" },
  { inspector: "Omar", date: "16-09-23", time: "13:15", amount: "300 AED" },
  { inspector: "Nina", date: "17-09-23", time: "14:00", amount: "350 AED" },
  { inspector: "Tariq", date: "18-09-23", time: "15:30", amount: "400 AED" },
  { inspector: "Lina", date: "19-09-23", time: "16:00", amount: "450 AED" },
  { inspector: "Rami", date: "20-09-23", time: "17:15", amount: "500 AED" },
  { inspector: "Fadi", date: "21-09-23", time: "18:00", amount: "550 AED" },
];

const PdfDocument = ({ title, document }) => {
  const currentDate = new Date().toLocaleDateString();

  const TableRow = ({ children, style }) => (
    <View style={[styles.tableRow, style]}>{children}</View>
  );

  const TableCell = ({ children, style }) => (
    <View style={[styles.tableCell, style]}>
      <Text>{children}</Text>
    </View>
  );

  return (
    <Document>
      <Page style={styles.body}>
        <View fixed style={styles.header}>
          <Image style={styles.logo} src="./logo.png" />
          <Text>Company Name</Text>
          <Text>Extra Info</Text>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          {document}
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Inspection Detail:</Text>
          <View style={styles.table}>
            <TableRow style={styles.tableHeader}>
              <TableCell>Inspector Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Inspection Amount</TableCell>
            </TableRow>
            {dummyData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.inspector}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.time}</TableCell>
                <TableCell>{data.amount}</TableCell>
              </TableRow>
            ))}
          </View>
        </View>
        <View fixed>
          <Text style={styles.footer}>Footer</Text>
          <Text style={styles.extraInfo}>Generated on {currentDate}</Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

const App = () => (
  <div>
    <PDFDownloadLink
      document={
        <PdfDocument
          title="Invoice Report"
          document={<Text>Invoice Content</Text>}
        />
      }
      fileName="invoice.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export default App;
