const express = require("express");
const app = express();

app.use(express.json());

let appointments = [];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediCare - Doctor Appointment System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #2a6bc9;
            --primary-light: #e8f1ff;
            --secondary: #1a936f;
            --accent: #ff6b6b;
            --dark: #2d3748;
            --light: #f8fafc;
            --gray: #718096;
            --border: #e2e8f0;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            color: var(--dark);
        }
        
        .navbar {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            padding: 1rem 0;
        }
        
        .logo {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primary);
            display: flex;
            align-items: center;
        }
        
        .logo i {
            margin-right: 8px;
            color: var(--secondary);
        }
        
        .hero-section {
            background: linear-gradient(135deg, var(--primary) 0%, #3a7bd5 100%);
            color: white;
            padding: 3rem 0;
            border-radius: 0 0 20px 20px;
            margin-bottom: 2rem;
        }
        
        .card-custom {
            border: none;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            background: white;
        }
        
        .card-custom:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .card-header-custom {
            background: linear-gradient(135deg, var(--primary) 0%, #3a7bd5 100%);
            color: white;
            padding: 1.5rem;
            border-bottom: none;
        }
        
        .form-control-custom {
            border-radius: 10px;
            padding: 0.75rem 1rem;
            border: 1px solid var(--border);
            transition: all 0.3s;
        }
        
        .form-control-custom:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(42, 107, 201, 0.1);
        }
        
        .btn-primary-custom {
            background: linear-gradient(135deg, var(--primary) 0%, #3a7bd5 100%);
            border: none;
            border-radius: 10px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-primary-custom:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(42, 107, 201, 0.3);
        }
        
        .appointment-card {
            background: white;
            border-radius: 12px;
            padding: 1.25rem;
            margin-bottom: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border-left: 4px solid var(--primary);
            transition: all 0.3s;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .appointment-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }
        
        .appointment-info h5 {
            margin-bottom: 0.25rem;
            color: var(--dark);
        }
        
        .appointment-info p {
            margin-bottom: 0.25rem;
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .appointment-date {
            background: var(--primary-light);
            color: var(--primary);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: var(--gray);
        }
        
        .empty-state i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: var(--border);
        }
        
        .doctor-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary-light);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            margin-right: 12px;
        }
        
        .section-title {
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: var(--primary);
            border-radius: 3px;
        }
        
        .status-badge {
            background: var(--secondary);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        footer {
            background: var(--dark);
            color: white;
            padding: 2rem 0;
            margin-top: 3rem;
        }
        
        .delete-btn {
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 6px;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .delete-btn:hover {
            background: #ff5252;
            transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
            .appointment-card {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .appointment-date {
                margin-top: 1rem;
                align-self: flex-end;
            }
        }
    </style>
</head>
<body>
   
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand logo" href="#">
                <i class="fas fa-stethoscope"></i> MediCare
            </a>
        </div>
    </nav>

    
    <div class="hero-section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold">Book Your Doctor's Appointment</h1>
                    <p class="lead">Easy, fast and secure way to book medical appointments with top specialists.</p>
                </div>
                <div class="col-lg-6 text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/2968/2968828.png" alt="Doctor" class="img-fluid" style="max-height: 250px;">
                </div>
            </div>
        </div>
    </div>

  
    <div class="container mb-5">
        <div class="row">
            <!-- Booking Form -->
            <div class="col-lg-5 mb-4">
                <div class="card card-custom">
                    <div class="card-header-custom">
                        <h3 class="mb-0"><i class="fas fa-calendar-plus me-2"></i> Book Appointment</h3>
                    </div>
                    <div class="card-body p-4">
                        <form id="appointmentForm">
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Patient Name</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light"><i class="fas fa-user text-primary"></i></span>
                                    <input type="text" id="name" class="form-control form-control-custom" placeholder="Enter patient name">
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Appointment Date</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light"><i class="fas fa-calendar text-primary"></i></span>
                                    <input type="date" id="date" class="form-control form-control-custom">
                                </div>
                            </div>
                            
                            <div class="mb-4">
                                <label class="form-label fw-semibold">Select Doctor</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-light"><i class="fas fa-user-md text-primary"></i></span>
                                    <select id="doctor" class="form-select form-control-custom">
                                        <option value="">Select a doctor</option>
                                        <option value="Dr. Mehta (Cardiologist)">Dr. Mehta (Cardiologist)</option>
                                        <option value="Dr. Sharma (Dermatologist)">Dr. Sharma (Dermatologist)</option>
                                        <option value="Dr. Singh (General Physician)">Dr. Singh (General Physician)</option>
                                        <option value="Dr. Patel (Child Specialist)">Dr. Patel (Child Specialist)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button type="button" onclick="bookAppointment()" class="btn btn-primary-custom w-100 py-3">
                                <i class="fas fa-calendar-check me-2"></i> Book Appointment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
         
            <div class="col-lg-7">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="section-title mb-0">Upcoming Appointments</h3>
                    <button class="btn btn-outline-primary btn-sm" onclick="loadAppointments()">
                        <i class="fas fa-sync-alt me-1"></i> Refresh
                    </button>
                </div>
                <div id="list"></div>
                
                <div id="emptyState" class="empty-state">
                    <i class="far fa-calendar-times"></i>
                    <h4>No Appointments Yet</h4>
                    <p>Book your first appointment using the form</p>
                </div>
            </div>
        </div>
    </div>

   
    <footer>
        <div class="container text-center">
            <p class="mb-0">&copy; 2023 MediCare Appointment System</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        
        const API_BASE = '/api';

     
        const elements = {
            name: document.getElementById('name'),
            date: document.getElementById('date'),
            doctor: document.getElementById('doctor'),
            list: document.getElementById('list'),
            emptyState: document.getElementById('emptyState')
        };

        
        document.addEventListener('DOMContentLoaded', function() {
            loadAppointments();
            
           
            const today = new Date().toISOString().split('T')[0];
            if (elements.date) {
                elements.date.setAttribute('min', today);
            }
        });

       
        async function bookAppointment() {
            const name = elements.name.value.trim();
            const date = elements.date.value;
            const doctor = elements.doctor.value;

            if (!name || !date || !doctor) {
                alert('Please fill all fields!');
                return;
            }

            try {
                const response = await fetch(API_BASE + '/book', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, date, doctor })
                });

                const result = await response.json();

                if (result.success) {
                 
                    elements.name.value = "";
                    elements.date.value = "";
                    elements.doctor.value = "";

                    alert('Appointment booked successfully!');
                    loadAppointments();
                } else {
                    alert(result.message || 'Error booking appointment');
                }
            } catch (error) {
                console.error("Error:", error);
                alert('Error booking appointment. Please try again.');
            }
        }

        
        async function loadAppointments() {
            try {
                const response = await fetch(API_BASE + '/appointments');
                const result = await response.json();

                if (result.success) {
                    displayAppointments(result.data);
                } else {
                    console.error('Error loading appointments');
                }
            } catch (error) {
                console.error("Error loading appointments:", error);
            }
        }

      
        function displayAppointments(appointments) {
            if (!appointments || appointments.length === 0) {
                elements.list.innerHTML = '';
                elements.emptyState.style.display = 'block';
                return;
            }
            
            elements.emptyState.style.display = 'none';
            
            elements.list.innerHTML = appointments.map(appointment => {
                const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                return \`
                    <div class="appointment-card">
                        <div class="d-flex align-items-center">
                            <div class="doctor-icon">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <div class="appointment-info">
                                <h5 class="mb-1">\${appointment.name}</h5>
                                <p class="mb-1">\${appointment.doctor}</p>
                                <span class="status-badge">Confirmed</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <div class="appointment-date">
                                <div class="fw-bold">\${formattedDate}</div>
                            </div>
                            <button class="delete-btn" onclick="deleteAppointment('\${appointment.id}')">
                                <i class="fas fa-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>
                \`;
            }).join("");
        }

        async function deleteAppointment(id) {
            if (!confirm('Are you sure you want to delete this appointment?')) {
                return;
            }

            try {
                const response = await fetch(API_BASE + '/appointments/' + id, {
                    method: 'DELETE'
                });

                const result = await response.json();

                if (result.success) {
                    alert('Appointment deleted successfully!');
                    loadAppointments();
                } else {
                    alert(result.message || 'Error deleting appointment');
                }
            } catch (error) {
                console.error("Error deleting appointment:", error);
                alert('Error deleting appointment');
            }
        }
    </script>
</body>
</html>
  `);
});

app.post("/api/book", (req, res) => {
  try {
    const { name, date, doctor } = req.body;

    if (!name || !date || !doctor) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAppointment = {
      id: Date.now().toString(),
      name,
      date,
      doctor,
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);

    res.json({
      success: true,
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.get("/api/appointments", (req, res) => {
  res.json({
    success: true,
    data: appointments,
  });
});

app.delete("/api/appointments/:id", (req, res) => {
  try {
    const { id } = req.params;
    const initialLength = appointments.length;

    appointments = appointments.filter((appointment) => appointment.id !== id);

    if (appointments.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});
