const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

/**
 * IMPORTANT: Replace this URL with your production backend URL
 * once you deploy your backend (e.g., to Vercel or Heroku).
 *
 * Cloud Functions cannot access 'localhost'.
 */
const BACKEND_URL = "https://your-weddingflow-backend.vercel.app/api/users";

exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  const uid = user.uid;

  try {
    console.log(`User ${uid} was deleted from Firebase. Cleaning up MongoDB...`);

    // Call the backend API to delete the user from MongoDB
    const response = await axios.delete(`${BACKEND_URL}/${uid}`, {
      // You might want to add a secret key in headers for security
      headers: {
        'x-api-key': functions.config().backend?.key || 'development_key'
      }
    });

    console.log(`Successfully cleaned up MongoDB for UID: ${uid}. Response:`, response.data);
  } catch (error) {
    console.error(`Failed to delete user ${uid} from MongoDB:`, error.message);
    if (error.response) {
      console.error("Backend response error:", error.response.data);
    }
  }
});
