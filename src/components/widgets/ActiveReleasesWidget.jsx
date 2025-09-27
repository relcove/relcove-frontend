import React from 'react';
import { Card, Typography, Space, theme, Progress } from 'antd';
import { Rocket, Clock, Calendar, ExternalLink } from 'lucide-react';

const { Text, Title } = Typography;

const ActiveReleasesWidget = () => {
  const { token } = theme.useToken();

  // Mock data for active releases
  const releases = [
    {
      id: 1,
      version: 'v2.4.0',
      freezeDate: '15/01/2024',
      releaseDate: '22/01/2024',
      health: 92,
      healthColor: token.colorSuccess,
      daysToFreeze: 5,
      daysToRelease: 12
    },
    {
      id: 2,
      version: 'v2.3.8',
      freezeDate: '08/01/2024',
      releaseDate: '12/01/2024',
      health: 78,
      healthColor: token.colorWarning,
      daysToFreeze: 2,
      daysToRelease: 6
    },
    {
      id: 3,
      version: 'v2.3.7',
      freezeDate: '01/01/2024',
      releaseDate: '05/01/2024',
      health: 95,
      healthColor: token.colorSuccess,
      daysToFreeze: -2,
      daysToRelease: 2
    }
  ];

  return (
    <Card
      style={{
        height: '350px',
        borderRadius: token.borderRadiusLG,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${token.colorBorderSecondary}`
      }}
      bodyStyle={{ padding: '20px', height: '100%', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: token.colorPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Rocket size={16} color="white" />
          </div>
          <Title level={4} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
            Active Releases
          </Title>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: token.colorPrimary,
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500
        }}>
          <Text style={{ color: token.colorPrimary }}>View All</Text>
          <ExternalLink size={14} />
        </div>
      </div>

      {/* Releases List */}
      <div style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {releases.map((release) => (
          <div
            key={release.id}
            style={{
              padding: '16px',
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadius,
              border: `1px solid ${token.colorBorderSecondary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Left side - Version and Dates */}
            <div style={{ flex: 1 }}>
              {/* Version */}
              {/* Release Version */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text strong style={{ 
                    fontSize: '14px', 
                    fontWeight: 600,
                    color: token.colorText
                  }}>
                    {release.version}
                  </Text>
                  <Text style={{ 
                    fontSize: '10px', 
                    color: release.daysToRelease <= 7 ? token.colorError : token.colorTextSecondary,
                    backgroundColor: release.daysToRelease <= 7 ? token.colorErrorBg : token.colorBgLayout,
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontWeight: 500
                  }}>
                    {release.daysToRelease <= 0 ? 'Released' : `${release.daysToRelease}d left`}
                  </Text>
                </div>
              </div>

              {/* Dates */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={10} color={token.colorTextSecondary} />
                  <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
                    Code Freeze: {release.freezeDate}
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={10} color={token.colorTextSecondary} />
                  <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
                    Release: {release.releaseDate}
                  </Text>
                </div>
              </div>
            </div>

            {/* Right side - Health Circle */}
            <div style={{ position: 'relative', width: '48px', height: '48px' }}>
              <Progress
                type="circle"
                percent={release.health}
                size={48}
                strokeColor={release.healthColor}
                trailColor={token.colorBorderSecondary}
                strokeWidth={6}
                showInfo={false}
                style={{ position: 'absolute' }}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: release.healthColor,
                fontSize: '11px',
                fontWeight: 600,
                zIndex: 1
              }}>
                {release.health}%
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </Card>
  );
};

export default ActiveReleasesWidget;
