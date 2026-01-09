"use client";

import LandingPage from "../components/landing/index";
import SmartLayout from "../components/layout/smartlayout";
import { Home } from "../components/home";

export default function HomePage() {
  return (
    <SmartLayout
      // Content shown when user is logged in (uses DashboardLayout)
      authContent={<Home />}
      // Content shown when user is not logged in (uses DefaultLayout)
      guestContent={<LandingPage />}
    />
  );
}

