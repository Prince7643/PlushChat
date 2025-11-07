
import path from "path";
import fs from "fs";

var admin = require("firebase-admin");

let serviceAccountPath: string;

// If on Render, use the secret file path
if (process.env.NODE_ENV === "production") {
  serviceAccountPath = "/etc/secrets/serviceAccountKey.json";
} else {
  // Local path during development
  serviceAccountPath = path.resolve(__dirname, "./serviceAccountKey.json");
}

// ✅ Verify file exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error(" Firebase service account not found at:", serviceAccountPath);
  throw new Error("Firebase service account file not found: " + serviceAccountPath);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (fcmToken:any, title:any, body:any) => {
  const message = {
    token: fcmToken,
    notification: { title, body },
  };

  try {
    await admin.messaging().send(message);
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
