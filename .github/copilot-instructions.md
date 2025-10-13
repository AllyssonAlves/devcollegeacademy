# Copilot AI Agent Instructions for DevCollege Academy

## Project Overview
- **Type:** React SPA (Create React App)
- **Purpose:** Landing page and admin dashboard for a children's technology course platform
- **Main Features:**
  - Public site: Home, Courses, About, Plans, Testimonials, Contact
  - Admin area: Dashboard, Course/Plan/Student/Testimonial management, Metrics, Settings

## Architecture & Data Flow
- **State Management:**
  - Uses a custom React context (`src/context/AppContext.js`) for global state (courses, plans, students, testimonials, siteConfig, metrics)
  - All admin CRUD actions dispatch to a reducer; state is persisted to `localStorage` (key: `devcollege_data`)
  - Some legacy API simulation in `src/utils/api.js` (for courses, plans, testimonials) but main data is in context
- **Routing:**
  - `react-router-dom` v6, routes defined in `src/App.js` and `src/pages`
  - `/` = public site (`Home`), `/admin` = admin login/dashboard
- **Admin UI:**
  - Tabbed dashboard (`AdminDashboard.js`) with subcomponents for each resource (CourseManager, PlanManager, StudentManager, SettingsManager, MetricsDashboard)
  - Metrics and charts use mock/demo data, not real analytics
- **Styling:**
  - CSS modules in `src/styles/` (not CSS-in-JS)
  - Uses CSS variables for theme colors, gradients, and responsive design

## Developer Workflows
- **Start Dev Server:** `npm start`
- **Build for Production:** `npm run build`
- **Run Tests:** `npm test` (Jest + React Testing Library, see `src/App.test.js`)
- **No backend/server code**—all data is local and simulated

## Project-Specific Patterns & Conventions
- **State shape and actions:**
  - See `AppContext.js` for all action types and initial state structure
  - All admin resource managers (Course, Plan, Student) follow the same CRUD pattern: local form state, dispatch to context, reset form
- **Persistence:**
  - All changes in admin are auto-saved to `localStorage` (see `AppContext.js` useEffect hooks)
  - Resetting settings or data clears `localStorage` and reloads the app
- **Component Structure:**
  - Public components in `src/components/`
  - Admin components in `src/components/admin/` (with further subfolders for Charts and Widgets)
  - Pages in `src/pages/`
- **Styling:**
  - Use existing CSS classes and variables; do not introduce new global styles
  - Responsive layouts are handled in CSS, not JS
- **Language:**
  - UI and code comments are primarily in Brazilian Portuguese

## Integration Points
- **No external API calls**—all data is local
- **No authentication backend**—admin login is simulated (see `AdminLogin.js`)
- **No analytics or payment integration**

## Examples
- To add a new admin resource, follow the CRUD pattern in `CourseManager.js`, `PlanManager.js`, or `StudentManager.js`
- To add a new metric or chart, see `MetricsDashboard.js` and `Charts/`

## Key Files
- `src/context/AppContext.js` — global state, reducer, persistence
- `src/components/admin/` — admin dashboard and resource managers
- `src/styles/` — all CSS (theme, admin, components)
- `src/pages/` — route entry points

## Do/Don't for AI Agents
- **Do:**
  - Use context and reducer for all stateful changes
  - Keep UI/UX consistent with existing admin and public components
  - Use and extend existing CSS classes/variables
  - Write code and comments in Portuguese when user-facing
- **Don't:**
  - Add backend/server code or external API calls
  - Change the persistence model (must remain localStorage-based)
  - Introduce new state management libraries
  - Add new global styles or break CSS variable usage
