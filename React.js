import React, { useState } from 'react';

const dummyData = [
  { sno: 1, customerName: 'John Doe', age: 25, phone: '1234567890', location: 'City A', created_at: '2024-02-28T10:30:00Z' },
  // Add 49 more dummy records here
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  // Filter and sort data based on search term and sorting preference
  const filteredData = dummyData
    .filter((record) => record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || record.location.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortBy === 'time') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Render table rows
  const renderTableRows = currentRecords.map((record) => (
    <tr key={record.sno}>
      <td>{record.customerName}</td>
      <td>{record.age}</td>
      <td>{record.phone}</td>
      <td>{record.location}</td>
      <td>{formatDate(record.created_at)}</td>
      <td>{formatTime(record.created_at)}</td>
    </tr>
  ));

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{renderTableRows}</tbody>
      </table>

      {/* Pagination */}
      <div>
        {Array(Math.ceil(filteredData.length / recordsPerPage))
          .fill()
          .map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;
