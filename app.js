// app.js

// Your web app's Firebase configuration
import { db, auth } from './firebase-config';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage(); // Optional for file uploads

// Register User
async function registerUser() {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const sponsor = document.getElementById("sponsor").value;
    const mobile = document.getElementById("mobile").value;
    const profilePic = document.getElementById("profilePic").files[0];

    // Create user with email and password
    // Here, you should ideally also handle password input and validation.
    const email = `${username}@example.com`; // Temporary email for simplicity
    const password = "your-password"; // Replace with actual password handling

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;

        // Upload profile picture to storage
        const storageRef = storage.ref(`profile_pics/${userId}/${profilePic.name}`);
        await storageRef.put(profilePic);
        const profilePicURL = await storageRef.getDownloadURL();

        // Store user data in Firestore
        await db.collection('users').doc(userId).set({
            name,
            username,
            sponsor,
            mobile,
            profilePic: profilePicURL
        });

        alert("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

// Login User
async function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = "your-password"; // Replace with actual password handling
    const email = `${username}@example.com`; // Use the same temporary email logic

    try {
        await auth.signInWithEmailAndPassword(email, password);
        loadUserData();
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Load User Data
async function loadUserData() {
    const user = auth.currentUser;

    if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        document.getElementById("profileImage").src = userData.profilePic;
        document.getElementById("userInfo").innerText = `Name: ${userData.name}, Mobile: ${userData.mobile}`;
        document.getElementById("dashboard").style.display = "block";
    }
}

// Upload File
async function uploadFile() {
    const file = document.getElementById("uploadFile").files[0];
    const user = auth.currentUser;

    if (user && file) {
        const fileRef = storage.ref(`users/${user.uid}/files/${file.name}`);
        await fileRef.put(file);
        alert("File uploaded successfully!");
    }
}

// Log out function (optional)
function logout() {
    auth.signOut();
}
