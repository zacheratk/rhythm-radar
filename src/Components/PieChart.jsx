import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const BarChart = ({ genres }) => {
  const [topFiveGenres, setTopFiveGenres] = useState([]);

  useEffect(() => {
    const topGenresMap = calculateFrequency(genres);

    const topGenresData = Array.from(topGenresMap.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by value (frequency) in descending order
      .slice(0, 5) // Take top 5
      .map(([name, value]) => ({ name, value })); // Convert to desired format

    setTopFiveGenres(topGenresData);
  }, [genres]);

  const calculateFrequency = (items) => {
    const freqMap = new Map();

    for (const item of items) {
      freqMap.set(item, (freqMap.get(item) || 0) + 1);
    }

    return freqMap;
  };

  return (
    <>
      {topFiveGenres.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={topFiveGenres}
              outerRadius={70}
              fill="#c084fc"
              label={({ name }) => name}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default BarChart;
