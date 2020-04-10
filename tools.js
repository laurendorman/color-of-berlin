const fs = require("fs");

const { colors } = require("./colors");

const getSkyColor = (img, canvas) => {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(0, 0, img.width / 2, img.height / 2).data;
  const color = [data[4], data[5], data[6]];

  return color;
};

const hex = (color) => {
  return color
    .map((c) => {
      return c.toString(16);
    })
    .join('');
};

const findNearest = (rgb) => {
  return colors
    .map((color) => {
      return {
        d: colorDistance(rgb, color[1]),
        name: color[0],
      };
    })
    .sort((color1, color2) => {
      return color1.d - color2.d;
    })[0].name;
};

const colorDistance = (color1, color2) => {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  );
};

exports.getSkyColor = getSkyColor;
exports.hex = hex;
exports.findNearest = findNearest;
