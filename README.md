 Online Appointment Management Portal (Mini Version)
 
 It is a simple Node.js + Express based web application to manage doctor appointments.

 📌 Features

 👨‍⚕️ Doctor Management
- Displays list of doctors  
- Shows: Name, Specialization, Consultation Fee  

 📅 Appointment Booking
- Book an appointment by entering:
  - Patient Name
  - Doctor
  - Appointment Date
  - Appointment Time
- Form validations included

 🛠 Tech Stack
- Node.js
- Express.js
- HTML, CSS, JavaScript
- Simple in-memory data storage


📁 Project Structure

MANAGE-DOCTOR-APPOINTMENT/
│── node_modules/

│── public/ (static assets if any)

│── app.js (main Express server)

│── appointments.js (appointments logic/data)

│── public.js (doctor listing logic)

│── index.html (frontend main page)

│── style.css (styling)

│── index.js (frontend JS if used)

│── package.json

│── package-lock.json

│── .hintrc


 🚀 How to Run the Project

1. Install dependencies:
   npm install express

2. Start the server:
   node app.js

3. Open in browser:
   http://localhost:3001
