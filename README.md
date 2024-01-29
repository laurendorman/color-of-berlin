# Mood of Berlin 🌤️

### Based on Color of Berlin, a Twitter Bot by [@laurendorman](github.com/laurendorman) 🐦

--- 
Node script which fetches the latest image of the sky in Berlin, detects the color, logs and uploads it to a Firestore project.

---

## Prerequisites

- [Node](https://nodejs.org/en/)
- [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) or [npm](https://www.npmjs.com/get-npm)
- [Firestore Project](https://firebase.google.com/docs/firestore)

## Initial set-up and installation

- Clone the project: `git clone git@github.com:piavalentin/mood-of-berlin.git`
- Change to the project directory: `cd mood-of-berlin`
- Install the project dependencies: `yarn install`

## Create `.env` file

In the project root, create an `.env` file or make a copy of the `.env.example` file, containing the following environment variables with the required values:

```
SOURCE_IMAGE=
LOCATION=
DB_PATH=
FS_APIKEY=
FS_AUTHDOMAIN=
FS_PROJECTID=
FS_STORAGEBUCKET=
FG_MESSAGINGSENDERID=
FS_APPID=
FS_MEASUREMENTID=
```

## Detect color and store it

In the project directory, run `node index.js` from the command line.

## Credits and Inspiration

Idea based on and code forked from Color of Berlin by [@laurendorman](github.com/laurendorman/color-of-berlin) 🚀 ✨

Meteorology/sky photos sourced from Berlin's official tourism and congress organization webcams at [visitBerlin](https://webcam.visitberlin.de/).

Forked color list provided by [@gekidoslair](https://gist.github.com/gekidoslair/72058193cb2fc8cbc182).
