"use client";

import LandingPage from "../../components/landing/index";
import SmartLayout from "../../components/layout/smartlayout";
import { Settings } from "../../components/settings";

export default function SettingsPage() {
    return (
        <SmartLayout
            // Content shown when user is logged in
            authContent={<Settings />}
            // Content shown when user is not logged in
            guestContent={<LandingPage />}
        />
    );
}
