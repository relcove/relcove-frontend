import React from 'react';
import { Select, Avatar, Spin } from 'antd';
import { User } from 'lucide-react';
import { theme } from 'antd';
import { useUsersContext } from '../providers/UsersProvider';

const { Option } = Select;
const { useToken } = theme;

const UserDropdown = ({ 
  placeholder = "Select user",
  value,
  onChange,
  disabled = false,
  style = {},
  ...props 
}) => {
  const { token } = useToken();
  const { users, isLoading, error } = useUsersContext();

  const renderUserOption = (user) => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User';
    
    return (
      <Option key={user.clerk_id} value={user.clerk_id}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          padding: '4px 0'
        }}>
          <Avatar 
            size="small"
            src={user.image_url}
            icon={!user.image_url && <User size={12} />}
            style={{
              backgroundColor: token.colorPrimaryBg,
              color: token.colorPrimary
            }}
          />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            lineHeight: '1.4'
          }}>
            <span style={{ 
              fontSize: token.fontSizeSM,
              fontWeight: 500,
              color: token.colorText
            }}>
              {fullName}
            </span>
            <span style={{ 
              fontSize: token.fontSizeXS, 
              color: token.colorTextSecondary,
              marginTop: '1px'
            }}>
              {user.email}
            </span>
          </div>
        </div>
      </Option>
    );
  };

  return (
    <Select
      placeholder={isLoading ? "Loading users..." : placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled || isLoading || error}
      loading={isLoading}
      labelInValue={false}
      style={{ 
        borderRadius: token.borderRadius,
        fontSize: token.fontSizeSM,
        minHeight: '48px',
        height: '48px',
        ...style
      }}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      notFoundContent={isLoading ? <Spin size="small" /> : "No users found"}
      {...props}
    >
      {users.map(renderUserOption)}
    </Select>
  );
};

export default UserDropdown;
