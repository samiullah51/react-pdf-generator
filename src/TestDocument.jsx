// src/TestDocument.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

const TestDocument = ({ data }) => (
  <>
    {data.map((item, index) => (
      <View key={index} style={styles.section}>
        <Text style={styles.text}>
          {item.name.first} {item.name.last}
        </Text>
        <Text style={styles.text}>{item.email}</Text>
      </View>
    ))}
    {/* Adding additional content to span multiple pages */}
    {[...Array(50)].map((_, index) => (
      <View key={index + data.length} style={styles.section}>
        <Text style={styles.text}>Additional content section {index + 1}</Text>
        <Text style={styles.text}>More content to increase page length</Text>
      </View>
    ))}
  </>
);

export default TestDocument;
