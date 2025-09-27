import { Row, Col, Typography, theme } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DefaultLoader from "../../components/DefaultLoader";
import { SignUp } from "@clerk/clerk-react";

const { Text } = Typography;
const { useToken } = theme;

export default function SignUpPage() {
  const { token } = useToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds before displaying the SignIn component
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DefaultLoader />;
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 94px - 84px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Login Card Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          marginBottom: "24px",
        }}
      >
        <SignUp
          routing="path"
          path="/signup"
          afterSignUpUrl="/"
        />
      </div>

      {/* Login Link */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: token.fontSize,
            color: token.colorTextSecondary,
            fontFamily: token.fontFamily,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: token.colorPrimary,
              textDecoration: "none",
              fontWeight: token.fontWeightMedium,
            }}
          >
            Sign in
          </Link>
        </Text>
      </div>
    </div>
  );
}
