import React from 'react';
import { Drawer, theme } from 'antd';

const GeneralDrawer = ({ 
  open, 
  onClose, 
  title, 
  icon, 
  children, 
  footer, 
  width = 'min(600px, 100%)',
  closable = true 
}) => {
  const { token } = theme.useToken();

  return (
    <Drawer
  title={
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {icon && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: token.colorPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}
      <span style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
        {title}
      </span>
    </div>
  }
  open={open}
  onClose={onClose}
  width={width}
  closable={false} // disable default close button
  extra={
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: token.colorText,
      }}
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  }
  styles={{
    body: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    header: {
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      padding: '12px 20px',
      fontSize: token.fontSizeLG,
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between', // pushes title & close icon apart
      alignItems: 'center',
    },
    footer: {
      borderTop: `1px solid ${token.colorBorderSecondary}`,
      padding: '12px 20px',
      backgroundColor: token.colorFillQuaternary,
      backdropFilter: 'blur(8px)',
    },
  }}
  footer={footer}
>
  <div
    style={{
      flex: 1,
      overflow: 'auto',
      paddingRight: '8px',
    }}
  >
    {children}
  </div>
</Drawer>

  );
};

export default GeneralDrawer;
