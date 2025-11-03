import React from "react";
import WebView from "react-native-webview";

interface CustomWebViewProps {
  html: string;
}

function CustomWebView({ html }: CustomWebViewProps) {
  return (
    <WebView
      source={{
        html,
      }}
      style={{ flex: 1 }}
    />
  );
}

export default CustomWebView;
