import React, { memo, useMemo } from "react";

const ContentOrbit = memo(function ContentOrbit({
  posts,
  selectedDate,
  onDateSelect
}) {

  const selectedPosts = useMemo(() => {
    return posts.filter(
      post => post.date === selectedDate
    );
  }, [posts, selectedDate]);

  const energy = useMemo(() => {
    return Math.min(selectedPosts.length * 25, 100);
  }, [selectedPosts]);

  const timeline = useMemo(() => {

    const center = new Date(selectedDate);
    const result = [];

    for (let i = -5; i <= 5; i++) {

      const date = new Date(center);

      date.setDate(center.getDate() + i);

      const dateString =
        date.toISOString().split("T")[0];

      const count = posts.filter(
        post => post.date === dateString
      ).length;

      result.push({
        date,
        dateString,
        count
      });
    }

    return result;

  }, [posts, selectedDate]);


  return (
    <section className="orbit-section">

      <div className="orbit-header">

        <div>
          <span className="eyebrow">
            TEMPORAL DATA VISUALIZATION
          </span>

          <h2>🌌 Content Orbit</h2>

          <p>
            Watch your scheduled content radiate
            across time.
          </p>
        </div>

        <div className="energy-badge">

          <span>CONTENT ENERGY</span>

          <strong>
            {energy}%
          </strong>

        </div>

      </div>


      <div className="orbit-container">

        <div className="orbit-ring ring-one"></div>
        <div className="orbit-ring ring-two"></div>
        <div className="orbit-ring ring-three"></div>


        <div
          className="orbit-center"
          style={{
            boxShadow:
              `0 0 ${25 + energy}px rgba(124,92,255,.7)`
          }}
        >

          <span>🚀</span>

          <strong>
            {selectedPosts.length}
          </strong>

          <small>POSTS</small>

        </div>


        {selectedPosts.map((post, index) => {

          const angle =
            (360 / Math.max(selectedPosts.length, 1))
            * index;

          const icons = {
            Instagram: "📸",
            Facebook: "📘",
            Twitter: "🐦",
            LinkedIn: "💼"
          };

          return (
            <div
              className="orbit-post"
              key={post.id}
              style={{
                transform:
                  `rotate(${angle}deg)
                   translateX(145px)
                   rotate(-${angle}deg)`
              }}
            >

              <span>
                {icons[post.platform]}
              </span>

              <strong>
                {post.title}
              </strong>

              <small>
                {post.time}
              </small>

            </div>
          );

        })}

      </div>


      <div className="energy">

        <div className="energy-label">

          <span>
            {energy >= 75
              ? "🔥 Peak Activity"
              : energy >= 50
              ? "⚡ High Activity"
              : energy > 0
              ? "✨ Moderate Activity"
              : "🌙 Quiet Day"}
          </span>

          <strong>
            {selectedPosts.length} scheduled
          </strong>

        </div>


        <div className="energy-track">

          <div
            className="energy-fill"
            style={{
              width: `${energy}%`
            }}
          ></div>

        </div>

      </div>


      <div className="timeline">

        <div className="timeline-line"></div>

        {timeline.map(item => (

          <button
            key={item.dateString}
            className={
              item.dateString === selectedDate
                ? "timeline-item active"
                : "timeline-item"
            }
            onClick={() =>
              onDateSelect(item.dateString)
            }
          >

            <span
              className="timeline-node"
              style={{
                width: `${30 + item.count * 9}px`,
                height: `${30 + item.count * 9}px`
              }}
            >
              {item.count}
            </span>

            <small>
              {item.date.toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short"
                }
              )}
            </small>

          </button>

        ))}

      </div>

    </section>
  );
});

export default ContentOrbit;