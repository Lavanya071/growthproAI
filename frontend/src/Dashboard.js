import { useState } from 'react';

const BASE_URL = 'https://your-backend-url.onrender.com'; // <-- update this

const Dashboard = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert("Please fill in all fields.");
    setLoading(true);
    const res = await fetch(`${BASE_URL}/business-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location })
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    const res = await fetch(`${BASE_URL}/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`);
    const json = await res.json();
    setData((prev) => ({ ...prev, headline: json.headline }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Business Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {data && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <p><strong>⭐ Rating:</strong> {data.rating}</p>
          <p><strong>📝 Reviews:</strong> {data.reviews}</p>
          <p><strong>🧠 SEO Headline:</strong> {data.headline}</p>
          <button
            onClick={regenerateHeadline}
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
