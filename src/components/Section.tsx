import React from "react";
import Box from "./Box";

const Section: React.FC = ({ children }) => {
  return (
    <Box paddingBottom={12}>
      {children}
    </Box>
  );
};

export default Section;