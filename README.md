# AttendSmart — Student Mobile App

A React Native (Expo) app for students to register for courses, view schedules, and mark attendance via facial recognition and geofencing. It talks to the [Smart-Attendance-System-API](../Smart-Attendance-System-API) backend and is the mobile counterpart to the [attend-smart-lecturer](../attend-smart-lecturer) web dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Design System](#design-system)

## Features

- **Authentication** — sign up, login, password reset
- **Course Registration & Enrollment**
- **Attendance Tracking**, including a per-course attendance summary/history
- **Geofencing** for location-based attendance (`expo-location`)
- **Facial Recognition** for attendance verification (`expo-camera`)
- **Class Schedule Management**, with a calendar view

## Tech Stack

- **Framework:** React Native + Expo (SDK 52), TypeScript
- **Navigation:** `expo-router` (file-based routing)
- **UI:** NativeWind (Tailwind) + gluestack-ui
- **State:** Redux Toolkit + redux-persist (`AsyncStorage` on native, `localStorage` on web)
- **HTTP:** Axios, with a request/response interceptor pair for auth (see [Authentication](#authentication))
- **Media:** Expo Camera / Image Picker, Cloudinary (profile image storage)
- **Testing:** Jest (`jest-expo` preset)
- **Backend:** ASP.NET Core API (separate project — see root `CLAUDE.md`/`README.md`)

## Folder Structure

```
attend-smart/
├── app/                                # file-based routes (expo-router)
│   ├── _layout.tsx                     # Root layout: fonts, Redux Provider/PersistGate, GluestackUIProvider
│   └── (app)/
│       ├── _layout.tsx                 # Stack for (tabs) / start / (auth) / update-profile
│       ├── start.tsx                   # Welcome screen (Login / Sign up)
│       ├── update-profile.tsx
│       ├── (auth)/                     # login, signup, forgot-password
│       └── (tabs)/
│           ├── _layout.tsx             # Redirects to /start when not authenticated
│           ├── index.tsx               # Bottom tab navigator (home, schedules, profile)
│           ├── home.tsx
│           ├── schedules.tsx
│           └── profile.tsx
├── assets/                             # fonts, images
├── components/
│   ├── ui/                             # gluestack-ui primitives (button, avatar, text, ...)
│   │   └── gluestack-ui-provider/config.ts   # Color tokens — see Design System
│   ├── forms/                          # Form fields, dropdown, checkbox
│   ├── layouts/                        # Tab bar icon, etc.
│   ├── CourseList.tsx, RegisterCourse.tsx, TakeAttendance.tsx, ...   # Home-screen feature widgets
│   ├── attendanceReport.tsx, calendarSchedule.tsx                    # Schedules-screen widgets
│   └── FaceRecognition.tsx, Camera.tsx                               # Attendance capture flow
├── constants/
│   ├── config.ts                       # API base URL / timeouts
│   ├── endpoints.ts                    # API endpoint paths + PUBLIC_ENDPOINTS
│   ├── forms.ts, data.ts               # Static form/field definitions
│   └── types/                          # Shared TypeScript types
├── hooks/                              # Custom hooks
├── services/                           # API clients (auth, course, schedule, cloudinary, ...)
│   ├── api.ts                          # Axios instance + auth interceptors
│   └── utils/                          # storage.ts, tokenHelper.ts, serviceHandler.ts
└── store/
    ├── store.ts                        # Redux store + redux-persist config
    └── slices/                         # auth, profile, course slices
```

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/) and npm
- A running instance of [Smart-Attendance-System-API](../Smart-Attendance-System-API)
- A device/emulator (Android/iOS), or a web browser for `npm run web`

### Install & run

This project lives at `smart-attendance/attend-smart` inside the wider Smart Attendance repo — you need to be inside *this* folder before running anything below, not the repo root.

1. Open a terminal and move into this project's folder:

   ```sh
   cd path/to/smart-attendance/attend-smart
   ```

2. Confirm you're in the right place — this should list `package.json`, `app/`, `components/`, etc.:

   ```sh
   ls
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Add your environment variables — see [Environment Variables](#environment-variables) below — before starting the app, since it needs `EXPO_PUBLIC_API_URL` to reach the backend.

5. Start the dev server:

   ```sh
   npx expo start
   ```

6. Press `a` / `i` / `w` in the terminal (or scan the QR code with Expo Go) to open on Android, iOS, or the web. You should land on the welcome screen; the tabs (`home`/`schedules`/`profile`) will redirect you to it until you log in.

## Environment Variables

Create a `.env` in the project root:

```sh
EXPO_PUBLIC_API_URL=http://localhost:5000/api            # Smart-Attendance-System-API base URL
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name         # Profile image uploads
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset   # Profile image uploads
```

## Available Scripts

```sh
npx expo start     # Start Metro dev server (or: npm start)
npm run android      # Run on Android
npm run ios           # Run on iOS
npm run web             # Run in browser
npm test                 # Run Jest tests (watch mode)
npm run lint               # Lint via expo lint
```

## Authentication

`services/api.ts` configures an Axios instance whose request interceptor attaches `Authorization: Bearer <accessToken>` to any non-public endpoint, and whose response interceptor catches `401`s, calls the API's refresh-token endpoint, and retries the original request once. Tokens and user profile live in the `auth` Redux slice (`store/slices/authSlice.ts`) and are persisted via `redux-persist` (`services/utils/storage.ts` — `AsyncStorage` on native, `localStorage` on web), so a session survives an app restart. Route protection is handled in `app/(app)/(tabs)/_layout.tsx`, which reads `isAuthenticated` from the store and issues an `expo-router` `<Redirect href="/start" />` when it's false.

## Design System

The brand color is green, applied as a light theme: light, near-white/mint backgrounds (`bg-primary-0`) with dark green (`bg-primary-500`/`#1A3636`) reserved for buttons, avatars, and other tappable/accent surfaces, and used as the text/icon color for content sitting directly on a light background. Tokens are defined per light/dark mode in [`components/ui/gluestack-ui-provider/config.ts`](components/ui/gluestack-ui-provider/config.ts) as NativeWind CSS vars (`--color-primary-*`, `--color-typography-*`, etc.) and consumed through Tailwind utility classes (`bg-primary-500`, `text-primary-500`, ...) — component-level styling should go through these tokens rather than hardcoded hex values, so the theme stays consistent as screens are added.

## Contributing

Feel free to open issues and pull requests!

## Contact

- **Developer**: [Sim Codes](https://github.com/sim-codes)
- **Repository**: [github.com/sim-codes/attend-smart](https://github.com/sim-codes/attend-smart)
