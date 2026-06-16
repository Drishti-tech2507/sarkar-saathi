"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ComparisonSection from "@/components/ComparisonSection";
import BenefitCalculator from "@/components/BenefitCalculator";
import AccessibilitySection from "@/components/AccessibilitySection";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FamilyAnalyzer from "@/components/FamilyAnalyzer";
import AIWidget from "@/components/dashboard/AIWidget";
import ProfileCompletionModal from "@/components/ProfileCompletionModal";
import DemoModal from "@/components/home/DemoModal";
export default function Home() {
  const [showModal, setShowModal] =
    useState(false);
    const [showDemo, setShowDemo] =
  useState(false);

  const [userName, setUserName] =
    useState("");

  useEffect(() => {
    const shouldShow =
      localStorage.getItem(
        "showProfilePopup"
      );

    const completed =
      localStorage.getItem(
        "profileCompleted"
      );

    const storedName =
      localStorage.getItem(
        "userName"
      );

    if (
      shouldShow === "true" &&
      completed !== "true"
    ) {
      setShowModal(true);

      localStorage.removeItem(
        "showProfilePopup"
      );
    }

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      {showModal && (
        <ProfileCompletionModal
          userName={userName}
          onClose={() =>
            setShowModal(false)
          }
        />
      )}

      <main>

        <Navbar />

        <Hero
  onWatchDemo={() =>
    setShowDemo(true)
  }
/>
        <HowItWorks />

        <FamilyAnalyzer />

        <ComparisonSection />

        <BenefitCalculator />

        <AccessibilitySection />

        <Testimonials />

        <FinalCTA />

        <Footer />

<DemoModal
  open={showDemo}
  onClose={() =>
    setShowDemo(false)
  }
/>

<AIWidget />

      </main>
    </>
  );
}