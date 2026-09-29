# SkillScan Platform (MERN Architecture)

**Organization**: Government Of Maharashtra  
**Department**: Maharashtra State Innovation Society (MSInS), Department of Skills, Employment, Entrepreneurship and Innovation  
**Executive Directorate**: Directorate of Vocational Education & Training (DVET)

Skill intelligence, labour-market analytics, and trade-curriculum alignment decision platform turning industry demand signals into district-, role-, and institute-level training recommendations.

---

## Architecture Overview

The repository is structured as a decoupled MERN stack:

```
skillscan-platform/
├── frontend/               # React (Vite) + Redux Toolkit + TailwindCSS + JSX
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx         # App root with Redux Provider & Language Provider
│       ├── main.jsx        # DOM mounting
│       ├── components/     # UI widgets (DemandGauge, MaharashtraMap, Navbar, EvidenceDrawer)
│       ├── pages/          # 10 domain pages (Landing, GovDashboard, SkillGap, etc.)
│       ├── layouts/        # MainLayout with header, navigation, toast, and footer
│       ├── routes/         # AppRoutes modular route switcher
│       ├── redux/          # Redux Toolkit store, 9 domain slices & API services
│       ├── services/       # Centralized API client (apiClient)
│       ├── lib/            # Specialized API functions
│       ├── data/           # Frontend GIS and district reference datasets
│       └── utils/          # Formatters, constants, helpers
│
├── backend/                # Node.js + Express + MongoDB/Mongoose + Seed Engine
│   ├── package.json
│   ├── server.js           # Standard Express MERN server (routes, middleware, db init)
│   ├── config/             # Environment configuration (PORT, MongoDB, Gemini API)
│   ├── db/                 # Unified MongoDB + in-memory mock repository
│   ├── routes/             # Express API routing index
│   ├── controllers/        # Domain controllers
│   ├── modules/            # Domain controllers, routes, repositories, services
│   ├── models/             # Mongoose schemas & data models
│   ├── middleware/         # Error handler & 404 middleware
│   ├── data/               # Seed datasets (districts, courses, skills, etc.)
│   └── services/           # AI & third-party integrations
│
├── .gitignore
└── README.md
```

---

