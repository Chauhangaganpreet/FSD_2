import React, { useRef, useState } from "react";

function PerformancePanel() {
  const [optimized, setOptimized] = useState(true);

  // Render count without causing another render
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "20px",
        background: "rgba(30,25,45,0.85)",
        border: "1px solid rgba(140,110,255,0.25)",
        marginBottom: "25px",
      }}
    >
      <h2>🧠 Optimization Techniques</h2>

      {/* React.memo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span>React.memo</span>
        <span>✓</span>
      </div>

      {/* useMemo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span>useMemo</span>
        <span>✓</span>
      </div>

      {/* useCallback */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span>useCallback</span>
        <span>✓</span>
      </div>

      {/* Efficient State */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 0",
        }}
      >
        <span>Efficient State</span>
        <span>✓</span>
      </div>

      {/* RENDERING PERFORMANCE */}
      <div
        style={{
          marginTop: "25px",
          padding: "18px",
          borderRadius: "14px",
          background: "rgba(118,88,255,0.10)",
          border: "1px solid rgba(118,88,255,0.25)",
        }}
      >
        <h2>🔄 Rendering Performance</h2>

        <div
          style={{
            padding: "18px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              opacity: 0.7,
            }}
          >
            Component Renders
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            {renderCount.current}
          </div>
        </div>

        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <strong>Rendering Status:</strong>{" "}
          {optimized ? "⚡ Optimized" : "🐢 Non-Optimized"}
        </div>

        <p style={{ opacity: 0.7 }}>
          {optimized
            ? "Memoization techniques help reduce unnecessary rendering."
            : "Normal rendering is enabled for performance comparison."}
        </p>
      </div>

      {/* PERFORMANCE MODE */}
      <div style={{ marginTop: "22px" }}>
        <h2>⚡ Performance Mode</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setOptimized(true)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: optimized ? "#7658ff" : "#252231",
              color: "white",
            }}
          >
            ⚡ Optimized
          </button>

          <button
            onClick={() => setOptimized(false)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: !optimized ? "#7658ff" : "#252231",
              color: "white",
            }}
          >
            🐢 Non-Optimized
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerformancePanel;