import React from 'react';
import { Drawer, theme } from 'antd';

const GeneralDrawer = ({ 
  open, 
  onClose, 
  title, 
  icon, 
  children, 
  footer, 
  width = 'min(1000px, 100%)',
  closable = true 
}) => {
  const { token } = theme.useToken();

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {icon && (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: token.colorPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
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
      closable={closable}
        styles={{
        body: { 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        },
        header: {
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          padding: '12px 20px',
          fontSize: token.fontSizeLG,
          fontWeight: 600
        },
        footer: {
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          padding: '12px 20px',
          backgroundColor: token.colorFillQuaternary,
          backdropFilter: 'blur(8px)'
        }
      }}
      footer={footer}
    >
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        paddingRight: '8px'
      }}>
        {children}
      </div>
    </Drawer>
  );
};

export default GeneralDrawer;
