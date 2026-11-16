# Flight Seat Selection & Passenger Management

An interactive, production-grade flight seat selection and passenger management interface built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## Live Demo & Repository
- **Repository:** Complete source code ready for GitHub submission
- **Deployment:** Zero-config deployable to Vercel, Netlify, or GitHub Pages

---

## Overview & Key Highlights

This application implements an airline cabin seat reservation workflow, allowing travelers to configure passenger counts, navigate realistic aircraft fuselages, assign and change individual seats, select complimentary or gourmet in-flight meals, and view real-time pricing breakdowns.

### Functional Capabilities
- **Flexible Aircraft Configurations**:
  - **3–2 Configuration** (Narrow Body, Airbus A220) with single aisle.
  - **2–3–2 Configuration** (Wide Body, Airbus A330) with twin aisles.
  - Quick-switch toggle with destructive state protection.
- **Passenger Management**:
  - Dynamic passenger count (1 to 9 passengers).
  - One-click active passenger switching.
  - Per-passenger seat badges with direct release (`✕`) action.
  - Edge-case protected count reduction with confirmation dialogs.
- **Collision-Proof Seat Assignment**:
  - Occupied seats locked against selection with hatched pattern and `✕` indicators.
  - Automatic seat replacement when choosing an alternate seat.
  - Toggle-to-unassign by clicking the passenger's own seat.
  - Mutual exclusion preventing two passengers from sharing a seat.
- **Dynamic Pricing & Live Calculations**:
  - Multi-tier seat pricing: **Standard (Free / ₹0)**, **Premium Front (₹250)**, and **Extra Legroom (₹350)**.
  - Zero stored redundant totals; all financial figures are derived via memoized selectors.
- **Bonus: In-Flight Meal Selection**:
  - Full dietary support: **Vegetarian**, **Non-Vegetarian**, **Vegan**, and **Jain**.
  - Complimentary (₹0) and gourmet paid options (e.g. Royal Dum Biryani, Tandoori Paneer Tikka).
  - Integrated into per-passenger line items and total fare calculation.
- **Accessibility & Responsiveness**:
  - Fully accessible native `<button>` elements with descriptive `aria-label` and `aria-disabled`.
  - Visible focus rings for keyboard navigation.
  - Color-blind safe: every state features unique geometric shapes, icons, and textural patterns (e.g. `✓` for your seat, `👤` for other passengers, `✕` with hatched stripes for booked, `★` for premium, `+` for extra legroom).
  - Responsive down to 360px mobile viewports with zero horizontal page scroll.
- **Error, Skeleton & Feedback States**:
  - Non-blocking auto-dismissing toast notifications for invalid and valid actions.
  - Interactive simulator buttons for **Skeleton Loading** and **Error State with Retry**.

---

## State Management & Assignment Logic

### 1. Single Source of Truth
Application state is centralized in a clean `useReducer` store exposed via React Context (`BookingProvider`).

```typescript
export interface BookingState {
  layoutType: LayoutType;           // '3-2' | '2-3-2'
  passengerCount: number;          // 1 - 9
  passengers: Passenger[];         // [{ id, name, assignedSeatId, selectedMealId }]
  activePassengerId: string | null;// Pointer to currently selected passenger
}
```

### 2. Seat Assignment Algorithm (`ASSIGN_SEAT`)
When any seat is clicked, the reducer processes the action through strict sequential guard clauses:
1. **Active Passenger Guard**: Verifies an active passenger is selected.
2. **Occupancy Guard**: Checks pre-booked seats in $O(1)$ time using `OCCUPIED_SEATS[layoutType].has(seatId)`.
3. **Collision Guard**: Scans `passengers` to ensure the seat is not owned by another passenger (`p.assignedSeatId === seatId && p.id !== activePassengerId`).
4. **Self-Toggle (Unassign)**: If the active passenger already owns this seat, it sets `assignedSeatId: null` (toggling off).
5. **Assignment & Replacement**: Assigns the seat to the active passenger, automatically replacing any prior seat assignment in a single immutable transition.

### 3. Derived Computation (Never Stored)
Totals and breakdown charges are never duplicated in state. Derived utility functions compute:
- `calculateTotal(passengers, seatMap)`
- `getPricingLineItems(passengers, seatMap)`
- `formatPrice(price)` (displays `"Free"` for ₹0, otherwise `₹X`)

This completely eliminates out-of-sync cache bugs across layout switches, seat changes, meal updates, and passenger reductions.

### 4. Destructive Action Confirmations
- **Layout Switching**: Switching between 3–2 and 2–3–2 clears seat assignments because seat coordinates differ. If any passenger has an assigned seat, a modal confirms the action before clearing.
- **Passenger Reduction**: Decrementing passenger count checks if the passenger being removed currently holds an assigned seat. If so, a confirmation modal alerts the user that the assigned seat will be released.

---

## Project Structure

```
src/
├── components/
│   ├── airplane/
│   │   ├── AirplaneCabin.tsx       # Fuselage container, cockpit, tail & scroll wrapper
│   │   ├── CabinHeader.tsx         # Sticky column letters with aisle gaps
│   │   ├── CabinLegend.tsx         # Category, status & pricing visual legend
│   │   ├── CabinRow.tsx            # Single row with seat clusters, aisles & exit doors
│   │   └── SeatItem.tsx            # Accessible interactive seat component (5 states)
│   ├── feedback/
│   │   ├── CabinSkeleton.tsx       # Shimmering aircraft loading skeleton
│   │   ├── ErrorState.tsx          # Error screen with retry action
│   │   ├── ToastContext.ts         # Toast notification context & hook
│   │   └── ToastProvider.tsx       # Floating toast container & timer
│   ├── meals/
│   │   └── MealSelectorModal.tsx   # In-flight dietary meal selection dialog
│   ├── passengers/
│   │   ├── PassengerList.tsx       # Passenger cards, seat/meal badges & quick actions
│   │   └── PassengerSelector.tsx   # Count controls with seat release confirmation
│   └── pricing/
│       └── PricingSummary.tsx      # Per-passenger line items, subtotals & live grand total
├── data/
│   ├── meal.ts                     # Complimentary & gourmet meal catalog
│   └── seat.ts                     # Layout seat generators & mock occupied seats
├── store/
│   ├── BookingContext.ts           # React Context & useBooking custom hook
│   ├── BookingProvider.tsx         # Context Provider
│   └── bookingstore.ts             # State interface, initial state, reducer & actions
├── types/
│   ├── feedback.ts                 # Toast types
│   ├── layout.ts                   # Aircraft layout configurations
│   ├── meal.ts                     # Meal types & dietary categories
│   ├── passenger.ts                # Passenger interface
│   └── seat.ts                     # Seat categories, pricing & interfaces
├── utils/
│   └── pricing.ts                  # Pure pricing calculators & formatters
├── App.tsx                         # Root layout, navigation & demo simulation controls
├── index.css                       # Tailwind CSS entrypoint
└── main.tsx                        # React DOM mounting
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** or **pnpm**

### Installation
```bash
git clone <your-repo-url>
cd kpaisa-assesment
npm install
```

### Development
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Linting
```bash
npm run lint
```
Runs Oxlint across all TypeScript and TSX files.

### Production Build
```bash
npm run build
```
Type-checks with `tsc -b` and bundles with Vite.

