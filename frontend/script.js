const API_URL = 'http://localhost:3000/api';

// DOM elements
const userSelect = document.getElementById('user-select');
const ticketList = document.getElementById('ticket-list');
const ticketForm = document.getElementById('ticket-form');
const ticketInput = document.getElementById('ticket-input');
const statusIndicator = document.getElementById('api-status');


// API status indicator
function setStatus(state) {

  switch (state) {
    case "online":
      statusIndicator.textContent = "🟢 API Connected";
      break;
    case "offline":
      statusIndicator.textContent = "🔴 API Offline";
      break;
    default:
      statusIndicator.textContent = '🟡 Checking connection...';
  }
}

// FETCH users
async function fetchUsers () {
  try {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();

    userSelect.innerHTML = '';

    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      userSelect.appendChild(option);
    });
  } catch (e) {
    console.error("Failed to load users: ", e);
    setStatus("offline");
  }
  
}


// FETCH & Render tickets
async function fetchTickets() {
  setStatus("checking");

  try {
    const res = await fetch(`${API_URL}/tickets`);
    const tickets = await res.json();

    setStatus("online");

    ticketList.innerHTML = '';

    tickets.forEach(ticket => {
      const li = document.createElement('li');
      li.textContent = 
      `Ticket ID ${ticket.id}: ${ticket.title} (${ticket.assigned_user || "Unassigned"})`;
      
      // DELETE btn
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Complete';
      deleteBtn.onclick = () => {
        deleteTicket(ticket.id);
        li.remove();
      };
      li.appendChild(deleteBtn);

      // EDIT btn
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => updateTicket(ticket.id);
      li.appendChild(editBtn);
      
      ticketList.appendChild(li);
    });
    console.log(tickets);
  } catch (err) {
    console.error('Failed to fetch tickets', err);
    setStatus("offline");
  }
}

// POST tickets
ticketForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = ticketInput.value.trim();
  const user_id = userSelect.value;

  if (!title) return;

  try {
    await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, user_id })
    });

    ticketInput.value = '';
    fetchTickets();
  } catch (err) {
    console.error('Failed to create ticket', err);
  }
});

// DELETE tickets
async function deleteTicket(id) {
  try {
    await fetch(`${API_URL}/tickets/${id}`, { method: 'DELETE' });
    fetchTickets();
  } catch (err) {
    console.error('Failed to delete ticket', err);
  }
}

// PATCH tickets
async function updateTicket(id) {
  const newTitle = prompt('Enter new title:');
  if (!newTitle) return;
  try {
    await fetch(`${API_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle })
    });
    fetchTickets();
  } catch (err) {
    console.error('Failed to update ticket', err);
  }
}

// Initial fetch
fetchUsers();
fetchTickets();
