import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Select,
  Space,
  Tag,
  Avatar,
  theme,
  Progress,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  Rocket,
  Plus,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  TestTube,
  ExternalLink,
  Calendar,
  Users,
  Code,
  AlertTriangle,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../components/StandardButtons";
import NewReleaseDrawer from "../components/NewReleaseDrawer";
import ProductSelector from "../components/ProductSelector";

const { Title, Text } = Typography;
const { Option } = Select;

const ReleasesPage = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [releaseType, setReleaseType] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("web-application");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock data for releases with random test types
  const releases = [
    {
      id: "release-1",
      version: "v2.4.1",
      build: "b847",
      status: "rc",
      statusColor: "blue",
      health: 87,
      codeFreezeDate: "2024-02-15",
      releaseDate: "2024-02-28",
      daysToRelease: 12,
      qaLead: { name: "Sarah Chen", initials: "SC", avatar: null },
      pendingBlockers: 3,
      testResults: [
        { type: "Unit Tests", build: "b847", passRate: 94 },
        { type: "Integration Tests", build: "b845", passRate: 89 },
        { type: "E2E Tests", build: "b843", passRate: 76 },
        { type: "Performance Tests", build: "b841", passRate: 92 },
      ],
      security: { issues: 8, critical: 1 },
      lastUpdated: "2 hours ago",
      featuresHealth: {
        healthy: 12,
        atRisk: 3,
        inProgress: 5,
      },
    },
    {
      id: "release-2",
      version: "v2.3.2",
      build: "b623",
      status: "development",
      statusColor: "orange",
      health: 72,
      codeFreezeDate: "2024-03-01",
      releaseDate: "2024-03-15",
      daysToRelease: 28,
      qaLead: { name: "Mike Wilson", initials: "MW", avatar: null },
      pendingBlockers: 7,
      testResults: [
        { type: "API Tests", build: "b623", passRate: 85 },
        { type: "UI Tests", build: "b621", passRate: 78 },
        { type: "Load Tests", build: "b619", passRate: 91 },
        { type: "Security Tests", build: "b617", passRate: 67 },
      ],
      security: { issues: 15, critical: 3 },
      lastUpdated: "4 hours ago",
      featuresHealth: {
        healthy: 8,
        atRisk: 7,
        inProgress: 8,
      },
    },
    {
      id: "release-3",
      version: "v2.5.0",
      build: "b156",
      status: "planning",
      statusColor: "gray",
      health: 45,
      codeFreezeDate: "2024-04-01",
      releaseDate: "2024-04-20",
      daysToRelease: 45,
      qaLead: { name: "Alex Brown", initials: "AB", avatar: null },
      pendingBlockers: 12,
      testResults: [
        { type: "Smoke Tests", build: "b156", passRate: 88 },
        { type: "Regression Tests", build: "b154", passRate: 82 },
        { type: "Compatibility Tests", build: "b152", passRate: 95 },
        { type: "Accessibility Tests", build: "b150", passRate: 73 },
      ],
      security: { issues: 22, critical: 5 },
      lastUpdated: "1 day ago",
      featuresHealth: {
        healthy: 5,
        atRisk: 10,
        inProgress: 12,
      },
    },
    {
      id: "release-4",
      version: "v2.2.3",
      build: "b934",
      status: "rc",
      statusColor: "blue",
      health: 95,
      codeFreezeDate: "2024-01-20",
      releaseDate: "2024-02-05",
      daysToRelease: 3,
      qaLead: { name: "Emma Davis", initials: "ED", avatar: null },
      pendingBlockers: 1,
      testResults: [
        { type: "Functional Tests", build: "b934", passRate: 97 },
        { type: "Database Tests", build: "b932", passRate: 96 },
        { type: "Mobile Tests", build: "b930", passRate: 89 },
        { type: "Cross-browser Tests", build: "b928", passRate: 94 },
      ],
      security: { issues: 4, critical: 0 },
      lastUpdated: "30 minutes ago",
      featuresHealth: {
        healthy: 15,
        atRisk: 1,
        inProgress: 2,
      },
    },
    {
      id: "release-5",
      version: "v2.6.0",
      build: "b78",
      status: "development",
      statusColor: "orange",
      health: 68,
      codeFreezeDate: "2024-05-01",
      releaseDate: "2024-05-25",
      daysToRelease: 62,
      qaLead: { name: "David Lee", initials: "DL", avatar: null },
      pendingBlockers: 9,
      testResults: [
        { type: "Contract Tests", build: "b78", passRate: 79 },
        { type: "Visual Tests", build: "b76", passRate: 84 },
        { type: "Stress Tests", build: "b74", passRate: 71 },
        { type: "Chaos Tests", build: "b72", passRate: 66 },
      ],
      security: { issues: 18, critical: 2 },
      lastUpdated: "6 hours ago",
      featuresHealth: {
        healthy: 6,
        atRisk: 8,
        inProgress: 9,
      },
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "rc":
        return <CheckCircle size={12} color={token.colorPrimary} />;
      case "development":
        return <Clock size={12} color={token.colorWarning} />;
      case "planning":
        return <AlertCircle size={12} color={token.colorTextTertiary} />;
      default:
        return <Clock size={12} color={token.colorTextTertiary} />;
    }
  };

  const getPassRateColor = (rate) => {
    if (rate >= 90) return token.colorSuccess;
    if (rate >= 70) return token.colorWarning;
    return token.colorError;
  };

  const getBlockerColor = (count) => {
    if (count === 0) return token.colorSuccess;
    if (count <= 5) return token.colorWarning;
    return token.colorError;
  };

  const getHealthColor = (health) => {
    if (health >= 90) return token.colorSuccess;
    if (health >= 70) return token.colorWarning;
    return token.colorError;
  };

  const filteredReleases = releases.filter((release) => {
    if (releaseType === "all") return true;
    return release.status === releaseType;
  });

  const handleNewRelease = () => {
    setDrawerOpen(true);
  };

  const handleReleaseCreated = (newRelease) => {
    // Add the new release to the list
    releases.push(newRelease);
    setDrawerOpen(false);
  };

  const handleReleaseClick = (releaseId) => {
    navigate(`/releases/${releaseId}`);
  };

  return (
    <div style={{ padding: "24px", backgroundColor: token.colorBgContainer }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "8px",
            }}
          >
            <div>
              <Title
                level={1}
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: token.colorText,
                  margin: 0,
                  fontFamily: token.fontFamilyHeading,
                  letterSpacing: "-0.025em",
                }}
              >
                Releases
              </Title>
              <Text
                style={{
                  fontSize: "16px",
                  color: token.colorTextSecondary,
                  fontFamily: token.fontFamily,
                  fontWeight: 400,
                }}
              >
                Comprehensive overview of all software releases and their status
              </Text>
            </div>

            {/* Right side - Product Selector */}
            <div>
              <ProductSelector
                selectedProduct={selectedProduct}
                onProductChange={setSelectedProduct}
                showLabel={true}
                width={180}
                size="middle"
              />
            </div>
          </div>
        </div>

      {/* Top Section - Metrics and Controls */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* Left Side - Metrics */}
        <div>
          <Text
            style={{
              fontSize: token.fontSizeXS,
              color: token.colorTextTertiary,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Number of Releases
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Text
                style={{
                  fontSize: token.fontSizeXL,
                  fontWeight: 400,
                  color: token.colorText,
                }}
              >
                {filteredReleases.length}
              </Text>
              <Shield size={20} color="orange" />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Text
                style={{
                  fontSize: token.fontSizeXL,
                  fontWeight: 400,
                  color: token.colorText,
                }}
              >
                {filteredReleases.filter((r) => r.status === "rc").length}
              </Text>
              <Rocket size={20} color={token.colorPrimary}/>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Text
                style={{
                  fontSize: token.fontSizeXL,
                  fontWeight: 400,
                  color: token.colorText,
                }}
              >
                101
              </Text>
                <CheckCircle size={20} color={token.colorSuccess} />
              
            </div>
          </div>
        </div>

        {/* Right Side - Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div>
            <Text
              style={{
                fontSize: token.fontSizeXS,
                color: token.colorTextTertiary,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Add New Release
            </Text>
            <PrimaryButton icon={<Plus size={14} />} onClick={handleNewRelease}>
              New Release
            </PrimaryButton>
          </div>

          <div>
            <Text
              style={{
                fontSize: token.fontSizeXS,
                color: token.colorTextTertiary,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Release Type
            </Text>
            <Select
              value={releaseType}
              onChange={setReleaseType}
              style={{ width: 120 }}
              size="middle"
            >
              <Option value="all">All</Option>
              <Option value="rc">RC Builds</Option>
              <Option value="development">Development</Option>
              <Option value="planning">Planning</Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Release Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filteredReleases.map((release) => (
          <Card
            key={release.id}
            hoverable
            onClick={() => handleReleaseClick(release.id)}
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              border: `1px solid ${token.colorBorderSecondary}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Row gutter={[16, 12]} align="top">
              {/* Left Section - Icon & Version */}
              <Col xs={24} sm={6} md={3}>
                <Row>
                  <Col>
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor:
                          release.statusColor === "blue"
                            ? token.colorPrimaryBg
                            : release.statusColor === "orange"
                            ? token.colorWarningBg
                            : token.colorFillTertiary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "6px",
                        marginRight: "12px",
                      }}
                    >
                      <Rocket
                        size={30}
                        color={
                          release.statusColor === "blue"
                            ? token.colorPrimary
                            : release.statusColor === "orange"
                            ? token.colorWarning
                            : token.colorTextTertiary
                        }
                      />
                    </div>
                  </Col>
                  <Col>
                    <Title
                      level={4}
                      style={{
                        fontSize: token.fontSizeLG,
                        fontWeight: 600,
                        color: token.colorText,
                        margin: "0 0 2px 0",
                        fontFamily: token.fontFamilyHeading,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {release.version}
                    </Title>
                    <Text
                      style={{
                        fontSize: token.fontSizeXS,
                        color: token.colorTextSecondary,
                        fontFamily: token.fontFamily,
                      }}
                    >
                      Build {release.build}
                    </Text>
                  </Col>
                </Row>
              </Col>

              {/* Middle Section - Release Health */}
              <Col xs={24} sm={6} md={3}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 500,
                      marginBottom: "6px",
                      display: "block",
                      fontFamily: token.fontFamilyHeading,
                      color: token.colorText,
                    }}
                  >
                    Release Health
                  </Text>
                  <div
                    style={{
                      position: "relative",
                      width: "72px",
                      height: "72px",
                    }}
                  >
                    <Progress
                      type="circle"
                      percent={release.health}
                      size={72}
                      strokeColor={getHealthColor(release.health)}
                      trailColor={token.colorBorderSecondary}
                      strokeWidth={8}
                      showInfo={false}
                      style={{ position: "absolute" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: getHealthColor(release.health),
                        fontSize: token.fontSizeSM,
                        fontWeight: 600,
                        zIndex: 1,
                        fontFamily: token.fontFamilyHeading,
                      }}
                    >
                      {release.health}%
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 500,
                      marginBottom: "8px",
                      display: "block",
                      fontFamily: token.fontFamilyHeading,
                      color: token.colorText,
                    }}
                  >
                    Milestones
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {/* Code Freeze Date */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 8px",
                        backgroundColor: token.colorFillTertiary,
                        borderRadius: token.borderRadiusSM,
                        border: `1px solid ${token.colorBorderSecondary}`,
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: token.colorWarning,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      >
                        <Code size={12} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: token.fontSizeXS,
                            color: token.colorTextSecondary,
                            fontFamily: token.fontFamily,
                            display: "block",
                            fontWeight: 500,
                          }}
                        >
                          Code Freeze
                        </Text>
                        <Text
                          style={{
                            fontSize: token.fontSizeXS,
                            color: token.colorTextTertiary,
                            fontFamily: token.fontFamily,
                          }}
                        >
                          {release.codeFreezeDate}
                        </Text>
                      </div>
                    </div>

                    {/* Target Release Date */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 8px",
                        backgroundColor: token.colorFillTertiary,
                        borderRadius: token.borderRadiusSM,
                        border: `1px solid ${token.colorBorderSecondary}`,
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: token.colorPrimary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      >
                        <Calendar size={12} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: token.fontSizeXS,
                            color: token.colorTextSecondary,
                            fontFamily: token.fontFamily,
                            display: "block",
                            fontWeight: 500,
                          }}
                        >
                          Target Release
                        </Text>
                        <Text
                          style={{
                            fontSize: token.fontSizeXS,
                            color: token.colorTextTertiary,
                            fontFamily: token.fontFamily,
                          }}
                        >
                          {release.releaseDate}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <div>
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 500,
                      marginBottom: "8px",
                      display: "block",
                      fontFamily: token.fontFamilyHeading,
                      color: token.colorText,
                    }}
                  >
                    Test Results
                  </Text>
                  <Row gutter={[6, 6]}>
                    {release.testResults.map((test, index) => (
                      <Col span={12} key={index}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "6px 8px",
                            backgroundColor: token.colorFillTertiary,
                            borderRadius: token.borderRadiusSM,
                            border: `1px solid ${token.colorBorderSecondary}`,
                          }}
                        >
                          <div
                            style={{
                              flex: "0 0 60px",
                              textAlign: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: token.fontSizeXL,
                                fontWeight: 600,
                                color: getPassRateColor(test.passRate),
                                fontFamily: token.fontFamilyHeading,
                              }}
                            >
                              {test.passRate}%
                            </Text>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontSize: token.fontSizeXS,
                                color: token.colorTextSecondary,
                                fontFamily: token.fontFamily,
                                display: "block",
                                fontWeight: 500,
                              }}
                            >
                              {test.type}
                            </Text>
                            <Text
                              style={{
                                fontSize: token.fontSizeXS,
                                color: token.colorTextTertiary,
                                fontFamily: token.fontFamily,
                              }}
                            >
                              {test.build}
                            </Text>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>

            {/* Bottom Section - QA Lead, Blockers & Security */}
            <div
              style={{
                marginTop: "12px",
                paddingTop: "8px",
                borderTop: `1px solid ${token.colorBorderSecondary}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                {/* QA Lead */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    QA Lead:
                  </Text>

                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 500,
                      fontFamily: token.fontFamilyHeading,
                      color: token.colorText,
                    }}
                  >
                    {release.qaLead.name}
                  </Text>
                </div>

                {/* Blockers */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  <AlertCircle
                    size={14}
                    color={getBlockerColor(release.pendingBlockers)}
                  />
                  <div>
                    <Text
                      style={{
                        fontSize: token.fontSizeXS,
                        fontWeight: 500,
                        color: getBlockerColor(release.pendingBlockers),
                        fontFamily: token.fontFamilyHeading,
                        display: "block",
                      }}
                    >
                      {release.pendingBlockers} Blockers
                    </Text>
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Shield size={14} color={token.colorError} />
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    {release.security.issues} security issues
                  </Text>
                </div>

                <div
                  style={{
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: token.borderRadiusSM,
                    color: token.colorTextSecondary,
                    backgroundColor: token.colorFillTertiary,
                  }}
                >
                  <MoreHorizontal size={14} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Release Drawer */}
      <NewReleaseDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onReleaseCreated={handleReleaseCreated}
      />
    </div>
  );
};

export default ReleasesPage;
