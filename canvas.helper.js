
/** 圆角矩形 */
CanvasRenderingContext2D.prototype.drawRoundRect = function ({
  x = 0,
  y = 0,
  width = 4,
  height = 4,
  radius = 0,
  fill,
  fillStyle,
  stroke,
  strokeStyle,
  lineWidth = 1,
  font,
}) {
  this.beginPath()
  this.moveTo(x + radius, y)
  this.lineTo(x + width - radius, y) // 贝塞尔点 1
  this.quadraticCurveTo(x + width, y, x + width, y + radius)  // 贝塞尔控制点、贝塞尔点 2
  this.lineTo(x + width, y + height - radius)
  this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  this.lineTo(x + radius, y + height)
  this.quadraticCurveTo(x, y + height, x, y + height - radius)
  this.lineTo(x, y + radius)
  this.quadraticCurveTo(x, y, x + radius, y)
  this.closePath()

  this.lineWidth = lineWidth
  if (fill || fillStyle != undefined) {
    if (fillStyle != undefined) { this.fillStyle = fillStyle }
    this.fill()
  }
  if (stroke || strokeStyle != undefined) {
    if (strokeStyle != undefined) { this.strokeStyle = strokeStyle }
    this.stroke()
  }

  //# with font
  if (typeof font === 'object') {
    const { text, color, size } = font

    this.drawText({
      x: width / 2 + x,
      y: height / 2 + y,
      text,
      color,
      size,
    })
  }

  return this
}

/** 线条 */
CanvasRenderingContext2D.prototype.drawLine = function ({
  x = 0,
  y = 0,
  height = 0,
  type = 'solid', // 和 border-type 保持一致 ^_^
  color,
  lineWidth = 1,
}) {
  this.beginPath()
  type === 'dotted' && this.setLineDash([4])
  type === 'dashed' && this.setLineDash([19, 4, 4, 4])
  this.moveTo(x, y)
  this.lineTo(x, y + height)
  this.lineWidth = lineWidth
  this.strokeStyle = color
  this.stroke()

  return this
}

/** 文字 */
CanvasRenderingContext2D.prototype.drawText = function ({
  x = 0,
  y = 0,
  text = '',
  color = 'black',
  size = 16,
  fontFamily = 'Comic Sans MS', // arial sans-serif
  align = 'center',
  baseLint = 'middle'
}) {
  this.font = `${size}px ${fontFamily}`
  this.fillStyle = color
  this.textAlign = align
  this.textBaseline = baseLint
  this.fillText(text, x, y)
  this.setLineDash([]) // 还原

  return this
}

/** 箭头 */
CanvasRenderingContext2D.prototype.drawArrow = function ({
  x = 0,
  y = 0,
  width = 4,
  height = 9,
  width_arrow_half = 9, // 箭头一半的宽度
  height_arrow,
  lineWidth = 1,
  fill,
  fillStyle,
  stroke,
  strokeStyle,
  font,
}) {
  const _height_arrow = height_arrow
    ? height_arrow
    : width_arrow_half * 2

  this.beginPath()
  this.moveTo(x, y)
  this.lineTo(x + width, y)
  this.lineTo(x + width, y + height - _height_arrow)
  this.lineTo(x + width + width_arrow_half, y + height - _height_arrow)
  this.lineTo(x + width / 2, y + height)
  this.lineTo(x - width_arrow_half, y + height - _height_arrow)
  this.lineTo(x, y + height - _height_arrow)
  this.closePath()

  this.lineWidth = lineWidth
  if (fill || fillStyle != undefined) {
    if (fillStyle != undefined) { this.fillStyle = fillStyle }
    this.fill()
  }
  if (stroke || strokeStyle != undefined) {
    if (strokeStyle != undefined) { this.strokeStyle = strokeStyle }
    this.stroke()
  }

  //# with font
  if (typeof font === 'object') {
    const { text, color, size } = font

    this.drawText({
      x: width / 2 + x,
      y: height / 2 + y,
      text,
      color,
      size,
    })
  }

  return this
}
