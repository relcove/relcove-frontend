import React from "react";
import { Card, Typography, theme, Progress } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle, TrendingUp } from "lucide-react";

const { Title, Text } = Typography;

const BuildTestResultsWidget = ({ 
  title = "Build Test Results",
  data = [],
  passRate = 96,
  recentBuilds = [],
  showHeader = true,
  height = 200
}) => {
  const { token } = theme.useToken();

  // Default mock data
  const defaultData = [
    { date: "Jan 8", passRate: 85 },
    { date: "Jan 9", passRate: 88 },
    { date: "Jan 10", passRate: 92 },
    { date: "Jan 11", passRate: 89 },
    { date: "Jan 12", passRate: 94 },
    { date: "Jan 13", passRate: 91 },
    { date: "Jan 14", passRate: 96 },
  ];

  const defaultRecentBuilds = [
    { build: "Build 7", passed: 1234, total: 1284, percentage: 96 },
    { build: "Build 6", passed: 1207, total: 1284, percentage: 94 },
    { build: "Build 5", passed: 1143, total: 1284, percentage: 89 },
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const builds = recentBuilds.length > 0 ? recentBuilds : defaultRecentBuilds;

  const getPassRateColor = (rate) => {
    if (rate >= 95) return token.colorSuccess;
    if (rate >= 85) return token.colorWarning;
    return token.colorError;
  };

  return (
    <Card
      style={{
        borderRadius: token.borderRadiusLG,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        border: `1px solid ${token.colorBorderSecondary}`,
        height: "100%",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      {showHeader && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <Title
              level={4}
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                color: token.colorText,
                margin: 0,
                fontFamily: token.fontFamilyHeading,
              }}
            >
              {title}
            </Title>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle size={16} color={getPassRateColor(passRate)} />
              <Text
                style={{
                  fontSize: token.fontSizeLG,
                  fontWeight: 700,
                  color: getPassRateColor(passRate),
                  fontFamily: token.fontFamilyHeading,
                }}
              >
                {passRate}% Pass Rate
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div style={{ marginBottom: "16px" }}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              domain={[80, 100]}
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
              formatter={(value) => [`${value}%`, "Pass Rate"]}
            />
            <Line
              type="monotone"
              dataKey="passRate"
              stroke={token.colorPrimary}
              strokeWidth={3}
              dot={{ fill: token.colorPrimary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: token.colorPrimary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Builds */}
      <div>
        <Text
          style={{
            fontSize: token.fontSizeSM,
            fontWeight: 500,
            color: token.colorText,
            fontFamily: token.fontFamilyHeading,
            display: "block",
            marginBottom: "8px",
          }}
        >
          Recent Builds
        </Text>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {builds.map((build, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                backgroundColor: token.colorFillTertiary,
                borderRadius: token.borderRadiusSM,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Text
                  style={{
                    fontSize: token.fontSizeSM,
                    fontWeight: 500,
                    color: token.colorText,
                    fontFamily: token.fontFamilyHeading,
                  }}
                >
                  {build.build}
                </Text>
                <Text
                  style={{
                    fontSize: token.fontSizeXS,
                    color: token.colorTextSecondary,
                    fontFamily: token.fontFamily,
                  }}
                >
                  {build.passed}/{build.total}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Progress
                  percent={build.percentage}
                  size="small"
                  strokeColor={getPassRateColor(build.percentage)}
                  trailColor={token.colorBorderSecondary}
                  style={{ width: "60px" }}
                  showInfo={false}
                />
                <Text
                  style={{
                    fontSize: token.fontSizeSM,
                    fontWeight: 600,
                    color: getPassRateColor(build.percentage),
                    fontFamily: token.fontFamilyHeading,
                    minWidth: "32px",
                  }}
                >
                  {build.percentage}%
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BuildTestResultsWidget;
