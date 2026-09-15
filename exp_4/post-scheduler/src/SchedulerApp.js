import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addPost,
  deletePost,
} from "./postsSlice";

import Calendar from "./Calendar";

function SchedulerApp() {

  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts.posts
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] =
    useState("Instagram");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [selectedCalendarDate, setSelectedCalendarDate] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !title ||
      !content ||
      !date ||
      !time
    ) {
      alert("Please fill all fields.");
      return;
    }

    dispatch(
      addPost({
        title,
        content,
        platform,
        date,
        time,
      })
    );

    setTitle("");
    setContent("");
    setPlatform("Instagram");
    setDate("");
    setTime("");
  };

  const handleCalendarDate = (date) => {

    setSelectedCalendarDate(date);

    setDate(date);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scheduler-container">

      {/* HEADER */}

      <header className="header">

        <div>
          <div className="brand">
            🚀 PostPilot
          </div>

          <h1>
            Social Media Post Scheduler
          </h1>

          <p>
            Plan smarter. Post better. Grow faster.
          </p>
        </div>

      </header>

      {/* STATISTICS */}

      <section className="stats-container">

        <div className="stat-card">

          <span className="stat-icon">
            📝
          </span>

          <div>
            <h3>{posts.length}</h3>
            <p>Total Posts</p>
          </div>

        </div>

        <div className="stat-card">

          <span className="stat-icon">
            📅
          </span>

          <div>
            <h3>
              {
                new Set(
                  posts.map((post) => post.date)
                ).size
              }
            </h3>

            <p>Active Days</p>
          </div>

        </div>

        <div className="stat-card">

          <span className="stat-icon">
            📱
          </span>

          <div>
            <h3>
              {
                new Set(
                  posts.map(
                    (post) => post.platform
                  )
                ).size
              }
            </h3>

            <p>Platforms</p>
          </div>

        </div>

        <div className="stat-card">

          <span className="stat-icon">
            ⏰
          </span>

          <div>
            <h3>
              {
                posts.filter(
                  (post) => post.time
                ).length
              }
            </h3>

            <p>Scheduled</p>
          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <div className="main-content">

        {/* CREATE POST */}

        <section className="card">

          <div className="section-heading">

            <div>
              <span>
                CREATE CONTENT
              </span>

              <h2>
                ➕ New Social Post
              </h2>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <label>
              Post Title
            </label>

            <input
              type="text"
              placeholder="e.g. Weekend promotion"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <label>
              Content
            </label>

            <textarea
              placeholder="Write your social media content..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows="5"
            />

            <label>
              Social Media Platform
            </label>

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value)
              }
            >
              <option value="Instagram">
                📸 Instagram
              </option>

              <option value="Facebook">
                📘 Facebook
              </option>

              <option value="Twitter">
                🐦 Twitter
              </option>

              <option value="LinkedIn">
                💼 LinkedIn
              </option>
            </select>

            <div className="date-time-row">

              <div>

                <label>
                  📅 Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />

              </div>

              <div>

                <label>
                  ⏰ Time
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                />

              </div>

            </div>

            <button
              className="schedule-button"
              type="submit"
            >
              🚀 Schedule Post
            </button>

          </form>

        </section>

        {/* SCHEDULED POSTS */}

        <section className="card">

          <div className="section-heading">

            <div>
              <span>
                CONTENT QUEUE
              </span>

              <h2>
                📋 Scheduled Posts
              </h2>
            </div>

            <div className="post-counter">
              {posts.length}
            </div>

          </div>

          {posts.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                📭
              </div>

              <h3>
                No scheduled posts
              </h3>

              <p>
                Create your first post to see it here.
              </p>

            </div>

          ) : (

            <div className="posts-list">

              {posts.map((post) => (

                <div
                  className="post-item"
                  key={post.id}
                >

                  <div className="post-info">

                    <div className="post-title-row">

                      <h3>
                        {post.title}
                      </h3>

                      <span
                        className={`platform-badge ${post.platform.toLowerCase()}`}
                      >
                        {post.platform}
                      </span>

                    </div>

                    <p>
                      {post.content}
                    </p>

                    <div className="post-meta">

                      <span>
                        📅 {post.date}
                      </span>

                      <span>
                        ⏰ {post.time}
                      </span>

                    </div>

                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      dispatch(
                        deletePost(post.id)
                      )
                    }
                  >
                    🗑️
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

      {/* CALENDAR */}

      <Calendar
        posts={posts}
        onDateSelect={handleCalendarDate}
      />

      {/* FOOTER */}

      <footer className="footer">
        <p>
          🚀 PostPilot — Smart Social Media Scheduling Dashboard
        </p>

        <p>
          Built with React + Redux Toolkit
        </p>
      </footer>

    </div>
  );
}

export default SchedulerApp;