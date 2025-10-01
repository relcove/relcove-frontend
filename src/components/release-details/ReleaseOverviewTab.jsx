import React from "react";
import { Row, Col, theme } from "antd";
import BuildTestResultsWidget from "../widgets/BuildTestResultsWidget";
import ReleaseMilestonesWidget from "../widgets/ReleaseMilestonesWidget";
import BlockersWidget from "../widgets/BlockersWidget";
import ReleaseChecklistSummaryWidget from "../widgets/ReleaseChecklistSummaryWidget";

const ReleaseOverviewTab = ({ release }) => {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Left Column - Build Test Results & Release Milestones */}
        <Col xs={24} lg={14}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
            {/* Build Test Results */}
            <BuildTestResultsWidget
              title="Build Test Results"
              data={[
                { date: "Jan 8", passRate: 85 },
                { date: "Jan 9", passRate: 88 },
                { date: "Jan 10", passRate: 92 },
                { date: "Jan 11", passRate: 89 },
                { date: "Jan 12", passRate: 94 },
                { date: "Jan 13", passRate: 91 },
                { date: "Jan 14", passRate: 96 },
              ]}
              passRate={96}
              recentBuilds={[
                { build: "Build 7", passed: 1234, total: 1284, percentage: 96 },
                { build: "Build 6", passed: 1207, total: 1284, percentage: 94 },
                { build: "Build 5", passed: 1143, total: 1284, percentage: 89 },
              ]}
              height={250}
            />

            {/* Release Milestones */}
            <ReleaseMilestonesWidget
              title="Release Milestones"
              milestones={[
                {
                  id: "milestone-1",
                  title: "Feature Development Complete",
                  date: "Jan 8, 2024",
                  status: "completed",
                  progress: 100,
                },
                {
                  id: "milestone-2",
                  title: "Code Review & Testing",
                  date: "Jan 12, 2024",
                  status: "in-progress",
                  progress: 75,
                },
                {
                  id: "milestone-3",
                  title: "Performance Optimization",
                  date: "Jan 14, 2024",
                  status: "in-progress",
                  progress: 45,
                },
              ]}
            />
          </div>
        </Col>

        {/* Right Column - Blockers & Checklist Summary */}
        <Col xs={24} lg={10}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
            {/* Blockers - Reduced width */}
            <div style={{ flex: "0 0 40%" }}>
              <BlockersWidget
                title="Blockers"
                blockers={[
                  {
                    id: "blocker-1",
                    title: "Critical payment gateway integration failing",
                    severity: "critical",
                    reporter: "Sarah Chen",
                    reportedAt: "2 hours ago",
                    description: "Payment gateway API is returning 500 errors during checkout process",
                  },
                  {
                    id: "blocker-2",
                    title: "Database migration failing on production",
                    severity: "high",
                    reporter: "Mike Johnson",
                    reportedAt: "4 hours ago",
                    description: "Migration script fails when updating user table schema",
                  },
                  {
                    id: "blocker-3",
                    title: "Performance regression in search functionality",
                    severity: "medium",
                    reporter: "Alex Kim",
                    reportedAt: "1 day ago",
                    description: "Search queries taking 3x longer than expected",
                  },
                  {
                    id: "blocker-4",
                    title: "UI inconsistency in mobile view",
                    severity: "low",
                    reporter: "Emma Davis",
                    reportedAt: "2 days ago",
                    description: "Button alignment issues on mobile devices",
                  },
                ]}
              />
            </div>

            {/* Release Checklist Summary */}
            <div style={{ flex: "0 0 40%" }}>
              <ReleaseChecklistSummaryWidget
                title="Release Checklist"
                checklistItems={[
                  {
                    id: "checklist-1",
                    title: "All features tested and approved",
                    team: "QA Team",
                    status: "completed",
                  },
                  {
                    id: "checklist-2",
                    title: "Documentation updated",
                    team: "Tech Writers",
                    status: "completed",
                  },
                  {
                    id: "checklist-3",
                    title: "Performance benchmarks met",
                    team: "DevOps Team",
                    status: "in-progress",
                  },
                  {
                    id: "checklist-4",
                    title: "Security scan completed",
                    team: "Security Team",
                    status: "pending",
                  },
                  {
                    id: "checklist-5",
                    title: "Database migrations tested",
                    team: "Backend Team",
                    status: "blocked",
                  },
                  {
                    id: "checklist-6",
                    title: "Release notes prepared",
                    team: "Product Team",
                    status: "pending",
                  },
                  {
                    id: "checklist-7",
                    title: "Rollback plan ready",
                    team: "DevOps Team",
                    status: "completed",
                  },
                  {
                    id: "checklist-8",
                    title: "Monitoring alerts configured",
                    team: "SRE Team",
                    status: "in-progress",
                  },
                ]}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReleaseOverviewTab;
