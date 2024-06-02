import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const generatePDF = (orderData) => {
  const fileName = 'order_details.pdf';

  const { buyer, seller, orderDate, shippingDate, status, trackingNumber, billingAddress, shippingAddress, price } = orderData;

  const pdfContent = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Order Details</Text>
          <Text style={styles.text}>Order Date: {orderDate}</Text>
          <Text style={styles.text}>Shipping Date: {shippingDate}</Text>
          <Text style={styles.text}>Status: {status}</Text>
          <Text style={styles.text}>Tracking Number: {trackingNumber}</Text>
          <Text style={styles.text}>Buyer Name: {buyer.name}</Text>
          <Text style={styles.text}>Seller Name: {seller.name}</Text>
          <Text style={styles.text}>Billing Address: {billingAddress}</Text>
          <Text style={styles.text}>Shipping Address: {shippingAddress}</Text>
          <Text style={styles.text}>Price: {price} tk</Text>
        </View>
      </Page>
    </Document>
  );

  // Create a Blob object representing the PDF data
  const blob = new Blob([pdfContent], { type: 'application/pdf' });

  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Create a link element to download the PDF
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger a click event on the link to initiate the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);
};

export default generatePDF;
