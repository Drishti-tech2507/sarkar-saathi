"use client";

import {
  sendWelcomeEmail,
} from "@/lib/email";

export default function TestPage() {
    const handleSend = async () => {

        console.log(
          "SERVICE ID:",
          process.env
            .NEXT_PUBLIC_EMAILJS_SERVICE_ID
        );
      
        console.log(
          "WELCOME TEMPLATE:",
          process.env
            .NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE
        );
      
        console.log(
          "PUBLIC KEY:",
          process.env
            .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      
        const sent =
          await sendWelcomeEmail(
            "Drishti",
            "yourmail@gmail.com"
          );
      
        if (sent) {
          alert(
            "Email Sent Successfully"
          );
        } else {
          alert(
            "Email Failed"
          );
        }
      };
  return (
    <main className="p-20">
      <button
        onClick={handleSend}
        className="
        rounded-xl
        bg-orange-500
        px-8
        py-4
        text-white
        "
      >
        Send Test Mail
      </button>
    </main>
  );
}