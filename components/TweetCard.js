import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontawesome';

export default function TweetCard({tweet}){
  return (
    <div className="border rounded p-4 shadow mb-4 tweet-card">
      <p className="font-bold">{tweet.username}</p>
      <p id={`tweet-text-${tweet.id}`}>{tweet.content}</p>
      <p className="text-gray-400 text-sm">{tweet.created_at}</p>

      <div className="flex mt-2 space-x-4 text-gray-500">
        <FontAwesomeIcon icon="heart" className="hover:text-red-500 cursor-pointer"/>
        <FontAwesomeIcon icon="retweet" className="hover:text-green-500 cursor-pointer"/>
        <FontAwesomeIcon icon="comment" className="hover:text-blue-500 cursor-pointer"/>
        <FontAwesomeIcon icon="share" className="hover:text-gray-700 cursor-pointer"/>
        <button className="copy-btn" data-clipboard-target={`#tweet-text-${tweet.id}`}>Copy</button>
      </div>
    </div>
  );
}
