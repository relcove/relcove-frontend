import { theme } from 'antd';

// Custom theme configuration
export const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary color customization
    colorPrimary: '#2b59c3',
    colorPrimaryHover: '#1e4a9c',
    colorPrimaryActive: '#1a3d85',
    
    // Typography tokens
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyCode: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
    
    // Font sizes
    fontSize: 14,
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
  // Heading font family
  headingFontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  // Paragraph font family
  paragraphFontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  // Font weights
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  
  // Font sizes
  fontSizeXs: '12px',
  fontSizeSm: '14px',
  fontSizeBase: '16px',
  fontSizeLg: '18px',
  fontSizeXl: '20px',
  fontSize2xl: '24px',
  fontSize3xl: '30px',
  fontSize4xl: '36px',
  fontSize5xl: '48px',
  
  // Line heights
  lineHeightTight: 1.25,
  lineHeightSnug: 1.375,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.625,
  lineHeightLoose: 2,
};

// CSS variables for global typography
export const typographyCSS = `
  :root {
    --font-heading: ${typographyConfig.headingFontFamily};
    --font-paragraph: ${typographyConfig.paragraphFontFamily};
    --font-weight-light: ${typographyConfig.fontWeightLight};
    --font-weight-normal: ${typographyConfig.fontWeightNormal};
    --font-weight-medium: ${typographyConfig.fontWeightMedium};
    --font-weight-semibold: ${typographyConfig.fontWeightSemiBold};
    --font-weight-bold: ${typographyConfig.fontWeightBold};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }
  
  p, span, div {
    font-family: var(--font-paragraph);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-normal);
  }
  
  .font-heading {
    font-family: var(--font-heading);
  }
  
  .font-paragraph {
    font-family: var(--font-paragraph);
  }
`;
