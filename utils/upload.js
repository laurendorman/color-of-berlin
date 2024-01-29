const { doc, setDoc, addDoc, collection } = require("firebase/firestore/lite");
const { db } = require("./firebase");
const moment = require("moment-timezone");
require("dotenv").config();

const uploadColor = async ({ color, name, rgb }) => {
  const berlinTime = moment.tz("Europe/Berlin").format();

  await setDoc(doc(db, process.env.DB_PATH, berlinTime), {
    rgb: rgb,
    name: name,
    color: color,
    time: berlinTime,
    location: "Berlin",
    year: moment().year(),
    month: moment().month(),
  });
};

exports.uploadColor = uploadColor;
