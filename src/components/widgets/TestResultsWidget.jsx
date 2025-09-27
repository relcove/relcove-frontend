import React from 'react';
import { Card, Typography, Progress, Space, theme, Row, Col } from 'antd';
import { TestTube, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const { Text, Title } = Typography;

const TestResultsWidget = () => {
  const { token } = theme.useToken();

  // Mock data for test results
  const testData = [
    { day: 'Mon', passRate: 82 },
    { day: 'Tue', passRate: 85 },
    { day: 'Wed', passRate: 88 },
    { day: 'Thu', passRate: 87 },
    { day: 'Fri', passRate: 90 },
    { day: 'Sat', passRate: 89 },
    { day: 'Sun', passRate: 87 }
  ];

  const currentPassRate = 87;
  const totalTests = 1247;
  const passedTests = 1085;
  const failedTests = 162;

  // Data for donut chart
  const donutData = [
    { name: 'Passed', value: passedTests, color: token.colorSuccess },
    { name: 'Failed', value: failedTests, color: token.colorError }
  ];

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
            <TestTube size={16} color="white" />
          </div>
          <Title level={4} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
            Test Results
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

      {/* First Row - Donut Chart and Stats */}
      <Row gutter={[12, 12]} style={{ marginBottom: '16px', alignItems: 'center' }}>
        {/* Donut Chart */}
        <Col span={6}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: '60px', width: '60px', position: 'relative', marginBottom: '8px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={28}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      backgroundColor: token.colorBgElevated,
                      border: `1px solid ${token.colorBorder}`,
                      borderRadius: token.borderRadius,
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '11px',
                fontWeight: 600,
                color: token.colorText
              }}>
                {currentPassRate}%
              </div>
            </div>
            <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
              Pass Rate
            </Text>
          </div>
        </Col>

        {/* Total Tests */}
        <Col span={6}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text strong style={{ fontSize: '18px', color: token.colorText, marginBottom: '8px' }}>
              {totalTests}
            </Text>
            <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
              Total Tests
            </Text>
          </div>
        </Col>

        {/* Passed Tests */}
        <Col span={6}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text strong style={{ fontSize: '18px', color: token.colorSuccess, marginBottom: '8px' }}>
              {passedTests}
            </Text>
            <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
              Passed
            </Text>
          </div>
        </Col>

        {/* Failed Tests */}
        <Col span={6}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text strong style={{ fontSize: '18px', color: token.colorError, marginBottom: '8px' }}>
              {failedTests}
            </Text>
            <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
              Failed
            </Text>
          </div>
        </Col>
      </Row>

      {/* Second Row - Line Chart */}
      <div style={{ height: '180px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Text style={{ fontSize: '12px', fontWeight: 500 }}>
            Daily Pass Rate Trend
          </Text>
          <Text style={{ 
            fontSize: '10px', 
            color: currentPassRate >= 85 ? token.colorSuccess : token.colorWarning,
            fontWeight: 500
          }}>
            {currentPassRate >= 85 ? '✓ Healthy' : '⚠ Needs Attention'}
          </Text>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={testData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, 'Pass Rate']}
              labelFormatter={(label) => `${label}day`}
              contentStyle={{
                backgroundColor: token.colorBgElevated,
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadius,
                fontSize: '12px'
              }}
            />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 11, fill: token.colorTextSecondary }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: token.colorTextSecondary }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Line 
              type="monotone" 
              dataKey="passRate" 
              stroke={token.colorPrimary} 
              strokeWidth={2}
              dot={{ fill: token.colorPrimary, strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TestResultsWidget;
