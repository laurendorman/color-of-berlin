# Color of Berlin

A Twitter bot that tweets the color of the sky in Berlin.

This bot fetches the latest image of the sky in Berlin, crops and places it on an HTML5 Canvas, picks the color and matches it against a color list, fills a new Canvas with the color that was matched, then tweets the color name, image, and HEX value.

## Prerequisites
- [Node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)
- [Twitter account](https://twitter.com/), [Twitter developer account](https://developer.twitter.com/en/docs/basics/developer-portal/overview), and [Twitter developer app](https://developer.twitter.com/en/docs/basics/apps/overview)
- [Twitter app API keys and user access tokens](https://developer.twitter.com/en/docs/basics/apps/guides/the-app-management-dashboard)


## Initial set-up and installation
- Clone the project: `git clone git@github.com:laurendorman/color-of-berlin.git`
- Change to the project directory: `cd color-of-berlin`
- Install the project dependencies: `npm install`

## Create `.env` file
In the project root, create an `.env` file or make a copy of the `.env.example` file, containing the following environment variables:

```
TWITTER_API_CONSUMER_KEY=
TWITTER_API_CONSUMER_SECRET=
TWITTER_API_TOKEN=
TWITTER_API_TOKEN_SECRET=
```

## Send a tweet
- In the project directory, run `node index.js` from the command line to send a tweet.

## Credits and Inspiration
Meteorology/sky photos sourced from the weather cams at [Instituts für Meteorologie der FU-Berlin](http://www.met.fu-berlin.de/de/wetter/webcam/).

Forked color list provided by [@gekidoslair](https://gist.github.com/gekidoslair/72058193cb2fc8cbc182).