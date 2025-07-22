import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ArtistBarChart = ({ artists }) => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const topArtistsMap = calculateFrequency(artists);

    const topArtistsData = Array.from(topArtistsMap.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by value (frequency) in descending order
      .slice(0, 6) // Take top 6
      .map(([name, value]) => ({ name, value })); // Convert to desired format

    setTopArtists(topArtistsData);
  }, [artists]);

  const calculateFrequency = (items) => {
    const freqMap = new Map();

    for (const item of items) {
      freqMap.set(item, (freqMap.get(item) || 0) + 1);
    }

    return freqMap;
  };

  return (
    <>
      {topArtists.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={300}
            height={500}

            data={topArtists}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ 
    backgroundColor: '#1b1c1e',
  }} />
  
            <Bar dataKey="value" fill="#c084fc" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ArtistBarChart;