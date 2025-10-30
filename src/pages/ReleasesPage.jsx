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
import { useNavigate, useParams } from "react-router-dom";
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
import { useReleases, useCreateRelease } from "../services/releases";
import { useProducts } from "../services/products";
import { useUsersContext } from "../providers/UsersProvider";
import { App } from "antd";
import DefaultLoader from "../components/DefaultLoader";
import EmptyState from "../components/EmptyState";
import { formatDate, getDaysToRelease, calculateReleaseHealth, generateInitials } from "../utils/helpers";

const { Title, Text } = Typography;
const { Option } = Select;

const ReleasesPage = () => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [releaseType, setReleaseType] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // API hooks
  const { data: releases = [], isLoading: releasesLoading, error: releasesError } = useReleases(productId);
  const { data: products = [] } = useProducts();
  const { users, getUserByClerkId } = useUsersContext();
  const createReleaseMutation = useCreateRelease();
  
  // Get current product info
  const currentProduct = products.find(p => p.product_id === productId);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "rc":
      case "release candidate":
        return <CheckCircle size={12} color={token.colorPrimary} />;
      case "development":
        return <Clock size={12} color={token.colorWarning} />;
      case "planning":
        return <AlertCircle size={12} color={token.colorTextTertiary} />;
      case "testing":
        return <TestTube size={12} color={token.colorInfo} />;
      case "released":
        return <CheckCircle size={12} color={token.colorSuccess} />;
      default:
        return <Clock size={12} color={token.colorTextTertiary} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "rc":
      case "release candidate":
        return "blue";
      case "development":
        return "orange";
      case "planning":
        return "gray";
      case "testing":
        return "cyan";
      case "released":
        return "green";
      default:
        return "gray";
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

  // Helper function to get user info by clerk_id
  const getUserInfo = (clerkId) => {
    const user = getUserByClerkId(clerkId);
    return user ? {
      name: user.fullName,
      initials: generateInitials(user.fullName),
      avatar: user.image_url
    } : {
      name: "Unknown User",
      initials: "UU",
      avatar: null
    };
  };

  // Mock health calculation (you might want to implement this based on actual metrics)
  const calculateHealth = (release) => {
    // This is a mock calculation - replace with actual health metrics
    const baseHealth = 70;
    const statusBonus = release.status === 'rc' ? 20 : release.status === 'development' ? 10 : 0;
    const daysBonus = Math.max(0, 20 - Math.abs(getDaysToRelease(release.target_release_date) || 0));
    return Math.min(100, baseHealth + statusBonus + daysBonus);
  };

  const filteredReleases = releases.filter((release) => {
    if (releaseType === "all") return true;
    return release.status?.toLowerCase() === releaseType;
  });

  const handleNewRelease = () => {
    setDrawerOpen(true);
  };

  const handleReleaseCreated = (newRelease) => {
    message.success('Release created successfully!');
    setDrawerOpen(false);
    // React Query will automatically refetch and update the list
  };

  const handleReleaseClick = (releaseId) => {
    navigate(`/products/${productId}/releases/${releaseId}`);
  };

  // Loading state
  if (releasesLoading) {
    return <DefaultLoader />;
  }

  // Error state
  if (releasesError) {
    return (
      <div style={{ 
        padding: "24px", 
        backgroundColor: token.colorBgContainer,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <AlertTriangle size={48} color={token.colorError} style={{ marginBottom: '16px' }} />
          <Title level={3} style={{ color: token.colorError }}>
            Failed to load releases
          </Title>
          <Text style={{ color: token.colorTextSecondary }}>
            {releasesError.message || 'Something went wrong. Please try again.'}
          </Text>
        </div>
      </div>
    );
  }

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
                {filteredReleases.filter((r) => r.status === "rc").length}
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
        {filteredReleases.length === 0 ? (
          <EmptyState
            icon="plus"
            title="No releases found"
            description={releaseType === "all" 
              ? "No releases have been created yet." 
              : `No releases found with status "${releaseType}".`
            }
            actionLabel="Create Release"
            onAction={handleNewRelease}
            showAction={true}
            showRefresh={true}
            onRefresh={() => window.location.reload()}
            size="medium"
          />
        ) : (
          filteredReleases.map((release) => {
            const userInfo = getUserInfo(release.owner);
            const statusColor = getStatusColor(release.status);
            const health = calculateReleaseHealth(release);
            const daysToRelease = getDaysToRelease(release.target_release_date);
            
            return (
              <Card
                key={release.release_id}
                hoverable
                onClick={() => handleReleaseClick(release.release_id)}
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
                          statusColor === "blue"
                            ? token.colorPrimaryBg
                            : statusColor === "orange"
                            ? token.colorWarningBg
                            : statusColor === "green"
                            ? token.colorSuccessBg
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
                          statusColor === "blue"
                            ? token.colorPrimary
                            : statusColor === "orange"
                            ? token.colorWarning
                            : statusColor === "green"
                            ? token.colorSuccess
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
                      {release.name}
                    </Title>
                    <Text
                      style={{
                        fontSize: token.fontSizeXS,
                        color: token.colorTextSecondary,
                        fontFamily: token.fontFamily,
                      }}
                    >
                      {release.latest_build_number ? `Build ${release.latest_build_number}` : 'No build'}
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
                      percent={health}
                      size={72}
                      strokeColor={getHealthColor(health)}
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
                        color: getHealthColor(health),
                        fontSize: token.fontSizeSM,
                        fontWeight: 600,
                        zIndex: 1,
                        fontFamily: token.fontFamilyHeading,
                      }}
                    >
                      {health}%
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
                          {formatDate(release.target_release_date)}
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
                          {formatDate(release.actual_release_date || release.target_release_date)}
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
                    Release Info
                  </Text>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: token.colorFillTertiary,
                        borderRadius: token.borderRadiusSM,
                        border: `1px solid ${token.colorBorderSecondary}`,
                      }}
                    >
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
                          Release Type
                        </Text>
                        <Text
                          style={{
                            fontSize: token.fontSizeXS,
                            color: token.colorText,
                            fontFamily: token.fontFamily,
                            fontWeight: 500,
                          }}
                        >
                          {release.release_type || 'Not specified'}
                        </Text>
                      </div>
                    </div>
                    
                    {release.tags && release.tags.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 12px",
                          backgroundColor: token.colorFillTertiary,
                          borderRadius: token.borderRadiusSM,
                          border: `1px solid ${token.colorBorderSecondary}`,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: token.fontSizeXS,
                              color: token.colorTextSecondary,
                              fontFamily: token.fontFamily,
                              display: "block",
                              fontWeight: 500,
                              marginBottom: "4px",
                            }}
                          >
                            Tags
                          </Text>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {release.tags.slice(0, 3).map((tag, index) => (
                              <Tag key={index} size="small" color="blue">
                                {tag}
                              </Tag>
                            ))}
                            {release.tags.length > 3 && (
                              <Tag size="small" color="default">
                                +{release.tags.length - 3} more
                              </Tag>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                {/* Owner */}
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
                    Owner:
                  </Text>

                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 500,
                      fontFamily: token.fontFamilyHeading,
                      color: token.colorText,
                    }}
                  >
                    {userInfo.name}
                  </Text>
                </div>

                {/* Status */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  {getStatusIcon(release.status)}
                  <div>
                    <Text
                      style={{
                        fontSize: token.fontSizeXS,
                        fontWeight: 500,
                        color: token.colorText,
                        fontFamily: token.fontFamilyHeading,
                        display: "block",
                      }}
                    >
                      {release.status}
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
                  <Calendar size={14} color={token.colorTextSecondary} />
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    Created {formatDate(release.created_at)}
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
          );
        })
      )}
    </div>

      {/* New Release Drawer */}
      <NewReleaseDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onReleaseCreated={handleReleaseCreated}
        productId={productId}
      />
    </div>
  );
};

export default ReleasesPage;
