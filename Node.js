const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Sample data
let records = [
  { sno: 1, customerName: 'John Doe', age: 25, phone: '123-456-7890', location: 'City A', createdAt: new Date() },
  // Add 49 more records...
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route to render the table
app.get('/', (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRecords = records.slice(startIndex, endIndex);

  res.render('index', { records: paginatedRecords });
});

// Search and Sort functionality
app.post('/', (req, res) => {
  const { search, sortBy } = req.body;

  let filteredRecords = records.filter(record =>
    record.customerName.toLowerCase().includes(search.toLowerCase()) ||
    record.location.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === 'date') {
    filteredRecords = filteredRecords.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sortBy === 'time') {
    filteredRecords = filteredRecords.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  res.render('index', { records: filteredRecords });
});

app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});
Create a folder named views and add a file index.ejs inside it:
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Records Table</title>
</head>
<body>
  <h1>Records Table</h1>
  
  <form action="/" method="post">
    <label for="search">Search:</label>
    <input type="text" id="search" name="search">
    
    <label for="sortBy">Sort By:</label>
    <select id="sortBy" name="sortBy">
      <option value="date">Date</option>
      <option value="time">Time</option>
    </select>

    <button type="submit">Submit</button>
  </form>

  <table border="1">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Customer Name</th>
        <th>Age</th>
        <th>Phone</th>
        <th>Location</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <% records.forEach(record => { %>
        <tr>
          <td><%= record.sno %></td>
          <td><%= record.customerName %></td>
          <td><%= record.age %></td>
          <td><%= record.phone %></td>
          <td><%= record.location %></td>
          <td><%= record.createdAt.toDateString() %></td>
          <td><%= record.createdAt.toLocaleTimeString() %></td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</body>
</html>
