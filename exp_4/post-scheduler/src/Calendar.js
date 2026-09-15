import React, { useMemo, useCallback, useState } from "react";

const defaultPosts = [
  {
    id: 1,
    title: "Instagram Campaign",
    platform: "Instagram",
    date: "2026-09-10",
    time: "10:00",
  },
  {
    id: 2,
    title: "Facebook Update",
    platform: "Facebook",
    date: "2026-09-11",
    time: "12:00",
  },
  {
    id: 3,
    title: "Twitter Post",
    platform: "Twitter",
    date: "2026-09-12",
    time: "14:00",
  },
  {
    id: 4,
    title: "LinkedIn Article",
    platform: "LinkedIn",
    date: "2026-09-13",
    time: "16:00",
  },
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PostCard = React.memo(({ post, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, post)}
      style={{
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "10px",
        background: "rgba(100, 70, 220, 0.25)",
        border: "1px solid rgba(130, 100, 255, 0.5)",
        cursor: "grab",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {post.title}
      </div>

      <div style={{ fontSize: "13px", opacity: 0.8 }}>
        📱 {post.platform}
      </div>

      <div style={{ fontSize: "13px", marginTop: "4px" }}>
        🕐 {post.time}
      </div>
    </div>
  );
});

function Calendar({ posts = defaultPosts }) {
  const [view, setView] = useState("week");
  const [optimized, setOptimized] = useState(true);
  const [calendarPosts, setCalendarPosts] = useState(posts);
  const [draggedPost, setDraggedPost] = useState(null);

  // -----------------------------
  // OPTIMIZED DATA CALCULATION
  // -----------------------------
  const groupedPosts = useMemo(() => {
    const result = {};

    days.forEach((day) => {
      result[day] = [];
    });

    calendarPosts.forEach((post) => {
      const date = new Date(post.date);

      if (!isNaN(date)) {
        const dayName = date.toLocaleDateString("en-US", {
          weekday: "long",
        });

        if (result[dayName]) {
          result[dayName].push(post);
        }
      }
    });

    return result;
  }, [calendarPosts]);

  // -----------------------------
  // DRAG START
  // -----------------------------
  const handleDragStart = useCallback((event, post) => {
    setDraggedPost(post);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", post.id);
  }, []);

  // -----------------------------
  // DROP
  // -----------------------------
  const handleDrop = useCallback(
    (event, day) => {
      event.preventDefault();

      if (!draggedPost) return;

      const newPosts = calendarPosts.map((post) => {
        if (post.id === draggedPost.id) {
          return {
            ...post,
            date: getDateForDay(day),
          };
        }

        return post;
      });

      setCalendarPosts(newPosts);
      setDraggedPost(null);
    },
    [draggedPost, calendarPosts]
  );

  // -----------------------------
  // ALLOW DROP
  // -----------------------------
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // -----------------------------
  // GET DATE FOR DAY
  // -----------------------------
  const getDateForDay = (day) => {
    const today = new Date();

    const dayIndex = days.indexOf(day);
    const currentDay = today.getDay();

    let mondayIndex = currentDay === 0 ? 6 : currentDay - 1;

    const difference = dayIndex - mondayIndex;

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + difference);

    return targetDate.toISOString().split("T")[0];
  };

  // -----------------------------
  // NON OPTIMIZED DATA
  // -----------------------------
  const getNonOptimizedPosts = (day) => {
    return calendarPosts.filter((post) => {
      const date = new Date(post.date);

      if (isNaN(date)) return false;

      const dayName = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      return dayName === day;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "3px",
              color: "#8b6cff",
              fontWeight: "bold",
            }}
          >
            SCHEDULE MATRIX
          </div>

          <h1 style={{ margin: "5px 0", fontSize: "30px" }}>
            📅 Content Calendar
          </h1>
        </div>

        {/* OPTIMIZATION SWITCH */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "6px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <button
            onClick={() => setOptimized(true)}
            style={{
              padding: "9px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: optimized ? "#7658ff" : "transparent",
              color: "white",
            }}
          >
            ⚡ Optimized
          </button>

          <button
            onClick={() => setOptimized(false)}
            style={{
              padding: "9px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: !optimized ? "#7658ff" : "transparent",
              color: "white",
            }}
          >
            🐢 Non-Optimized
          </button>
        </div>
      </div>

      {/* VIEW BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => setView("week")}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "1px solid #7658ff",
            background: view === "week" ? "#7658ff" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          📆 Week
        </button>

        <button
          onClick={() => setView("day")}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "1px solid #7658ff",
            background: view === "day" ? "#7658ff" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          📅 Day
        </button>
      </div>

      {/* PERFORMANCE INFO */}
      <div
        style={{
          padding: "12px 16px",
          marginBottom: "15px",
          borderRadius: "10px",
          background: "rgba(118,88,255,0.12)",
          border: "1px solid rgba(118,88,255,0.3)",
        }}
      >
        {optimized ? (
          <span>
            ⚡ <strong>Optimized Mode:</strong> React.memo + useMemo +
            useCallback enabled
          </span>
        ) : (
          <span>
            🐢 <strong>Non-Optimized Mode:</strong> Normal rendering enabled
          </span>
        )}
      </div>

      {/* CALENDAR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            view === "week" ? "repeat(7, 1fr)" : "1fr",
          gap: "10px",
          minHeight: "350px",
        }}
      >
        {(view === "week" ? days : [days[new Date().getDay() - 1] || "Monday"]).map(
          (day) => {
            const dayPosts = optimized
              ? groupedPosts[day] || []
              : getNonOptimizedPosts(day);

            return (
              <div
                key={day}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
                style={{
                  minHeight: "300px",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* DAY */}
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "15px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {day}
                </div>

                {/* DROP AREA */}
                <div
                  style={{
                    fontSize: "11px",
                    opacity: 0.45,
                    marginBottom: "10px",
                  }}
                >
                  ↕ Drag post here
                </div>

                {/* POSTS */}
                {dayPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDragStart={handleDragStart}
                  />
                ))}

                {dayPosts.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "35px 5px",
                      opacity: 0.35,
                      fontSize: "12px",
                    }}
                  >
                    Drop post here
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "18px",
          padding: "12px",
          textAlign: "center",
          borderRadius: "10px",
          background: "rgba(118,88,255,0.08)",
          fontSize: "13px",
          opacity: 0.8,
        }}
      >
        💡 Drag any post and drop it on another day to reschedule it.
      </div>
    </div>
  );
}

export default Calendar;