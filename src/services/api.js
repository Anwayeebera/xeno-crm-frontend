import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add interceptor to add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const loginUser = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
};

export const googleLogin = async (tokenId) => {
    const response = await api.post('/users/google-login', { tokenId });
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// Customer APIs
export const customerAPI = {
    create: async (customerData) => {
        const response = await api.post('/customers', customerData);
        return response.data;
    },
    getAll: async (page = 1, limit = 10) => {
        const response = await api.get(`/customers?page=${page}&limit=${limit}`);
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/customers/${id}`);
        return response.data;
    },
    update: async (id, customerData) => {
        const response = await api.put(`/customers/${id}`, customerData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/customers/${id}`);
        return response.data;
    }
};

// Order APIs
export const orderAPI = {
    create: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },
    getByCustomerId: async (customerId) => {
        const response = await api.get(`/orders/customer/${customerId}`);
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },
    update: async (id, orderData) => {
        const response = await api.put(`/orders/${id}`, orderData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/orders/${id}`);
        return response.data;
    }
};

// Audience Segment APIs
export const audienceAPI = {
    create: async (segmentData) => {
        const response = await api.post('/audience-segments', segmentData);
        return response.data;
    },
    preview: async (rules) => {
        // POST to /customers/preview or similar endpoint
        const response = await api.post('/customers/preview', { rules });
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/audience-segments');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/audience-segments/${id}`);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/audience-segments/${id}`);
        return response.data;
    }
};

// Campaign APIs
export const campaignAPI = {
    create: async (campaignData) => {
        const response = await api.post('/campaigns', campaignData);
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/campaigns');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/campaigns/${id}`);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/campaigns/${id}`);
        return response.data;
    },
    getStats: async (campaignId) => {
        const response = await api.get(`/logs/campaign/${campaignId}`);
        return response.data;
    }
};

// Communication Log APIs
export const communicationAPI = {
    getCampaignLogs: async (campaignId) => {
        const response = await api.get(`/communication-logs/campaign/${campaignId}`);
        return response.data;
    },
    getCustomerLogs: async (customerId) => {
        const response = await api.get(`/communication-logs/customer/${customerId}`);
        return response.data;
    }
};

// Delivery Receipt APIs
export const deliveryAPI = {
    updateStatus: async (statusData) => {
        const response = await api.post('/delivery-receipts', statusData);
        return response.data;
    }
};

// AI Feature APIs
export const aiAPI = {
    convertToRules: async (prompt) => {
        const response = await api.post('/ai/natural-language-to-rules', { prompt });
        return response.data;
    },
    generateMessageVariants: async (campaignObjectives) => {
        const response = await api.post('/ai/message-variants', campaignObjectives);
        return response.data;
    },
    getCampaignSummary: async (campaignId) => {
        const response = await api.get(`/ai/campaign-summary/${campaignId}`);
        return response.data;
    },
    getScheduleSuggestions: async (campaignData) => {
        const response = await api.post('/ai/schedule-suggestions', campaignData);
        return response.data;
    }
};

// Billing APIs
export const billingAPI = {
    getPlan: async () => {
        // Simulate API call
        return {
            type: "Startup",
            billingCycle: "Monthly",
            price: 999
        };
        // In real: const res = await api.get('/billing/plan'); return res.data;
    },
    upgrade: async ({ plan, billingCycle }) => {
        // Simulate API call
        return { success: true };
        // In real: await api.post('/billing/upgrade', { plan, billingCycle });
    },
    getPaymentMethod: async () => {
        // Simulate API call
        return { display: "Visa **** 4242" };
        // In real: const res = await api.get('/billing/payment-method'); return res.data;
    },
    saveCard: async ({ card }) => {
        // Simulate API call
        return { success: true };
        // In real: await api.post('/billing/payment-method', { token });
    },
    getUpcoming: async () => {
        // Simulate API call
        return {
            amount: 999,
            date: "2024-07-01",
            currency: "INR",
            discount: 20
        };
        // In real: const res = await api.get('/billing/upcoming'); return res.data;
    },
    getInvoices: async (year) => {
        // Simulate API call
        return [
            { month: "June 2024", url: "/invoices/june-2024.pdf", amount: 999 },
            { month: "May 2024", url: "/invoices/may-2024.pdf", amount: 999 }
        ].filter(inv => inv.month.includes(year));
        // In real: const res = await api.get(`/billing/invoices?year=${year}`); return res.data;
    },
    emailInvoice: async (url) => {
        // Simulate API call
        alert("Invoice sent to your email!");
        // In real: await api.post('/billing/email-invoice', { url });
    }
};

// Error handling helper
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        return {
            status: error.response.status,
            message: error.response.data.message || 'An error occurred',
            data: error.response.data
        };
    } else if (error.request) {
        // Request made but no response
        return {
            status: 503,
            message: 'Service unavailable'
        };
    } else {
        // Something else went wrong
        return {
            status: 500,
            message: 'An unexpected error occurred'
        };
    }
};