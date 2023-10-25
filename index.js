const express = require('express');
const path = require('path');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const PORT = process.env.PORT || 5000
// Import route files for each module
const clubRoutes = require('./routes/club');
const bookingRoutes = require('./routes/booking');
const customerRoutes = require('./routes/customer');
const adminRouter = require('./routes/admin');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', adminRouter);

// Use the route files for each module
app.use('/api/clubs', clubRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
