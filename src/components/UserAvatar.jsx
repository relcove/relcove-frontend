import React from 'react';
import { Avatar, Spin } from 'antd';
import { User } from 'lucide-react';
import { theme } from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { useUsersContext } from '../providers/UsersProvider';

const { useToken } = theme;

const UserAvatar = ({ 
  clerkId, 
  size = 'default', 
  showName = false, 
  showEmail = false,
  style = {},
  ...props 
}) => {
  const { token } = useToken();
  const { users, isLoading, error, getUserByClerkId } = useUsersContext();
  // Get the specific user by clerk_id
  const user = getUserByClerkId(clerkId);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...style }}>
        <SkeletonAvatar 
          size={size}
          style={{
            backgroundColor: token.colorFillSecondary,
            color: token.colorTextSecondary
          }}
        />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...style, minWidth: '100px' }}>
        <Avatar 
          size={size}
          icon={<User size={size === 'small' ? 12 : size === 'large' ? 20 : 16} />}
          style={{
            backgroundColor: token.colorErrorBg,
            color: token.colorError
          }}
        />
        {showName && <span style={{ color: token.colorTextSecondary }}>Unknown User</span>}
      </div>
    );
  }

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...style, minWidth: '400px'  }}>
      <Avatar 
        size={size}
        src={user.image_url}
        icon={!user.image_url && <User size={size === 'small' ? 12 : size === 'large' ? 20 : 16} />}
        style={{
          backgroundColor: token.colorPrimaryBg,
          color: token.colorPrimary
        }}
        {...props}
      />
      {(showName || showEmail) && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
          {showName && (
            <span style={{ 
              fontSize: token.fontSizeSM,
              fontWeight: 500,
              color: token.colorText
            }}>
              {fullName}
            </span>
          )}
          {showEmail && (
            <span style={{ 
              fontSize: token.fontSizeXS, 
              color: token.colorTextSecondary,
              marginTop: '1px'
            }}>
              {user.email}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
