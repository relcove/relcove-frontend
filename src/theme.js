import { theme } from 'antd';

// Custom theme configuration
export const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary color customization
    colorPrimary: '#2b59c3',
    colorPrimaryHover: '#1e4a9c',
    colorPrimaryActive: '#1a3d85',
    
    // Typography tokens - Modern elegant fonts
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyHeading: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyCode: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
    
    // Font sizes - Reverted to original sizes
    fontSize: 14,
    fontSizeSM: 14,
    fontSizeXS: 12,
    fontSizeLG: 18,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    // Line heights
    lineHeight: 1.5714285714285714,
    lineHeightHeading1: 1.2105263157894737,
    lineHeightHeading2: 1.2666666666666666,
    lineHeightHeading3: 1.3333333333333333,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,
    
    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    
    // Colors
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // Background colors
    colorBgContainer: "rgb(255, 253, 253)",
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    
    // Text colors
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    
    // Border colors
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // Required field styling
    colorRequired: '#ff4d4f',
    colorRequiredHover: '#ff7875',
    
    // Form styling
    colorFormLabel: 'rgba(0, 0, 0, 0.88)',
    colorFormLabelRequired: '#ff4d4f',
    colorFormPlaceholder: 'rgba(0, 0, 0, 0.25)',
  },
  components: {
    // Button component customization
    Button: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    
    // Input component customization
    Input: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      colorBgContainer: '#ffffff',
      activeBg: '#ffffff',
      hoverBg: '#fafafa',
      colorTextSelection: '#2b59c3',
      colorBgTextHover: 'rgba(43, 89, 195, 0.1)',
      colorBgTextActive: 'rgba(43, 89, 195, 0.15)',
      colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
      colorBorder: '#d9d9d9',
      colorPrimary: '#2b59c3',
      colorPrimaryHover: '#1e4a9c',
    },
    
    // Select component customization
    Select: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      colorBgContainer: '#ffffff',
      colorBgElevated: '#ffffff',
      colorBorder: '#d9d9d9',
      colorPrimary: '#2b59c3',
      colorPrimaryHover: '#1e4a9c',
      colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
    },
    
    // Form component customization
    Form: {
      labelColor: 'rgba(0, 0, 0, 0.88)',
      labelRequiredMarkColor: '#ff4d4f',
      labelFontSize: 14,
      labelHeight: 22,
      itemMarginBottom: 16,
    },
    
    // Card component customization
    Card: {
      borderRadius: 8,
      paddingLG: 24,
    },
    
    // Typography component customization
    Typography: {
      titleMarginBottom: '0.5em',
      titleMarginTop: '1.2em',
    },
    
    // Layout component customization
    Layout: {
      bodyBg: '#f5f5f5',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
  },
};

// Typography configuration
export const typographyConfig = {
  // Modern elegant font families
  headingFontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  paragraphFontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  codeFontFamily: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
  
  // Font weights
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  
  // Font sizes - Reverted to original sizes
  fontSizeXs: '12px',
  fontSizeSm: '14px',
  fontSizeBase: '14px',
  fontSizeLg: '16px',
  fontSizeXl: '18px',
  fontSize2xl: '20px',
  fontSize3xl: '24px',
  fontSize4xl: '30px',
  fontSize5xl: '36px',
  fontSize6xl: '48px',
  
  // Line heights
  lineHeightTight: 1.25,
  lineHeightSnug: 1.375,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.625,
  lineHeightLoose: 2,
};

// CSS variables for global typography
export const typographyCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
  
  :root {
    --font-heading: ${typographyConfig.headingFontFamily};
    --font-paragraph: ${typographyConfig.paragraphFontFamily};
    --font-code: ${typographyConfig.codeFontFamily};
    --font-weight-light: ${typographyConfig.fontWeightLight};
    --font-weight-normal: ${typographyConfig.fontWeightNormal};
    --font-weight-medium: ${typographyConfig.fontWeightMedium};
    --font-weight-semibold: ${typographyConfig.fontWeightSemiBold};
    --font-weight-bold: ${typographyConfig.fontWeightBold};
    --font-weight-extrabold: ${typographyConfig.fontWeightExtraBold};
    --line-height-tight: ${typographyConfig.lineHeightTight};
    --line-height-normal: ${typographyConfig.lineHeightNormal};
  }
  
  * {
    font-family: var(--font-paragraph);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    letter-spacing: -0.025em;
  }
  
  p, span, div, button, input, select, textarea {
    font-family: var(--font-paragraph);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-normal);
  }
  
  code, pre {
    font-family: var(--font-code);
  }
  
  .font-heading {
    font-family: var(--font-heading);
  }
  
  .font-paragraph {
    font-family: var(--font-paragraph);
  }
  
  .font-code {
    font-family: var(--font-code);
  }
`;
