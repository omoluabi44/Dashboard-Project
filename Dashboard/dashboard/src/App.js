import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const [timestamps, setTimestamps] = useState([]);
  const [nationalityCounts, setNationalityCounts] = useState({});

  useEffect(() => {
    // fetch list of users from API
    const fetchUsers = async () => {
      const response = await axios.get('https://jpxzi5gsq4.execute-api.us-east-2.amazonaws.com/default/users');
      setUsers(response.data);
      setNumUsers(response.data.length);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // extract timestamps from list of users
    const userTimestamps = users.map(user => user.timestamp);
    setTimestamps(userTimestamps);
  }, [users]);

  useEffect(() => {
    // count number of users by nationality
    const counts = {};
    users.forEach(user => {
      const nationality = user.nationality;
      counts[nationality] = counts[nationality] ? counts[nationality] + 1 : 1;
    });
    setNationalityCounts(counts);
  }, [users]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Users logged onto the app: {numUsers}</h2>
      <h2>Timestamp of last logins:</h2>
      <ul>
        {timestamps.map((timestamp, i) => (
          <li key={i}>{timestamp}</li>
        ))}
      </ul>
      <h2>Nationality counts:</h2>
      <ul>
        {Object.keys(nationalityCounts).map((nationality, i) => (
          <li key={i}>{nationality}: {nationalityCounts[nationality]}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
