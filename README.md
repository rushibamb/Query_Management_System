# QMS – Customer Query Management System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

A full-stack Customer Query Management System (QMS) built to function as an internal CRM for customer support operations. It features a public-facing portal for customers to submit tickets without authentication, alongside a secure agent dashboard for query triage, tracking, search, pagination, filtering, and resolution.

---

## 📌 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
  - [Public Portal](#public-portal)
  - [Admin Panel](#admin-panel)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Application Flow](#-application-flow)
- [Validation](#-validation)
- [UI Highlights](#-ui-highlights)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 📍 Live Demo

### Frontend:
[https://query-management-system-ten.vercel.app/](https://query-management-system-ten.vercel.app/)

### Backend API:
[https://query-management-system-p66e.onrender.com/api](https://query-management-system-p66e.onrender.com/api)

---

## ✨ Features

### Public Portal
- **Submit support request**: Public query submission form allowing clients to register support inquiries with category and priority selections.
- **Form validation**: Rigorous frontend check verifying required fields, string length boundaries, and email format guidelines before execution.
- **Success confirmation page**: Interactive submission receipt showcasing the submitted details, tracking reference index, and status.
- **Responsive UI**: Adaptive layout ensuring cross-device support for desktop, tablets, and smartphones.

### Admin Panel
- **Secure JWT authentication**: Role-based access control protecting api resources using Bearer tokens and request interceptors.
- **Dashboard statistics**: Aggregate counter cards providing real-time data on Total, Open, In Progress, Resolved, and High Priority queries.
- **Recent queries**: Activity feed list displaying the newest submitted inquiries directly on the main admin page.
- **Create Query**: Support agents can generate inquiries on behalf of customers straight from the panel.
- **View Query**: Specific inspection route rendering deep customer metadata, descriptive issues, and agent audit trails.
- **Edit Query**: Support operators can update the status, priority level, categorization, and description text.
- **Delete Query**: Soft deletion architecture that sets `isDeleted: true` to prevent data loss while keeping dashboards uncluttered.
- **Search**: Interactive query filter supporting full-text matching on customer name, email address, or subject.
- **Filter**: Dropdown selectors to triage support queues by Category, Priority, and Status.
- **Pagination**: Offset-based navigation system displaying 10 rows per page to maintain performance.
- **Logout**: Complete session termination that destroys local JWT credentials and redirects administrators back to the sign-in prompt.

---

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Single Page Application framework with hook state management |
| **Backend** | Node.js + Express.js | RESTful API server with modular controllers & router middleware |
| **Database** | MongoDB Atlas | Cloud-hosted document database modeled with Mongoose ODM |
| **Authentication** | JWT + bcrypt | Secure session management tokens and salted password hashing |
| **Styling** | Tailwind CSS | Utility-first responsive design framework |
| **Typography** | Plus Jakarta Sans | Clean, modern sans-serif typeface loaded via Google Fonts |
| **Deployment** | Vercel (Client) + Render (Server) | Hosting infrastructure with automatic rebuild pipelines |

---

## 📂 Folder Structure

```text
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AuthHeader.jsx
│   │   │   │   ├── AuthLayout.jsx
│   │   │   │   ├── PasswordInput.jsx
│   │   │   │   ├── ProfileDropdown.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── common/
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   └── Table.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── PageHeader.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── query/
│   │   │       ├── DeleteConfirmationModal.jsx
│   │   │       ├── FilterBar.jsx
│   │   │       ├── Pagination.jsx
│   │   │       ├── QueryForm.jsx
│   │   │       ├── QueryTable.jsx
│   │   │       └── SearchBar.jsx
│   │   ├── hooks/
│   │   │   └── useDebounce.js
│   │   ├── pages/
│   │   │   ├── AuthLoading.jsx
│   │   │   ├── CreateQuery.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditQuery.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── PublicQuery.jsx
│   │   │   ├── QueryDetails.jsx
│   │   │   ├── QueryList.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   └── queryService.js
│   │   ├── utils/
│   │   │   ├── authStorage.js
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   └── queryController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Query.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── queryRoutes.js
│   ├── .env.example
│   ├── app.js
│   ├── package.json
│   └── server.js
├── vercel.json
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/rushibamb/Query_Management_System.git
cd Query_Management_System
```

### 2. Configure Backend Server
1. Navigate into the `server` directory:
   ```bash
   cd server
   ```
2. Install Node package dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` settings with your MongoDB cluster details and secret keys (Refer to [Environment Variables](#-environment-variables)).
5. Start the backend API process:
   ```bash
   npm run dev
   ```

### 3. Configure Frontend Client
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Create your frontend environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Run the local development server:
   ```bash
   npm run dev
   ```
5. Visit the client dashboard in your browser at `http://localhost:5173`.

---

## 🔑 Environment Variables

### Backend Configuration (`server/.env`)

| Variable | Purpose | Default / Example Value |
| :--- | :--- | :--- |
| `PORT` | Local network port the server listens to | `5000` |
| `MONGODB_URI` | Full connection URI to the MongoDB cluster | `mongodb+srv://<username>:<password>@cluster0.mongodb.net/qms` |
| `NODE_ENV` | Mode setting indicating environment context | `development` |
| `JWT_SECRET` | Cryptographic signature secret used for JWT generation | `replace_with_a_long_random_secret_key` |
| `JWT_EXPIRES_IN` | Duration span before administrative tokens expire | `7d` |
| `CLIENT_URL` | Cross-Origin Resource Sharing (CORS) whitelist domain | `http://localhost:5173` |

### Frontend Configuration (`client/.env`)

| Variable | Purpose | Default / Example Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base endpoint location pointing to backend Express API | `http://localhost:5000/api` |

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Public/Admin |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/auth/setup` | Verification checking if root Admin setup is complete | Public |
| **POST** | `/api/auth/register` | Registers the initial Administrator account (disabled after setup) | Public |
| **POST** | `/api/auth/login` | Authenticates email + password and yields dynamic JWT | Public |

### Dashboard Routes (`/api/dashboard`)
| Method | Endpoint | Description | Public/Admin |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/dashboard` | Fetches aggregate metrics counters and recent tickets feed | Admin |

### Query Routes (`/api/queries`)
| Method | Endpoint | Description | Public/Admin |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/queries` | Submits a new support inquiry ticket | Public |
| **GET** | `/api/queries` | Fetches list of active queries with search filters & pagination | Admin |
| **GET** | `/api/queries/:id` | Fetches complete schema details of one specific ticket | Admin |
| **PUT** | `/api/queries/:id` | Modifies ticket values (status, category, priority, details) | Admin |
| **DELETE** | `/api/queries/:id` | Flags ticket record `isDeleted: true` (soft delete) | Admin |

---

## 🗄️ Database Schema

The database uses MongoDB managed via **Mongoose**. Below is the schema detail for the **Query** document model (`server/models/Query.js`).

| Field | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `customerName` | String | **Yes** | - | Full name of the client submitting the ticket (max 100 chars) |
| `customerEmail` | String | **Yes** | - | Validated lowercased email address for agent correspondence |
| `subject` | String | **Yes** | - | Concise header topic representing the customer's query (max 150 chars) |
| `description` | String | **Yes** | - | Complete problem breakdown detailing the issue (max 2000 chars) |
| `category` | String | **Yes** | `'General'` | Categorization: `'Technical'`, `'Billing'`, `'Account'`, or `'General'` |
| `priority` | String | **Yes** | `'Medium'` | Priority level: `'Low'`, `'Medium'`, or `'High'` |
| `status` | String | **Yes** | `'Open'` | Current tracking state: `'Open'`, `'In Progress'`, or `'Resolved'` |
| `isDeleted` | Boolean | **Yes** | `false` | soft delete flag filtering the record out of query lists |
| `createdBy` | ObjectId | No | - | Reference targeting the `Admin` model who raised this query |
| `updatedBy` | ObjectId | No | - | Reference targeting the `Admin` model who performed the last edit |
| `createdAt` | Date | - | - | Auto-generated timestamp recording ticket creation time |
| `updatedAt` | Date | - | - | Auto-generated timestamp capturing ticket edit time |

---

## 🔄 Application Flow

```text
  Customer / Visitor
         ↓
  Submit Ticket Form (Public Portal)
         ↓
  [Frontend Validators] (Checks formatting/missing inputs)
         ↓
  [Backend Controller] (Validates & saves record)
         ↓
  Stored in MongoDB (Indexed Query schema)
         ↓
  Success Confirmation Page (Renders Tracking Ref & Ticket Details)
         ↓
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ↓
  Admin Portal Page (/login)
         ↓
  JWT Token Handshake (Stored locally via authStorage)
         ↓
  Secure Layout Dashboard (Protected Route check)
         ↓
  Analyze Stats & Live Grid (Search, Filter, Paginate queries)
         ↓
  Edit/Resolve Tickets or Soft Delete (Maintains records safety)
```

---

## 🛡️ Validation

To maintain consistent data integrity, the system implements validation on both ends:

### Frontend Validation (`client/src/utils/validators.js`)
- **Required Fields check**: Ensures essential attributes (`customerName`, `customerEmail`, `subject`, `description`, `category`, `priority`, `status`) contain text data.
- **Character Boundaries**: Validates string lengths to prevent overflow (`customerName` ≤ 100, `subject` ≤ 150, `description` ≤ 2000).
- **Email Regex Formatting**: Verifies input conforms to valid email standards (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) before triggering Axios requests.

### Backend Validation (`server/controllers/queryController.js` & `authController.js`)
- **Controller Rules**: Re-checks and sanitizes raw JSON body data against identical string constraints, throwing a `400 Bad Request` on failure.
- **Enumeration Checking**: Locks down `category`, `priority`, and `status` to only accept strict database model options.
- **Unique Account Restraints**: Validates registration emails during initial setup (`409 Conflict` if existing) and matches hashed passwords using `bcrypt.compare` on login.

---

## 🎨 UI Highlights

- **Responsive Design**: Adapts beautifully to mobile, tablet, and widescreen layouts using Tailwind grid/flex utilities.
- **Clean Dashboard**: Sleek dashboard view visualizing query status breakdown and quick-glance graphs.
- **Modern Cards**: Styling enhancements leveraging smooth drop-shadow shadows and rounded container profiles.
- **Search & Filters**: Debounced filter bar allowing real-time query list updating.
- **Pagination**: Interactive pagination controls displaying records-per-page counts and navigation states.
- **Hover Effects**: Micro-interactions utilizing Tailwind transitions (scale, color shifts) for interactive tags.
- **Toast Notifications**: Interactive state notifications powered by `react-hot-toast` for warnings, edits, and errors.
- **Loading States**: Skeletons and custom loaders for asynchronous API calls.
- **Empty States**: Customized empty dashboards rendering clear messages when no queries match filters.

---

## 🔮 Future Improvements

- **Email notifications**: Automated SMTP triggers notifying clients on status changes (e.g. from 'Open' to 'Resolved').
- **File attachments**: File upload capabilities (images, error logs, screenshots) stored on AWS S3 or Cloudinary.
- **Role-based access (RBAC)**: Distinct permissions for `Super Admin`, `Manager`, and `Support Agent` tiers.
- **Analytics Dashboard**: Graphical reports mapping average resolution times, volume trends, and ticket spikes.
- **Export to CSV**: CSV sheet downloads for offline data auditing and manager reviews.
- **Activity Logs**: Detailed audit ledger logging query alterations to keep history transparent.

---

## ✍️ Author

- **Name**: Rushikesh Bamb
- **GitHub**: [@rushibamb](https://github.com/rushibamb)
- **LinkedIn**: [Rushikesh Bamb](https://linkedin.com/in/rushikesh-bamb) *(placeholder)*
- **Email**: [rushikesh.bamb@example.com](mailto:rushikesh.bamb@example.com) *(placeholder)*
