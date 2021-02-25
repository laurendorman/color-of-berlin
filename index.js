const Twitter = require("twitter");
const http = require("http");
const { Image, createCanvas } = require("canvas");
const { getColor, findNearest, hex } = require("./tools");
const fs = require("fs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_CONSUMER_KEY || '',
  consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET || '',
  access_token_key: process.env.TWITTER_API_TOKEN || '',
  access_token_secret: process.env.TWITTER_API_TOKEN_SECRET || '',
});

const LOCATION = process.env.LOCATION || "Berlin";
const SOURCE_IMAGE = process.env.SOURCE_IMAGE || 
  "http://www.met.fu-berlin.de/wetter/webcam/picam2_prod.jpg";

const MIN_SLEEP_TIME = 0.25 * 60 * 60 * 1000;
const MAX_SLEEP_TIME = 0.5 * 60 * 60 * 1000;

let lastColor;

const loop = () => {
  getImage((src) => {
    const img = new Image();
    img.src = src;
    const canvas = createCanvas();
    const color = getColor(img, canvas);
    const hexValue = hex(color);
    const name = findNearest(color);
    if (lastColor != name) {
      lastColor = name;
      updateWithImage(name, hexValue);
    } else {
      console.error("Error tweeting color: ", name);
    }
  });

  const sleep = Math.round(
    MIN_SLEEP_TIME + Math.random() * (MAX_SLEEP_TIME - MIN_SLEEP_TIME)
  );
  console.log(
    "Bot is sleeping for " +
      sleep / 60 / 1000 +
      " minutes, will return at " +
      new Date(sleep + new Date().valueOf()).toString() +
      "."
  );
  setTimeout(loop, sleep);
};

const getImage = (callback) => {
  const req = http.get(SOURCE_IMAGE, (res) => {
    if (res.statusCode == 200) {
      const chunks = [];
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });
      res.on("end", () => {
        const src = Buffer.concat(chunks);
        callback(src);
      });
    } else {
      console.error("Error fetching image from source: " + res.statusCode);
    }
  });

  req.on("error", (e) => {
    console.error("Request Error: " + e.message);
  });
};

const updateWithImage = (name, hex) => {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
  ctx.fillStyle = `#${hex}`;
  ctx.fillRect(0, 0, 400, 300);

  const dataURL = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");

  return fs.writeFile("output.png", dataURL, "base64", (err) => {
    if (err) throw err;
    sendUpdate(name, hex);
  });
};

const sendUpdate = (name, hex) => {
  const image = fs.readFileSync("output.png", "base64");

  client.post(
    "media/upload",
    { media_data: image },
    (error, data, response) => {
      if (error) {
        console.error(error);
      }
      const status = {
        status: `The color of the sky in ${LOCATION} is ${name}. #${hex}`,
        media_ids: data.media_id_string,
      };

      client.post("statuses/update", status, (error, status, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Status updated.");
        }
      });

      client.post(
        "account/update_profile_banner",
        { banner: image },
        (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Profile banner updated.");
          }
        }
      );
    }
  );
};

loop();
