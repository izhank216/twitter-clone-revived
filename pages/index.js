import { useEffect, useState } from 'react';
import TweetCard from '../components/TweetCard';
import { initClipboard } from '../copytext';
import { animateTweets, gsapFadeIn } from '../animations';
import { makeDraggable } from '../interact';
import { gsap } from 'gsap';

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTweets();
  }, []);

  useEffect(() => {
    initClipboard();
    animateTweets('.tweet-card');

    gsapFadeIn('.tweet-card');

    gsap.from('.tweet-card', {
      y: -10,
      opacity: 0,
      duration: 0.8,
      ease: 'bounce.out',
      stagger: 0.1,
    });

    makeDraggable('.tweet-card');
  }, [tweets]);

  async function fetchTweets() {
    try {
      const res = await fetch('/api/tweets');
      const data = await res.json();
      setTweets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching tweets:', err);
      setTweets([]);
    }
  }

  async function postTweet(e) {
    e.preventDefault();
    if (!username || !content) return;

    try {
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, content }),
      });
      const newTweet = await res.json();
      if (newTweet && newTweet.id) {
        setTweets([newTweet, ...tweets]);
      }
      setContent('');
    } catch (err) {
      console.error('Error posting tweet:', err);
    }
  }

  return (
    <div className="container mt-5">
      {/* Bootstrap CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-Vm0dXFAFq0nYbXG1o0Qf8hCih7x0PfM5YlXEpFqA9wGdQ+FGDfr86G/jX5h8o/pZ"
        crossOrigin="anonymous"
      />
      {/* Custom styles */}
      <style>{`
        body {
          background-color: #f5f8fa;
          font-family: Arial, sans-serif;
        }
        .tweet-card {
          background-color: #fff;
          border: 1px solid #e1e8ed;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
        }
        .tweet-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .tweet-button {
          background-color: #1da1f2;
          color: #fff;
          border: none;
        }
        .tweet-button:hover {
          background-color: #0d8ddb;
        }
      `}</style>

      <h1 className="mb-4 text-center">Twitter Revived</h1>
      <form onSubmit={postTweet} className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-2"
        />
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn tweet-button w-100">
          Tweet
        </button>
      </form>

      {Array.isArray(tweets) &&
        tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)}

      {/* Counter.dev analytics script */}
      <script
        src="https://cdn.counter.dev/script.js"
        data-id="5ee43f6e-db33-49dd-9b1f-4443ab895294"
        data-utcoffset="5"
      ></script>
    </div>
  );
}
