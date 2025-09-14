import React from 'react';
import { ConfigProvider } from 'antd';
import { customTheme, typographyCSS } from '../theme';

const ThemeProvider = ({ children }) => {
  // Inject typography CSS into the document
  React.useEffect(() => {
    const styleId = 'custom-typography-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = typographyCSS;
    
    // Cleanup function
    return () => {
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, []);

  return (
    <ConfigProvider theme={customTheme}>
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
