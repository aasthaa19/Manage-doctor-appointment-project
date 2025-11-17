const API_BASE = "/api";

const elements = {
  name: document.getElementById("name"),
  date: document.getElementById("date"),
  doctor: document.getElementById("doctor"),
  list: document.getElementById("list"),
  emptyState: document.getElementById("emptyState"),
};

document.addEventListener("DOMContentLoaded", function () {
  loadAppointments();

  const today = new Date().toISOString().split("T")[0];
  if (elements.date) {
    elements.date.setAttribute("min", today);
  }
});

async function bookAppointment() {
  const name = elements.name.value.trim();
  const date = elements.date.value;
  const doctor = elements.doctor.value;

  if (!name || !date || !doctor) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, doctor }),
    });

    const result = await response.json();

    if (result.success) {
      elements.name.value = "";
      elements.date.value = "";
      elements.doctor.value = "";

      alert("Appointment booked successfully!");
      loadAppointments();
    } else {
      alert(result.message || "Error booking appointment");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error booking appointment. Please try again.");
  }
}

async function loadAppointments() {
  try {
    const response = await fetch(`${API_BASE}/appointments`);
    const result = await response.json();

    if (result.success) {
      displayAppointments(result.data);
    } else {
      console.error("Error loading appointments");
    }
  } catch (error) {
    console.error("Error loading appointments:", error);
  }
}

function displayAppointments(appointments) {
  if (!appointments || appointments.length === 0) {
    elements.list.innerHTML = "";
    elements.emptyState.style.display = "block";
    return;
  }

  elements.emptyState.style.display = "none";

  elements.list.innerHTML = appointments
    .map((appointment) => {
      const formattedDate = new Date(appointment.date).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

      return `
            <div class="appointment-card">
                <div class="d-flex align-items-center">
                    <div class="doctor-icon">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="appointment-info">
                        <h5 class="mb-1">${appointment.name}</h5>
                        <p class="mb-1">${appointment.doctor}</p>
                        <span class="status-badge">Confirmed</span>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <div class="appointment-date">
                        <div class="fw-bold">${formattedDate}</div>
                    </div>
                    <button class="delete-btn" onclick="deleteAppointment('${appointment.id}')">
                        <i class="fas fa-trash me-1"></i> Delete
                    </button>
                </div>
            </div>
        `;
    })
    .join("");
}

async function deleteAppointment(id) {
  if (!confirm("Are you sure you want to delete this appointment?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/appointments/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      alert("Appointment deleted successfully!");
      loadAppointments();
    } else {
      alert(result.message || "Error deleting appointment");
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    alert("Error deleting appointment");
  }
}
