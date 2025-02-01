class ClientManager {
    constructor() {
        this.clients = JSON.parse(localStorage.getItem('clients')) || [];
        this.initializeEventListeners();
        this.renderClientList();
    }

    initializeEventListeners() {
        // Modal controls
        const modal = document.getElementById('clientFormModal');
        const addClientBtn = document.getElementById('addClientBtn');
        const closeBtn = document.querySelector('.close');

        addClientBtn.onclick = () => modal.style.display = 'block';
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        }

        // Form submission
        document.getElementById('clientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filterByStatus(e.target.value);
        });
    }

    handleFormSubmit() {
        const client = {
            id: Date.now(),
            name: document.getElementById('clientName').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            workType: document.getElementById('workType').value,
            price: document.getElementById('price').value,
            status: document.getElementById('status').value,
            dateAdded: new Date().toISOString()
        };

        this.clients.push(client);
        this.saveToLocalStorage();
        this.renderClientList();
        document.getElementById('clientForm').reset();
        document.getElementById('clientFormModal').style.display = 'none';
    }

    saveToLocalStorage() {
        localStorage.setItem('clients', JSON.stringify(this.clients));
    }

    updateClientStatus(clientId, newStatus) {
        const client = this.clients.find(c => c.id === clientId);
        if (client) {
            client.status = newStatus;
            this.saveToLocalStorage();
            this.renderClientList();
        }
    }

    filterByStatus(status) {
        const tbody = document.getElementById('clientsTableBody');
        tbody.innerHTML = '';
        
        const filteredClients = status === 'all' 
            ? this.clients 
            : this.clients.filter(client => client.status === status);

        this.renderClients(filteredClients);
    }

    renderClientList() {
        const tbody = document.getElementById('clientsTableBody');
        tbody.innerHTML = '';
        this.renderClients(this.clients);
    }

    renderClients(clients) {
        const tbody = document.getElementById('clientsTableBody');
        
        // Sort clients by status
        const sortedClients = clients.sort((a, b) => {
            const statusOrder = {
                'not_confirmed': 1,
                'in_process': 2,
                'completed': 3
            };
            return statusOrder[a.status] - statusOrder[b.status];
        });
        
        sortedClients.forEach(client => {
            const row = document.createElement('tr');
            row.classList.add(`status-row-${client.status}`); // Add status class for styling
            
            row.innerHTML = `
            <td>${client.name}</td>
            <td><a href="tel:${client.phone.replace(/[^\d+]/g, '')}" class="phone-link">${client.phone}</a></td>
                <td>
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.address)}" 
                       target="_blank" 
                       class="address-link">
                        ${client.address}
                    </a>
                </td>
                <td>${client.workType}</td>
                <td>$${client.price}</td>
                <td>
                    <select onchange="clientManager.updateClientStatus(${client.id}, this.value)"
                            class="status-select-${client.status}">
                        <option value="not_confirmed" ${client.status === 'not_confirmed' ? 'selected' : ''}>Not Confirmed</option>
                        <option value="in_process" ${client.status === 'in_process' ? 'selected' : ''}>In Process</option>
                        <option value="completed" ${client.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
                <td>
                    <button onclick="clientManager.deleteClient(${client.id})" class="btn delete-btn">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    deleteClient(clientId) {
        if (confirm('Are you sure you want to delete this client?')) {
            this.clients = this.clients.filter(client => client.id !== clientId);
            this.saveToLocalStorage();
            this.renderClientList();
        }
    }

    // Add sample data method
    addSampleData() {
        const sampleCustomers = [
            { name: "John Smith", address: "12234 97 Street NW, Edmonton, AB", workType: "Gutter cleaning", price: "180" },
            { name: "Emma Wilson", address: "5678 111 Avenue NW, Edmonton, AB", workType: "New eavestrough", price: "2500" },
            { name: "Michael Brown", address: "9876 156 Street NW, Edmonton, AB", workType: "Gutter cleaning", price: "220" },
            { name: "Sarah Davis", address: "4321 82 Avenue NW, Edmonton, AB", workType: "New eavestrough", price: "3200" },
            { name: "James Johnson", address: "7890 23 Avenue NW, Edmonton, AB", workType: "Gutter cleaning", price: "160" },
            { name: "Emily White", address: "3456 170 Street NW, Edmonton, AB", workType: "New eavestrough", price: "2800" },
            { name: "William Taylor", address: "6543 137 Avenue NW, Edmonton, AB", workType: "Gutter cleaning", price: "190" },
            { name: "Olivia Martin", address: "8901 51 Street NW, Edmonton, AB", workType: "New eavestrough", price: "2900" },
            { name: "Daniel Anderson", address: "2345 127 Street NW, Edmonton, AB", workType: "Gutter cleaning", price: "175" },
            { name: "Sophia Garcia", address: "7654 34 Avenue NW, Edmonton, AB", workType: "New eavestrough", price: "3100" },
            { name: "David Miller", address: "9012 76 Street NW, Edmonton, AB", workType: "Gutter cleaning", price: "195" },
            { name: "Isabella Moore", address: "5432 149 Street NW, Edmonton, AB", workType: "New eavestrough", price: "2700" },
            { name: "Joseph Clark", address: "8765 95 Street NW, Edmonton, AB", workType: "Gutter cleaning", price: "185" },
            { name: "Mia Rodriguez", address: "4567 106 Avenue NW, Edmonton, AB", workType: "New eavestrough", price: "3000" },
            { name: "Alexander Lee", address: "3210 167 Avenue NW, Edmonton, AB", workType: "Gutter cleaning", price: "170" },
            { name: "Ava Thompson", address: "6789 45 Street NW, Edmonton, AB", workType: "New eavestrough", price: "2600" },
            { name: "Christopher King", address: "1234 129 Avenue NW, Edmonton, AB", workType: "Gutter cleaning", price: "200" },
            { name: "Charlotte Wright", address: "8901 153 Street NW, Edmonton, AB", workType: "New eavestrough", price: "2950" },
            { name: "Andrew Scott", address: "5678 28 Avenue NW, Edmonton, AB", workType: "Gutter cleaning", price: "165" },
            { name: "Amelia Green", address: "4321 98 Street NW, Edmonton, AB", workType: "New eavestrough", price: "3300" }
        ];

        sampleCustomers.forEach((customer, index) => {
            const status = index % 3 === 0 ? 'not_confirmed' : 
                          index % 3 === 1 ? 'in_process' : 'completed';
            
            const client = {
                id: Date.now() + index,
                name: customer.name,
                phone: `780-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
                address: customer.address,
                workType: customer.workType,
                price: customer.price,
                status: status,
                dateAdded: new Date().toISOString()
            };

            this.clients.push(client);
        });

        this.saveToLocalStorage();
        this.renderClientList();
    }
}

// Initialize the client manager
const clientManager = new ClientManager(); 