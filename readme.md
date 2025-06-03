# XENO CRM Frontend

This is the React frontend for the XENO CRM demo application. It connects to a Node.js/Express backend and provides a modern UI for customer management, campaign creation, analytics, and more.

---

## Features

- User authentication (email/password & Google OAuth)
- Customer, order, and audience segment management
- Campaign creation and analytics
- AI-powered features (message variants, campaign summaries)
- Billing and invoices (mocked)
- Responsive, modern UI

---

## Tech Stack

- **Frontend:** React, Axios, React Router, CSS Modules
- **State Management:** React Context/Redux (if used)
- **API:** Connects to [XENO CRM Backend](https://github.com/yourusername/xeno-backend) (Node.js/Express/MongoDB)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/xeno-frontend.git
cd xeno-frontend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the `frontend` folder:

```
REACT_APP_API_BASE_URL=https://xeno-crm-backend-baz8.onrender.com
```

Update the value if your backend URL is different.

### 4. Start the development server

```sh
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## Deployment

You can deploy this frontend to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/):

- Push your code to GitHub.
- Import the repo in Vercel/Netlify.
- Set the `REACT_APP_API_BASE_URL` environment variable in the dashboard.
- Deploy!

---

## Folder Structure

```
src/
  components/
  pages/
  services/      # API logic (see src/services/api.js)
  styles/
  App.js
  index.js
.env
```

---

## API Reference

All API calls are managed in [`src/services/api.js`](src/services/api.js).  
Update `REACT_APP_API_BASE_URL` in your `.env` to point to your backend.

---

## License

MIT

---
Fullstack Architecture diagram:-https://drive.google.com/file/d/187bJl3oXM6U5HY991aO0G0YKj-97Rbz2/view?usp=drive_link
**For demo/interview use only.**
