import React from 'react';
import { Card, Typography, Space, theme } from 'antd';
import { Code, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const { Text, Title } = Typography;

const FeaturesOverviewWidget = () => {
  const { token } = theme.useToken();

  // Mock data for features overview
  const featuresData = [
    { stage: 'Defined', count: 47, color: token.colorInfo },
    { stage: 'Development', count: 23, color: token.colorWarning },
    { stage: 'QA', count: 8, color: token.colorPrimary },
    { stage: 'Done', count: 16, color: token.colorSuccess }
  ];

  const chartData = featuresData.map(item => ({
    stage: item.stage,
    count: item.count,
    color: item.color
  }));

  return (
    <Card
      style={{
        height: '400px',
        borderRadius: token.borderRadiusLG,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${token.colorBorderSecondary}`
      }}
      bodyStyle={{ padding: '16px', height: '100%', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
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
            <Code size={16} color="white" />
          </div>
          <Title level={4} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
            Features Overview
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

      {/* Chart */}
      <div style={{ height: '200px', marginBottom: '16px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />
            <Tooltip 
              formatter={(value, name) => [value, 'Features']}
              labelFormatter={(label) => `${label} Stage`}
              contentStyle={{
                backgroundColor: token.colorBgElevated,
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadius,
                fontSize: '12px'
              }}
            />
            <XAxis 
              dataKey="stage" 
              tick={{ fontSize: 12, fill: token.colorTextSecondary }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: token.colorTextSecondary }}
              axisLine={false}
              tickLine={false}
              domain={[0, 50]}
              tickCount={6}
            />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '90px',
        gap: '8px'
      }}>
        {featuresData.map((feature, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flex: '1'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: feature.color
            }} />
            <Text style={{ fontSize: '12px', color: token.colorText }}>
              {feature.stage}
            </Text>
            <Text style={{ 
              fontSize: '12px', 
              fontWeight: 600,
              color: token.colorText
            }}>
              {feature.count}
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FeaturesOverviewWidget;
