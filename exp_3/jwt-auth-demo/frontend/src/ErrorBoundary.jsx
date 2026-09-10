import { Component } from "react";

// Without this, if App (or anything it renders) throws during render, React
// unmounts the tree and you get a silent blank white page with nothing on
// screen — the only trace is a console error most people never check.
// This catches that and shows something actionable instead.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "monospace" }}>
          <h2>Something broke while rendering the app</h2>
          <p>{this.state.error.message}</p>
          <p style={{ color: "#666" }}>
            Check the browser console (F12) for the full stack trace.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;