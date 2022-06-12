const express = require('express'); //npm install express
const bodyParser = require('body-parser');
const query = require('./db/customers');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Get all customers
app.get("/api/customers", query.getAllCustomers);

// Get customer by id
app.get("/api/customers/:id", query.getCustomerById)

// Add new customer
app.post("/api/customers", query.addCustomer);

// Delete customer
app.delete("/api/customers/:id", query.deleteCustomer);

// Update customer
app.put("/api/customers/:id", query.updateCustomer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});