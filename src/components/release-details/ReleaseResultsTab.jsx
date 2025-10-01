import React from "react";
import { Row, Col, Card, Typography, theme, Progress, Statistic } from "antd";
import { CheckCircle, AlertCircle, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const { Title, Text } = Typography;

const ReleaseResultsTab = ({ release }) => {
  const { token } = theme.useToken();

  // Mock test results data
  const testResults = [
    { name: "Unit Tests", passed: 1245, total: 1284, percentage: 97, color: token.colorSuccess },
    { name: "Integration Tests", passed: 892, total: 945, percentage: 94, color: token.colorPrimary },
    { name: "E2E Tests", passed: 156, total: 180, percentage: 87, color: token.colorWarning },
    { name: "Performance Tests", passed: 45, total: 50, percentage: 90, color: token.colorSuccess },
    { name: "Security Tests", passed: 78, total: 85, percentage: 92, color: token.colorPrimary },
  ];

  // Mock performance data
  const performanceData = [
    { date: "Jan 8", responseTime: 120, throughput: 850 },
    { date: "Jan 9", responseTime: 115, throughput: 920 },
    { date: "Jan 10", responseTime: 110, throughput: 980 },
    { date: "Jan 11", responseTime: 108, throughput: 1020 },
    { date: "Jan 12", responseTime: 105, throughput: 1050 },
    { date: "Jan 13", responseTime: 102, throughput: 1080 },
    { date: "Jan 14", responseTime: 98, throughput: 1120 },
  ];

  // Mock quality metrics
  const qualityMetrics = [
    { name: "Code Coverage", value: 87, color: token.colorSuccess },
    { name: "Bug Density", value: 2.3, color: token.colorWarning, unit: "/KLOC" },
    { name: "Technical Debt", value: 15, color: token.colorPrimary, unit: "hours" },
    { name: "Security Score", value: 92, color: token.colorSuccess, unit: "/100" },
  ];

  // Mock deployment data
  const deploymentData = [
    { name: "Successful", value: 12, color: token.colorSuccess },
    { name: "Failed", value: 2, color: token.colorError },
    { name: "Rolled Back", value: 1, color: token.colorWarning },
  ];

  const getPassRateColor = (percentage) => {
    if (percentage >= 95) return token.colorSuccess;
    if (percentage >= 85) return token.colorWarning;
    return token.colorError;
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Test Results Overview */}
      <Card
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          border: `1px solid ${token.colorBorderSecondary}`,
          marginBottom: "24px",
        }}
        bodyStyle={{ padding: "20px" }}
      >
        <Title
          level={4}
          style={{
            fontSize: token.fontSizeLG,
            fontWeight: 600,
            color: token.colorText,
            margin: "0 0 16px 0",
            fontFamily: token.fontFamilyHeading,
          }}
        >
          Test Results Summary
        </Title>

        <Row gutter={[16, 16]}>
          {testResults.map((test, index) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={index}>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: token.colorFillTertiary,
                  borderRadius: token.borderRadius,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <Text
                    style={{
                      fontSize: token.fontSizeSM,
                      fontWeight: 500,
                      color: token.colorText,
                      fontFamily: token.fontFamilyHeading,
                    }}
                  >
                    {test.name}
                  </Text>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {test.percentage >= 95 ? (
                      <CheckCircle size={14} color={token.colorSuccess} />
                    ) : test.percentage >= 85 ? (
                      <AlertCircle size={14} color={token.colorWarning} />
                    ) : (
                      <AlertCircle size={14} color={token.colorError} />
                    )}
                    <Text
                      style={{
                        fontSize: token.fontSizeSM,
                        fontWeight: 600,
                        color: getPassRateColor(test.percentage),
                        fontFamily: token.fontFamilyHeading,
                      }}
                    >
                      {test.percentage}%
                    </Text>
                  </div>
                </div>
                <Progress
                  percent={test.percentage}
                  size="small"
                  strokeColor={getPassRateColor(test.percentage)}
                  trailColor={token.colorBorderSecondary}
                  showInfo={false}
                  style={{ marginBottom: "4px" }}
                />
                <Text
                  style={{
                    fontSize: token.fontSizeXS,
                    color: token.colorTextSecondary,
                    fontFamily: token.fontFamily,
                  }}
                >
                  {test.passed}/{test.total} tests passed
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Performance Trends */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              border: `1px solid ${token.colorBorderSecondary}`,
              height: "100%",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <Title
              level={4}
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                color: token.colorText,
                margin: "0 0 16px 0",
                fontFamily: token.fontFamilyHeading,
              }}
            >
              Performance Trends
            </Title>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />
                <XAxis 
                  dataKey="date" 
                  stroke={token.colorTextSecondary}
                  fontSize={token.fontSizeXS}
                  fontFamily={token.fontFamily}
                />
                <YAxis 
                  stroke={token.colorTextSecondary}
                  fontSize={token.fontSizeXS}
                  fontFamily={token.fontFamily}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: token.colorBgElevated,
                    border: `1px solid ${token.colorBorder}`,
                    borderRadius: token.borderRadius,
                    fontFamily: token.fontFamily,
                  }}
                  labelStyle={{
                    color: token.colorText,
                    fontFamily: token.fontFamilyHeading,
                    fontWeight: 500,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke={token.colorPrimary}
                  strokeWidth={2}
                  dot={{ fill: token.colorPrimary, strokeWidth: 2, r: 3 }}
                  name="Response Time (ms)"
                />
                <Line
                  type="monotone"
                  dataKey="throughput"
                  stroke={token.colorSuccess}
                  strokeWidth={2}
                  dot={{ fill: token.colorSuccess, strokeWidth: 2, r: 3 }}
                  name="Throughput (req/s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Quality Metrics */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              border: `1px solid ${token.colorBorderSecondary}`,
              height: "100%",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <Title
              level={4}
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                color: token.colorText,
                margin: "0 0 16px 0",
                fontFamily: token.fontFamilyHeading,
              }}
            >
              Quality Metrics
            </Title>
            <Row gutter={[16, 16]}>
              {qualityMetrics.map((metric, index) => (
                <Col span={12} key={index}>
                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: token.colorFillTertiary,
                      borderRadius: token.borderRadius,
                      border: `1px solid ${token.colorBorderSecondary}`,
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: token.fontSizeLG,
                        fontWeight: 700,
                        color: metric.color,
                        fontFamily: token.fontFamilyHeading,
                        display: "block",
                      }}
                    >
                      {metric.value}{metric.unit}
                    </Text>
                    <Text
                      style={{
                        fontSize: token.fontSizeXS,
                        color: token.colorTextSecondary,
                        fontFamily: token.fontFamily,
                      }}
                    >
                      {metric.name}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Deployment History */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              border: `1px solid ${token.colorBorderSecondary}`,
              height: "100%",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <Title
              level={4}
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                color: token.colorText,
                margin: "0 0 16px 0",
                fontFamily: token.fontFamilyHeading,
              }}
            >
              Deployment History
            </Title>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deploymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deploymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: token.colorBgElevated,
                    border: `1px solid ${token.colorBorder}`,
                    borderRadius: token.borderRadius,
                    fontFamily: token.fontFamily,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
              {deploymentData.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    {item.name}: {item.value}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Release Statistics */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              border: `1px solid ${token.colorBorderSecondary}`,
              height: "100%",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <Title
              level={4}
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                color: token.colorText,
                margin: "0 0 16px 0",
                fontFamily: token.fontFamilyHeading,
              }}
            >
              Release Statistics
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Total Tests"
                  value={2744}
                  valueStyle={{ 
                    color: token.colorText,
                    fontSize: token.fontSizeLG,
                    fontWeight: 600,
                    fontFamily: token.fontFamilyHeading,
                  }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Pass Rate"
                  value={94.2}
                  suffix="%"
                  valueStyle={{ 
                    color: token.colorSuccess,
                    fontSize: token.fontSizeLG,
                    fontWeight: 600,
                    fontFamily: token.fontFamilyHeading,
                  }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Builds"
                  value={15}
                  valueStyle={{ 
                    color: token.colorText,
                    fontSize: token.fontSizeLG,
                    fontWeight: 600,
                    fontFamily: token.fontFamilyHeading,
                  }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Deployments"
                  value={12}
                  valueStyle={{ 
                    color: token.colorPrimary,
                    fontSize: token.fontSizeLG,
                    fontWeight: 600,
                    fontFamily: token.fontFamilyHeading,
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReleaseResultsTab;
