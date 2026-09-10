import React, {
  useCallback,
  useMemo,
  useState
} from "react";

import Calendar from "./Calendar";
import ContentOrbit from "./ContentOrbit";
import PerformancePanel from "./PerformancePanel";

import "./App.css";


const initialPosts = [
  {
    id: 1,
    title: "New Product Launch",
    platform: "Instagram",
    date: "2026-09-08",
    time: "10:00 AM",
    type: "Promotion"
  },
  {
    id: 2,
    title: "Technology Tips",
    platform: "LinkedIn",
    date: "2026-09-08",
    time: "02:00 PM",
    type: "Educational"
  },
  {
    id: 3,
    title: "Weekend Announcement",
    platform: "Facebook",
    date: "2026-09-10",
    time: "06:00 PM",
    type: "Announcement"
  },
  {
    id: 4,
    title: "AI Inspiration",
    platform: "Twitter",
    date: "2026-09-12",
    time: "07:00 PM",
    type: "Educational"
  },
  {
    id: 5,
    title: "Festival Campaign",
    platform: "Instagram",
    date: "2026-09-15",
    time: "08:00 PM",
    type: "Promotion"
  }
];


function App() {

  const [posts, setPosts] = useState(initialPosts);

  const [selectedDate, setSelectedDate] = useState(
    "2026-09-08"
  );

  const [showForm, setShowForm] = useState(false);


  /*
   ==========================================
   useMemo
   Expensive statistics are calculated only
   when posts change.
   ==========================================
  */

  const statistics = useMemo(() => {

    const instagram = posts.filter(
      post => post.platform === "Instagram"
    ).length;

    const facebook = posts.filter(
      post => post.platform === "Facebook"
    ).length;

    const twitter = posts.filter(
      post => post.platform === "Twitter"
    ).length;

    const linkedin = posts.filter(
      post => post.platform === "LinkedIn"
    ).length;

    const uniqueDates = new Set(
      posts.map(post => post.date)
    ).size;

    return {
      total: posts.length,
      instagram,
      facebook,
      twitter,
      linkedin,
      activeDays: uniqueDates
    };

  }, [posts]);


  /*
   ==========================================
   useCallback
   Stable function reference prevents
   unnecessary child re-renders.
   ==========================================
  */

  const handleDateSelect = useCallback((date) => {

    setSelectedDate(date);

  }, []);


  const handleDeletePost = useCallback((id) => {

    setPosts(currentPosts =>
      currentPosts.filter(post => post.id !== id)
    );

  }, []);


  const handleAddPost = useCallback((post) => {

    setPosts(currentPosts => [
      ...currentPosts,
      {
        ...post,
        id: Date.now()
      }
    ]);

    setShowForm(false);

  }, []);


  return (

    <div className="app">

      {/* HEADER */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            🚀
          </div>

          <div>
            <h1>PostPilot</h1>

            <span>
              Smart Content Scheduler
            </span>
          </div>

        </div>


        <div className="status">

          <span className="status-dot"></span>

          SYSTEM OPTIMIZED

        </div>

      </header>


      <main>


        {/* HERO */}

        <section className="hero">

          <div>

            <span className="eyebrow">
              SOCIAL MEDIA COMMAND CENTER
            </span>

            <h2>
              Plan your content.
              <br />
              <span>Visualize your impact.</span>
            </h2>

            <p>
              A performance-optimized social media
              scheduling system with intelligent
              timeline visualization.
            </p>

          </div>


          <button
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            ＋ Create Post
          </button>

        </section>


        {/* STATISTICS */}

        <section className="stats-grid">

          <div className="stat-card">

            <span>📋</span>

            <div>
              <small>TOTAL POSTS</small>
              <strong>{statistics.total}</strong>
            </div>

          </div>


          <div className="stat-card">

            <span>📅</span>

            <div>
              <small>ACTIVE DAYS</small>
              <strong>{statistics.activeDays}</strong>
            </div>

          </div>


          <div className="stat-card">

            <span>📸</span>

            <div>
              <small>INSTAGRAM</small>
              <strong>{statistics.instagram}</strong>
            </div>

          </div>


          <div className="stat-card">

            <span>💼</span>

            <div>
              <small>LINKEDIN</small>
              <strong>{statistics.linkedin}</strong>
            </div>

          </div>

        </section>


        {/* CONTENT ORBIT */}

        <ContentOrbit
          posts={posts}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />


        {/* PERFORMANCE */}

        <PerformancePanel
          posts={posts}
          statistics={statistics}
        />


        {/* CALENDAR */}

        <Calendar
          posts={posts}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onDelete={handleDeletePost}
        />


      </main>


      {/* CREATE POST MODAL */}

      {showForm && (

        <CreatePost
          onAdd={handleAddPost}
          onClose={() => setShowForm(false)}
        />

      )}


      <footer>

        <span>
          PostPilot © 2026
        </span>

        <span>
          React Performance Engineering • CO4 • CO5
        </span>

      </footer>

    </div>

  );
}


/*
 ==========================================
 CREATE POST COMPONENT
 ==========================================
*/

function CreatePost({ onAdd, onClose }) {

  const [title, setTitle] = useState("");

  const [platform, setPlatform] =
    useState("Instagram");

  const [date, setDate] =
    useState("2026-09-08");

  const [time, setTime] =
    useState("10:00");


  const submit = (e) => {

    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      title,
      platform,
      date,
      time,
      type: "General"
    });

  };


  return (

    <div className="modal-overlay">

      <form
        className="modal"
        onSubmit={submit}
      >

        <button
          type="button"
          className="close"
          onClick={onClose}
        >
          ×
        </button>


        <span className="eyebrow">
          CREATE CONTENT
        </span>

        <h2>
          Schedule New Post
        </h2>


        <label>
          Post Title
        </label>

        <input
          value={title}
          onChange={e =>
            setTitle(e.target.value)
          }
          placeholder="Enter post title"
        />


        <label>
          Platform
        </label>

        <select
          value={platform}
          onChange={e =>
            setPlatform(e.target.value)
          }
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Twitter</option>
          <option>LinkedIn</option>
        </select>


        <label>
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={e =>
            setDate(e.target.value)
          }
        />


        <label>
          Time
        </label>

        <input
          type="time"
          value={time}
          onChange={e =>
            setTime(e.target.value)
          }
        />


        <button
          className="primary-button full"
          type="submit"
        >
          Schedule Post 🚀
        </button>

      </form>

    </div>

  );
}


export default App;