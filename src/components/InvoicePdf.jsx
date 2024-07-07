// components/InvoicePDF.js

import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

const InvoicePDF = ({ order }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.header}>Invoice</Text>
              <Text style={styles.subheader}>Order ID: {order.order_id}</Text>
              <Text style={styles.text}>Customer: {order.user_name}</Text>
              <Text style={styles.text}>
                Total Amount: Rp {order.totalAmount.toLocaleString("id-ID")}
              </Text>
              <Text style={styles.text}>Address:</Text>
              <Text style={styles.text}>
                {order.address_line1}, {order.address_line2}, {order.city}, {order.province}, {order.postal_code}, {order.country}
              </Text>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableColHeader, styles.tableCell]}>Product</Text>
                <Text style={[styles.tableColHeader, styles.tableCell]}>Quantity</Text>
                <Text style={[styles.tableColHeader, styles.tableCell]}>Price</Text>
                <Text style={[styles.tableColHeader, styles.tableCell]}>Total</Text>
              </View>
              {order.order_items.map((item) => (
                <View key={item.product_id} style={styles.tableRow}>
                  <Text style={[styles.tableCol, styles.tableCell]}>{item.product_name}</Text>
                  <Text style={[styles.tableCol, styles.tableCell]}>{item.quantity}</Text>
                  <Text style={[styles.tableCol, styles.tableCell]}>
                    Rp {item.price.toLocaleString("id-ID")}
                  </Text>
                  <Text style={[styles.tableCol, styles.tableCell]}>
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      }
      fileName={`Invoice_${order.order_id}.pdf`}
      style={{ textDecoration: "none", color: "#FFF" }}
    >
      {({ loading }) =>
        loading ? (
          "Loading document..."
        ) : (
          <button className="print-invoice-button btn btn-secondary">
            Download Invoice
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default InvoicePDF;
