// pages/index.js
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
  const [user, setUser] = useState(null); // logged-in user
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => fetchTweets(), []);

  useEffect(() => {
    if (tweets.length === 0) return;
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
    if (!user || !content) return;

    try {
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, content }),
      });
      const newTweet = await res.json();
      if (newTweet?.id) setTweets([newTweet, ...tweets]);
      setContent('');
    } catch (err) {
      console.error('Error posting tweet:', err);
    }
  }

  async function handleAuth(e) {
    e.preventDefault();
    if (!loginName || !password) return;

    try {
      const endpoint = isRegister ? '/api/register' : '/api/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginName, password }),
      });
      const data = await res.json();
      if (data?.success) {
        setUser(loginName);
      } else {
        alert(data?.error || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Twitter Revived</h1>

      {!user ? (
        <form onSubmit={handleAuth} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {isRegister ? 'Register' : 'Login'}
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </form>
      ) : (
        <div className="mb-6">
          <p className="mb-2">Logged in as <strong>{user}</strong></p>
          <form onSubmit={postTweet}>
            <textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Tweet
            </button>
          </form>
        </div>
      )}

      {/* Tweets list */}
      {Array.isArray(tweets) &&
        tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)}

      {/* Counter.dev analytics */}
      <script
        src="https://cdn.counter.dev/script.js"
        data-id="5ee43f6e-db33-49dd-9b1f-4443ab895294"
        data-utcoffset="5"
      ></script>
    </div>
  );
}
