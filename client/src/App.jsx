import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    await axios.post('http://localhost:4000/posts', { content: newPost });
    setNewPost('');
    fetchPosts();
  };

  const handleLike = async (id) => {
    await axios.post(`http://localhost:4000/posts/${id}/like`);
    fetchPosts();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MiniSocial</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="3"
          placeholder="你在想什麼？"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">發佈</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-3 mb-2 rounded">
            <p>{post.content}</p>
            <div className="text-sm text-gray-600 mt-1">
              ❤️ {post.likes} 個讚
              <button onClick={() => handleLike(post.id)} className="ml-4 text-blue-500">讚</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
