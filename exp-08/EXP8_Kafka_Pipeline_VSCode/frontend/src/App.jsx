import { useEffect, useState } from 'react';

const API = 'http://localhost:8080/api/posts';

export default function App() {
  const [content, setContent] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  async function loadPosts() {
    try {
      const res = await fetch(API);
      setPosts(await res.json());
    } catch {
      setMessage('Backend not connected. Start Spring Boot first.');
    }
  }

  useEffect(() => {
    loadPosts();
    const timer = setInterval(loadPosts, 3000);
    return () => clearInterval(timer);
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!content.trim()) return setMessage('Please enter post content.');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString().slice(0, 19) : null
        })
      });
      if (!res.ok) throw new Error();
      setContent('');
      setScheduledAt('');
      setMessage('Post scheduled!');
      loadPosts();
    } catch {
      setMessage('Could not schedule post. Check backend and Kafka.');
    }
  }

  return <main>
    <h1>Kafka Event-Driven Publishing Pipeline</h1>
    <p className="sub">Experiment 8 · Spring Boot + Apache Kafka</p>
    <form onSubmit={submit}>
      <label>Post content</label>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post..." />
      <label>Schedule time</label>
      <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} />
      <button type="submit">Schedule Post</button>
      {message && <p>{message}</p>}
    </form>
    <h2>Scheduled Posts</h2>
    <button className="refresh" onClick={loadPosts}>Refresh</button>
    {posts.length === 0 ? <p>No posts yet.</p> : <div className="posts">
      {posts.map(p => <article key={p.id}>
        <strong>Post #{p.id}</strong><span className={`status ${p.status}`}>{p.status}</span>
        <p>{p.content}</p><small>Scheduled: {p.scheduledAt || 'Not set'}</small>
      </article>)}
    </div>}
  </main>;
}
