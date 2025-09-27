import React from 'react';
import { Button, theme } from 'antd';
import { Save, X, Plus } from 'lucide-react';

const { useToken } = theme;

// Standard Primary Button
export const PrimaryButton = ({ 
  children, 
  icon, 
  loading = false, 
  onClick, 
  htmlType = 'button',
  disabled = false,
  ...props 
}) => {
  const { token } = useToken();
  
  return (
    <Button
      type="primary"
      size="middle"
      loading={loading}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
      icon={icon}
      style={{
        borderRadius: token.borderRadius,
        fontWeight: 500,
        fontSize: token.fontSizeSM,
        height: '32px',
        padding: '4px 16px',
        ...props.style
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

// Standard Secondary Button
export const SecondaryButton = ({ 
  children, 
  icon, 
  onClick, 
  disabled = false,
  ...props 
}) => {
  const { token } = useToken();
  
  return (
    <Button
      size="middle"
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      style={{
        borderRadius: token.borderRadius,
        fontWeight: 500,
        fontSize: token.fontSizeSM,
        height: '32px',
        padding: '4px 16px',
        borderColor: token.colorBorder,
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
        ...props.style
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

// Standard Cancel Button
export const CancelButton = ({ onClick, ...props }) => {
  return (
    <SecondaryButton onClick={onClick} {...props}>
      Cancel
    </SecondaryButton>
  );
};

// Standard Save Button
export const SaveButton = ({ loading = false, onClick, children = 'Save', ...props }) => {
  return (
    <PrimaryButton 
      loading={loading} 
      onClick={onClick} 
      icon={<Save size={14} />}
      {...props}
    >
      {children}
    </PrimaryButton>
  );
};

// Standard Create Button
export const CreateButton = ({ loading = false, onClick, children = 'Create', ...props }) => {
  return (
    <PrimaryButton 
      loading={loading} 
      onClick={onClick} 
      icon={<Plus size={14} />}
      {...props}
    >
      {children}
    </PrimaryButton>
  );
};

// Standard Close Button
export const CloseButton = ({ onClick, ...props }) => {
  const { token } = useToken();
  
  return (
    <Button
      type="text"
      size="small"
      onClick={onClick}
      icon={<X size={14} />}
      style={{
        border: 'none',
        boxShadow: 'none',
        color: token.colorTextSecondary,
        ...props.style
      }}
      {...props}
    />
  );
};
