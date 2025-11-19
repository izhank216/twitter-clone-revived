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
      stagger: 0.1, // optional: makes multiple tweets bounce in sequence
    });

    makeDraggable('.tweet-card');
  }, [tweets]);

  async function fetchTweets() {
    const res = await fetch('/api/tweets');
    const data = await res.json();
    setTweets(data);
  }

  async function postTweet(e) {
    e.preventDefault();
    if (!username || !content) return;

    const res = await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, content }),
    });

    const newTweet = await res.json();
    setTweets([newTweet, ...tweets]);
    setContent('');
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
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
