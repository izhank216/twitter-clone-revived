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

    // GSAP fade-in
    gsapFadeIn('.tweet-card');

    // GSAP bounce effect (replaces animeBounce)
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
      // ensure tweets is always an array
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
      // prepend only if newTweet has an id
      if (newTweet && newTweet.id) {
        setTweets([newTweet, ...tweets]);
      }
      setContent('');
    } catch (err) {
      console.error('Error posting tweet:', err);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Twitter Revived</h1>
      <form onSubmit={postTweet} className="mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
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

      {/* Safe map: only map if tweets is an array */}
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
