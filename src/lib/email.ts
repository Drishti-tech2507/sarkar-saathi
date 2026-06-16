import emailjs from "@emailjs/browser";

export async function sendWelcomeEmail(
  name: string,
  email: string
) {
  try {
    const result = await emailjs.send(
      process.env
        .NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env
        .NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE!,
      {
        user_name: name,
        user_email: email,
        login_time:
          new Date().toLocaleString(),
      },
      process.env
        .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log(
      "Welcome Mail Sent",
      result
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function sendProfileEmail(
  name: string,
  email: string,
  occupation: string
) {
  try {
    const result = await emailjs.send(
      process.env
        .NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env
        .NEXT_PUBLIC_EMAILJS_PROFILE_TEMPLATE_ID!,
      {
        user_name: name,
        user_email: email,
        occupation,
      },
      process.env
        .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log(
      "Profile Mail Sent",
      result
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}