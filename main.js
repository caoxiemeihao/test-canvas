const oC1 = document.getElementById('c1')
const ctx = oC1.getContext('2d')

oC1.width = oC1.parentNode.offsetWidth - 17
oC1.height = oC1.parentNode.offsetHeight - 17

const DURATION = 900
let now = 0
let f1

function handleCalc(percent) {
  return n => percent * n
}

function animationFrame(fn, time = 0) {
  // const percent = Math.min(1, (time - DURATION) / DURATION) // 负值 [2倍] ^_^
  const percent = Math.min(1, time / DURATION)

  fn(percent)

  if (percent < 1) {
    requestAnimationFrame(t => animationFrame(fn, t))
  }
}

animationFrame(percent => {
  const calc = handleCalc(percent)
  
  ctx.clearRect(0, 0, oC1.width, oC1.height)

  ctx.drawRoundRect({
    x: 40,
    y: 40,
    width: calc(190),
    height: 19,
    radius: 4,
    fillStyle: 'rgba(250, 100, 112, .14)',
    font: {
      text: 'UI 组',
      color: 'green'
    }
  })

  ctx.drawLine({
    x: 40,
    y: 70,
    lineWidth: 3,
    type: 'dashed',
    height: calc(240),
    color: 'black',
  })

  ctx.drawLine({
    x: 90,
    y: 70,
    lineWidth: 3,
    type: 'dotted',
    height: calc(240),
    color: '#ccc',
  })

  ctx.drawText({
    x: 90,
    y: 340,
    text: 'Hello Word',
    color: `rgba(250, 100, 112, ${calc(1)})`,
  })

  ctx.drawArrow({
    x: 140,
    y: 90,
    width: 9,
    height: calc(140),
    fillStyle: 'rgba(250, 100, 112, .14)',
    font: {
      text: 'UI 交付'
    }
  })

  ctx.drawArrow({
    x: 190,
    y: 140,
    width: 9,
    height: calc(140),
    strokeStyle: '#ff6f6c',
    font: {
      text: '前端 交付'
    }
  })

})
