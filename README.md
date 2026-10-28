# Scheme Saathi (योजना साथी / ಯೋಜನೆ ಸಾಥಿ)

**Scheme Saathi** is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed for Indian citizens to discover all Central and State government welfare schemes they are eligible for.

---

## Key Features

1. **Trilingual UI & Data Layer**: Full support for **English**, **Hindi (हिन्दी)**, and **Kannada (ಕನ್ನಡ)** with a language switcher. Scheme names, benefits, and required documents dynamically adapt to the active language.
2. **Structured Eligibility Limits Engine**: Matches citizen attributes (`minAge`, `maxAge`, `maxIncome`, `genders`, `castes`, `occupations`, `disability`, `state`). A missing limit strictly signifies **no restriction**.
3. **No Arbitrary Fixed Cap**: Live total count with an uncapped paginated "Load more" mechanism (`POST /api/schemes/match`).
4. **JWT Authentication & Citizen Profile**: Secure registration with `bcryptjs` password hashing and persistent JWT authentication.
5. **Dual Mode (Mock API & Live MongoDB Backend)**: Seamlessly toggle between client-side mock testing and the live MongoDB/Express server with one click.
6. **Zero-Friction Database Setup**: The Express backend automatically falls back to an embedded MongoDB memory server if a local MongoDB service is not present.
7. **15 Authentic Indian Schemes Pre-Seeded**:
   - PM-KISAN (Central, Agriculture)
   - Ayushman Bharat - PM-JAY (Central, Healthcare)
   - PM Awas Yojana (Central, Housing)
   - Sukanya Samriddhi Yojana (Central, Girl Child)
   - PM Ujjwala Yojana 2.0 (Central, Women & Clean Fuel)
   - PM SVANidhi (Central, Street Vendors)
   - PM Vishwakarma (Central, Traditional Artisans)
   - Indira Gandhi National Old Age Pension Scheme (Central, Senior Citizens)
   - Stand-Up India Scheme (Central, SC/ST & Women Entrepreneurs)
   - Post-Matric Scholarship (Central, SC/ST/OBC Students)
   - Divyangjan Swavalamban Scheme (Central, Persons with Disabilities)
   - Gruha Lakshmi Scheme (State, Karnataka)
   - Yuva Nidhi Scheme (State, Karnataka)
   - Gruha Jyothi Scheme (State, Karnataka)
   - Mukhyamantri Majhi Ladki Bahin Yojana (State, Maharashtra)

---

## Directory Structure

```
scheme-saathi/
├── client/                     # React + Vite + Tailwind CSS + react-i18next
│   ├── src/
│   │   ├── components/         # Navbar, ProfileForm, SchemeCard, SchemeFilterBar, etc.
│   │   ├── context/            # AuthContext & Profile State
│   │   ├── i18n/               # Trilingual config & locales (en, hi, kn)
│   │   ├── services/           # api.js, mockApi.js, schemeData.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/                     # Express + Mongoose + JWT + bcryptjs
    ├── src/
    │   ├── config/             # Database connection & MongoMemoryServer fallback
    │   ├── controllers/        # authController.js & schemeController.js
    │   ├── data/               # 15 sample trilingual schemes
    │   ├── middleware/         # authMiddleware.js (JWT protect)
    │   ├── models/             # User.js & Scheme.js
    │   ├── routes/             # authRoutes.js & schemeRoutes.js
    │   ├── scripts/            # seed.js (CLI database seeder)
    │   └── server.js
    └── package.json
```

---

## Quick Start Instructions

### 1. Start the Backend Server

```bash
cd server
npm start
```

The server runs at `http://localhost:5000/api`. The database will automatically connect and seed the 15 trilingual schemes if empty.

### 2. Start the Frontend Client

```bash
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Testing Pre-configured Citizens

You can sign in with:
- **Farmer Profile**: `ramesh@example.com` / `password123`
- **Artisan / Woman Profile**: `sunita@example.com` / `password123`
- Or use the instant **"Demo: Farmer"**, **"Demo: Woman"**, and **"Demo: Student"** one-click buttons in the profile header!

---

## API Endpoints

- `POST /api/auth/register` - Create citizen account with profile
- `POST /api/auth/login` - Authenticate citizen and receive JWT
- `GET /api/auth/me` - Fetch authenticated citizen profile
- `PUT /api/auth/profile` - Update citizen eligibility criteria
- `POST /api/schemes/match` - Match schemes based on profile limits and pagination
- `GET /api/schemes/:id` - Fetch scheme details by ID or code
- `GET /api/schemes/seed` - Re-seed the 15 sample schemes
