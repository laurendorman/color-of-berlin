const { colors } = require("./colors");

const getSkyColor = (img, canvas) => {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const padding = 1;
  const cut = 0.6;
  const data = ctx.getImageData(
    padding /* Top padding */,
    padding /* Left padding */,
    img.width - 2 * padding /* Width */,
    Math.round((img.height - 2 * padding) * cut)
  ).data;

  /* Calculate the average color */
  let color = [0, 0, 0];
  let i;
  let j;

  for (i = 0; i < data.length; i += 4) {
    for (j = 0; j < 3; j++) {
      color[j] += data[i + j];
    }
  }

  const count = data.length / 4;

  color = color.map((c) => {
    return Math.round(c / count);
  });

  return color;
};

const hex = (color) => {
  return color
    .map((c) => {
      return c.toString(16);
    })
    .join("");
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
