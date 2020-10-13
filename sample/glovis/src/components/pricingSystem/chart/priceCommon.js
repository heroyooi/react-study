/**
 * 각도 구하기
 * @param {Number} startAngle
 * @param {Number} endAngle
 */
export function getAngle(startAngle, endAngle) {
  return {
    sAngle: (Math.PI / 180) * startAngle,
    eAngel: (Math.PI / 180) * endAngle
  };
}

export function getCoordinates(x, y, redius, angle) {
  return {
    x: x + redius * Math.cos((angle * Math.PI) / 180),
    y: y + redius * Math.sin((angle * Math.PI) / 180)
  };
}

export function getRedius(width, leftOffset, rightOffset) {
  return (width - leftOffset - rightOffset) / 2;
}

/**
 * 금액에 대한 각도 구하기
 * @param {Number} degrees
 * @param {Number} minPrice
 * @param {Number} price
 */
export function getPriceToAngle(degrees, minPrice, price) {
  return (price - minPrice) * degrees - 180;
}

/**
 * 최대값, 최소값 구하기
 * @param {Array<number>} arr
 */
export function getMinMaxValue(arr) {
  let maxNum = 0;
  let minNum = 0;

  if (arr && arr.length > 0) {
    maxNum = arr[0];
    minNum = arr[0];

    arr.forEach((x) => {
      if (maxNum < x) {
        maxNum = x;
      }

      if (minNum > x) {
        minNum = x;
      }
    });
  }

  return {
    minNum,
    maxNum
  };
}

/**
 * 올림/버림/내림
 * @param {Number} aprice
 * @param {string} stype 원단위처리(R:반올림, C:올림, F:버림)
 * @param {Number} n
 */
export function getNumberCutting(aprice, stype, n) {
  //
  const rule = stype ? stype : 'R';
  let newPrice = aprice / n;

  if (rule === 'F') {
    newPrice = Math.floor(newPrice);
  } else if (stype === 'R') {
    newPrice = Math.round(newPrice);
  } else if (stype === 'C') {
    newPrice = Math.ceil(newPrice);
  }

  newPrice = newPrice * n;
  return newPrice;
}

/**
 * 천단위 콤마
 * @param {Number} x
 */
export function getNumberWithCommas(x) {
  // eslint-disable-next-line security/detect-unsafe-regex
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 화살표 그리기
 *  @param {CanvasRenderingContext2D} ctx
 */
export function onDrawArrow(ctx, translateX, translateY, length, lineHeight, arrowLength, arrowHeight, fillcolor, angle) {
  const lineTop = (arrowHeight - lineHeight) / 2;
  const arrowLeft = length - arrowLength;

  ctx.save();
  ctx.beginPath();
  ctx.translate(translateX, translateY);
  ctx.rotate((angle * Math.PI) / 180);

  ctx.moveTo(0, lineTop);
  ctx.lineTo(arrowLeft, lineTop);
  ctx.lineTo(length, arrowHeight / 2);
  ctx.lineTo(arrowLeft, lineTop + lineHeight);
  ctx.lineTo(0, lineTop + lineHeight);
  ctx.closePath();
  ctx.fillStyle = fillcolor;

  ctx.fill();
  ctx.restore();
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {String} [fill = ''] Whether to fill the rectangle.
 * @param {String} [stroke = ''] Whether to stroke the rectangle.
 */
export function onDragRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
  let radiusInfo = null;

  if (typeof radius === 'number') {
    radiusInfo = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (const side in defaultRadius) {
      radiusInfo[side] = radiusInfo[side] || defaultRadius[side];
    }
  }

  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.moveTo(x + radiusInfo.tl, y);
  ctx.lineTo(x + width - radiusInfo.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radiusInfo.tr);
  ctx.lineTo(x + width, y + height - radiusInfo.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radiusInfo.br, y + height);
  ctx.lineTo(x + radiusInfo.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radiusInfo.bl);
  ctx.lineTo(x, y + radiusInfo.tl);
  ctx.quadraticCurveTo(x, y, x + radiusInfo.tl, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
