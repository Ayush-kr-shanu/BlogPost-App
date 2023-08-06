// src/ChakraProvider.js
import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

const ChakraUIProvider = ({ children }) => (
  <ChakraProvider>
    <CSSReset />
    {children}
  </ChakraProvider>
);

export default ChakraUIProvider;
