const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore/lite");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FS_APIKEY || "",
  authDomain: process.env.FS_AUTHDOMAIN || "",
  projectId: process.env.FS_PROJECTID || "",
  storageBucket: process.env.FS_STORAGEBUCKET || "",
  messagingSenderId: process.env.FG_MESSAGINGSENDERID || "",
  appId: process.env.FS_APPID || "",
  measurementId: process.env.FS_MEASUREMENTID || "",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.db = db;
