import Notification from "@/models/Notification";

export async function createNotification({
  uid,
  title,
  message,
  type,
}: any) {
  try {
    await Notification.create({
      uid,
      title,
      message,
      type,
    });
  } catch (error) {
    console.error(error);
  }
}