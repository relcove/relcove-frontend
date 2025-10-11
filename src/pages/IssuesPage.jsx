import React from "react";
import { Card, Typography, Row, Col, Statistic, theme } from "antd";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const { Title } = Typography;

const IssuesPage = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Issues
      </Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Critical Issues"
              value={5}
              prefix={<AlertTriangle color={token.colorError} />}
              valueStyle={{ color: token.colorError }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={12}
              prefix={<Clock color={token.colorWarning} />}
              valueStyle={{ color: token.colorWarning }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Resolved"
              value={28}
              prefix={<CheckCircle color={token.colorSuccess} />}
              valueStyle={{ color: token.colorSuccess }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Issues"
              value={45}
              valueStyle={{ color: token.colorText }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IssuesPage;
