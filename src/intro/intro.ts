/**
 * INTRO — sequência única de entrada do site.
 *
 * Parte 1 (index.html, só CSS): uma luz desenha o M da logo.
 * Parte 2 (este arquivo), tudo a partir do mesmo instante T, quando a luz
 * chega à ponta da perna direita do M:
 *   • a linha sai da perna, vai até o quadrado do hero e contorna a borda;
 *   • a seta do M sai da logo e faz um zigue-zague pelos três M do título;
 *   • o M desliza até a logo da navbar e a linha é recolhida para o quadrado;
 *   • a luz continua circulando na borda do quadrado.
 */

const DRAW_MS = 1700 // igual à duração das animações m-* no index.html
const COMET_LOOP_MS = 4200 // uma volta da luz no quadrado, logo após formar
const COMET_CALM_RATE = 0.42 // velocidade depois que a luz acalma

/* posição do M dentro de public/logo.svg (viewBox 2000 6200 25800 4900) */
const LOGO_VIEWBOX = { x: 2000, y: 6200, w: 25800, h: 4900 }

type Join = { edge: 'left' | 'right'; frac: number }

const root = document.documentElement
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
const nextFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve))

/* ---------------------------------------------------------
   QUADRADO DO HERO
--------------------------------------------------------- */

let join: Join = { edge: 'left', frac: 0.45 }

function frameSvg() {
  return document.querySelector<SVGSVGElement>('.hero__frame-fx')
}

/** contorno do quadrado começando no ponto onde a linha do M encosta nele */
function drawFramePath(svg: SVGSVGElement) {
  const { width: w, height: h } = svg.getBoundingClientRect()
  if (!w || !h) return

  const i = 0.5
  const y = clamp(join.frac * h, 1, h - 1)
  const d =
    join.edge === 'left'
      ? `M${i} ${y}L${i} ${i}L${w - i} ${i}L${w - i} ${h - i}L${i} ${h - i}Z`
      : `M${w - i} ${y}L${w - i} ${i}L${i} ${i}L${i} ${h - i}L${w - i} ${h - i}Z`

  svg.querySelectorAll('path').forEach((path) => path.setAttribute('d', d))
}

function watchFrame(svg: SVGSVGElement) {
  drawFramePath(svg)
  new ResizeObserver(() => drawFramePath(svg)).observe(svg)
}

/** luz circulando na borda: começa viva e depois acalma num glow sutil */
function startComet(svg: SVGSVGElement) {
  const comets = svg.querySelectorAll<SVGPathElement>('.hero__frame-comet, .hero__frame-comet-glow')
  const animations: Animation[] = []

  comets.forEach((comet) => {
    comet.style.strokeDasharray = ''
    comet.style.strokeDashoffset = ''
    animations.push(
      comet.animate([{ strokeDashoffset: 70 }, { strokeDashoffset: -930 }], {
        duration: COMET_LOOP_MS,
        iterations: Infinity,
        easing: 'linear',
      }),
    )
  })

  svg.classList.add('is-traced', 'is-live')

  // depois de ~2 voltas, desacelera aos poucos e baixa a intensidade
  setTimeout(() => {
    svg.classList.add('is-settled')
    const started = performance.now()
    const slow = (now: number) => {
      const k = clamp((now - started) / 2600, 0, 1)
      const rate = 1 - (1 - COMET_CALM_RATE) * k
      animations.forEach((a) => (a.playbackRate = rate))
      if (k < 1) requestAnimationFrame(slow)
    }
    requestAnimationFrame(slow)
  }, COMET_LOOP_MS * 2)

  // não anima fora da tela
  new IntersectionObserver(([entry]) => {
    animations.forEach((a) => (entry.isIntersecting ? a.play() : a.pause()))
  }).observe(svg)
}

/* ---------------------------------------------------------
   ZIGUE-ZAGUE NOS M DO TÍTULO
--------------------------------------------------------- */

interface Box { x: number; y: number; w: number; h: number }
type Point = [number, number]

function titleSvg() {
  return document.querySelector<SVGSVGElement>('.hero__title-fx')
}

/** área real ocupada por uma letra, em coordenadas do título */
function glyphBox(span: HTMLElement, title: DOMRect): Box | null {
  const style = getComputedStyle(span)
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null

  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const metrics = ctx.measureText(span.textContent ?? 'M')

  // sonda para achar a linha de base da letra
  const probe = document.createElement('i')
  probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
  span.insertBefore(probe, span.firstChild)
  const origin = probe.getBoundingClientRect()
  probe.remove()

  return {
    x: origin.left - title.left - metrics.actualBoundingBoxLeft,
    y: origin.bottom - title.top - metrics.actualBoundingBoxAscent,
    w: metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
    h: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  }
}

interface Zigzag {
  points: Point[]
  /** distância, ao longo da linha, em que ela passa por trás de cada M */
  passes: number[]
  length: number
  em: number
  spans: HTMLElement[]
}

/**
 * Linha que entra por cima do M de "Marketing", dobra atrás dele, corre pelo
 * vão entre as linhas até o m de "move", dobra, volta até o m de "marcas",
 * dobra de novo e termina em seta. Só encosta nos três M.
 * É passageira: depois de atravessar, a própria linha vai embora atrás da seta.
 */
function buildZigzag(): Zigzag | null {
  const svg = titleSvg()
  const title = svg?.parentElement
  if (!svg || !title) return null

  const spans = Array.from(title.querySelectorAll<HTMLElement>('.hero__m'))
  const rect = title.getBoundingClientRect()
  const em = parseFloat(getComputedStyle(title).fontSize)
  const boxes = spans.map((span) => glyphBox(span, rect))
  if (boxes.length !== 3 || boxes.some((box) => !box) || !em) return null

  const [a, b, c] = boxes as Box[]
  const right = (g: Box) => g.x + g.w
  const bottom = (g: Box) => g.y + g.h
  const middle = (g: Box) => g.y + g.h / 2

  const points: Point[] = [
    [right(a) + em * 0.6, a.y - em * 0.3], // chega por cima, vindo da logo
    [right(a), a.y],
    [a.x + a.w * 0.22, middle(a)], // dobra atrás do M
    [right(a), bottom(a)],
    [b.x, b.y],
    [b.x + b.w * 0.78, middle(b)], // dobra atrás do m de "move"
    [b.x, bottom(b)],
    [right(c), c.y],
    [c.x + c.w * 0.22, middle(c)], // dobra atrás do m de "marcas"
    [right(c), bottom(c) + em * 0.03],
    [right(c) + em * 0.8, bottom(c) + em * 0.13], // ponta da seta
  ]

  const along: number[] = [0]
  for (let i = 1; i < points.length; i++) {
    along.push(along[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]))
  }

  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')
  svg.querySelector('.hero__zig-line')?.setAttribute('d', d)

  const head = em * 0.13
  svg.querySelector('.hero__zig-head')?.setAttribute('d', `M${-head} ${-head * 0.75}L0 0L${-head} ${head * 0.75}`)

  return { points, passes: [along[1], along[4], along[7]], length: along[along.length - 1], em, spans }
}

function placeHead(head: Element | null, x: number, y: number, angle: number) {
  head?.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)})`)
}

/** posição e ângulo num ponto de um path */
function pointAt(path: SVGPathElement, length: number) {
  const p = path.getPointAtLength(length)
  const q = path.getPointAtLength(Math.max(0, length - 1.5))
  return { x: p.x, y: p.y, angle: (Math.atan2(p.y - q.y, p.x - q.x) * 180) / Math.PI }
}

/* ---------------------------------------------------------
   FIM / ATALHOS
--------------------------------------------------------- */

function release() {
  root.classList.remove('is-loading', 'intro-hold')
  root.classList.add('intro-done')
  document.getElementById('preloader')?.remove()
}

/** sem animação (movimento reduzido ou erro): tudo no estado final */
function finishStatic() {
  frameSvg()?.classList.add('is-traced', 'is-settled')
  release()
}

/* ---------------------------------------------------------
   SEQUÊNCIA
--------------------------------------------------------- */

async function siteReady() {
  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))

  await Promise.race([Promise.all([loaded, document.fonts?.ready]), wait(3500)])
  await nextFrame()
  await nextFrame()
}

/** espera a luz chegar na ponta da perna direita (fim de uma volta no M) */
async function sparkAtLegEnd(spark: Animation | undefined) {
  if (!spark) return
  let previous = Number(spark.currentTime ?? 0)

  for (;;) {
    await nextFrame()
    const current = Number(spark.currentTime ?? 0)
    const wrapped = Math.floor(current / DRAW_MS) > Math.floor(previous / DRAW_MS)
    const almost = current >= DRAW_MS && DRAW_MS - (current % DRAW_MS) < 14
    if (wrapped || almost) return
    previous = current
  }
}

/** curva de posição com velocidade inicial e final definidas (sem trancos) */
function travel(t: number, duration: number, distance: number, v0: number, v1: number) {
  const x = clamp(t / duration, 0, 1)
  const x2 = x * x
  const x3 = x2 * x
  return (
    (-2 * x3 + 3 * x2) * distance +
    (x3 - 2 * x2 + x) * duration * v0 +
    (x3 - x2) * duration * v1
  )
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/** mostra só o trecho [tail, head] de um path */
function showSpan(path: SVGPathElement | null, tail: number, head: number, total: number, opacity = 1) {
  if (!path) return
  const visible = head - tail
  path.style.opacity = visible > 0.5 ? String(opacity) : '0'
  path.style.strokeDasharray = `${Math.max(visible, 0.01)} ${total + 20}`
  path.style.strokeDashoffset = `${-tail}`
}

/** curva da seta da logo até o começo do zigue-zague, desviando do texto */
function arrowConnector(p0: Point, dir: Point, to: Point, next: Point, text: Box) {
  const reach = Math.hypot(to[0] - p0[0], to[1] - p0[1])
  const inLen = Math.hypot(next[0] - to[0], next[1] - to[1]) || 1
  const inDir: Point = [(next[0] - to[0]) / inLen, (next[1] - to[1]) / inLen]

  let d = ''
  for (let f = 0.4; f <= 1.6; f += 0.15) {
    const c1: Point = [p0[0] + dir[0] * reach * f, p0[1] + dir[1] * reach * f]
    const c2: Point = [to[0] - inDir[0] * reach * f, to[1] - inDir[1] * reach * f]
    d = `M${p0[0]} ${p0[1]}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${to[0]} ${to[1]}`

    let clear = true
    for (let t = 0.05; t < 1; t += 0.05) {
      const u = 1 - t
      const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * to[0]
      const y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * to[1]
      if (x > text.x && x < text.x + text.w && y > text.y && y < text.y + text.h) clear = false
    }
    if (clear) break
  }
  return d
}

async function play() {
  const pre = document.getElementById('preloader')
  const m = document.querySelector<SVGSVGElement>('#intro-m')
  const svg = frameSvg()

  if (!pre || !m || !svg) return finishStatic()

  watchFrame(svg)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    await siteReady()
    return finishStatic()
  }

  const spark = document.getElementById('intro-spark')?.getAnimations()[0]

  await siteReady()
  await sparkAtLegEnd(spark)

  /* ---------- T: a luz está na ponta da perna direita ---------- */

  // geometria (medida agora, com o layout final)
  const mRect = m.getBoundingClientRect()
  const viewBox = m.viewBox.baseVal
  const unit = mRect.width / viewBox.width
  const onScreen = (data: string | undefined) => {
    const [x, y, dx, dy] = (data ?? '').split(' ').map(Number)
    return {
      point: [mRect.left + (x - viewBox.x) * unit, mRect.top + (y - viewBox.y) * unit] as Point,
      dir: [dx, dy] as Point,
    }
  }
  const leg = onScreen(m.dataset.exit)
  const tip = onScreen(m.dataset.tip)
  const p0 = { x: leg.point[0], y: leg.point[1] }
  const [dirX, dirY] = leg.dir
  const vh = window.innerHeight

  /* --- trilha 1: perna direita → quadrado --- */

  const frame = svg.getBoundingClientRect()
  const frameOnScreen = frame.bottom > 60 && frame.top < vh - 60 && frame.width > 0

  // a linha encosta numa borda vertical subindo, e segue por ela
  const edge: Join['edge'] = frame.left > p0.x + 24 || frame.right <= p0.x + 24 ? 'left' : 'right'
  const joinX = edge === 'left' ? frame.left + 0.5 : frame.right - 0.5
  const joinY = clamp(p0.y - 28, frame.top + 36, Math.min(frame.bottom, vh) - 48)
  join = { edge, frac: (joinY - frame.top) / frame.height }
  drawFramePath(svg)

  const conn = document.getElementById('intro-conn') as SVGPathElement | null
  const connGlow = document.getElementById('intro-conn-glow') as SVGPathElement | null
  const connDot = document.getElementById('intro-conn-dot') as SVGPathElement | null

  let connLength = 0
  if (frameOnScreen && conn) {
    const reach = Math.hypot(joinX - p0.x, joinY - p0.y)
    const d =
      `M${p0.x} ${p0.y}` +
      `C${p0.x + dirX * reach * 0.42} ${p0.y + dirY * reach * 0.42} ` +
      `${joinX} ${joinY + reach * 0.5} ${joinX} ${joinY}`
    ;[conn, connGlow, connDot].forEach((path) => path?.setAttribute('d', d))
    connLength = conn.getTotalLength()
  }

  const line = svg.querySelector<SVGPathElement>('.hero__frame-line')
  const comets = Array.from(
    svg.querySelectorAll<SVGPathElement>('.hero__frame-comet, .hero__frame-comet-glow'),
  )
  const perimeter = 2 * (frame.width + frame.height)
  const distance = connLength + perimeter
  const duration = clamp(1050 + distance * 0.36, 1500, 2100)

  /* --- trilha 2: seta do M → zigue-zague nos M do título --- */

  const tSvg = titleSvg()
  const title = tSvg?.parentElement?.getBoundingClientRect()
  const zig = buildZigzag()
  const zigLine = tSvg?.querySelector<SVGPathElement>('.hero__zig-line') ?? null
  const zigHead = tSvg?.querySelector<SVGPathElement>('.hero__zig-head') ?? null
  const arrow = document.getElementById('intro-arrow') as SVGPathElement | null
  const arrowHead = document.getElementById('intro-arrow-head') as SVGPathElement | null
  const titleOnScreen = !!title && title.bottom > 60 && title.top < vh - 40

  let arrowLength = 0
  if (zig && title && tSvg && arrow && titleOnScreen) {
    const toScreen = ([x, y]: Point): Point => [title.left + x, title.top + y]
    const range = document.createRange()
    range.selectNodeContents(tSvg.parentElement as HTMLElement)
    const lines = Array.from(range.getClientRects())
    const textRight = Math.max(...lines.map((r) => r.right))
    const textBottom = Math.max(...lines.map((r) => r.bottom))
    const top = title.top + zig.points[1][1] - 2
    const text: Box = { x: title.left - 6, y: top, w: textRight - title.left + 14, h: textBottom - top }

    arrow.setAttribute('d', arrowConnector(tip.point, tip.dir, toScreen(zig.points[0]), toScreen(zig.points[1]), text))
    arrowLength = arrow.getTotalLength()
    arrowHead?.setAttribute('d', 'M-9 -6.5L0 0L-9 6.5')
  }
  const zigLength = zig && titleOnScreen ? zig.length : 0
  const distance2 = arrowLength + zigLength

  // velocidade com que a luz vinha no M, e com que segue no quadrado (px/ms)
  const trace = document.getElementById('m-trace') as SVGPathElement | null
  const v0 = ((trace?.getTotalLength() ?? 15900) * unit) / DRAW_MS
  const v1 = perimeter / COMET_LOOP_MS

  // dispara tudo junto
  m.classList.add('is-released')
  pre.classList.add('is-open')
  root.classList.remove('intro-hold')
  root.classList.add('intro-go')
  svg.classList.add('is-tracing')
  if (zigLength) tSvg?.classList.add('is-tracing')

  const dockAt = duration * 0.8
  const RETRACT_MS = 700
  const ARROW_EXIT_MS = 1150 // a seta termina de passar e a linha sai atrás dela
  let docking = false
  let traced = false
  const lit = [false, false, false]
  const t0 = performance.now()

  await new Promise<void>((resolve) => {
    const tick = (now: number) => {
      const t = now - t0
      const retract = easeInOut(clamp((t - dockAt) / RETRACT_MS, 0, 1))

      /* trilha 1 */
      const s = traced ? distance : travel(t, duration, distance, v0, v1)

      if (connLength) {
        const head = Math.min(s, connLength)
        const tail = connLength * retract
        showSpan(conn, tail, head, connLength)
        showSpan(connGlow, tail, head, connLength, 0.35)
        if (connDot) {
          connDot.style.opacity = s < connLength ? '1' : '0'
          connDot.style.strokeDasharray = `0.01 ${connLength + 20}`
          connDot.style.strokeDashoffset = `${-head}`
        }
      }

      // contorno do quadrado (pathLength = 1000)
      if (!traced) {
        const n = (clamp(s - connLength, 0, perimeter) / perimeter) * 1000
        if (line) line.style.strokeDashoffset = `${1000 - n}`
        const len = Math.min(70, n)
        comets.forEach((comet) => {
          comet.style.opacity = n > 0 ? '' : '0'
          comet.style.strokeDasharray = `${Math.max(len, 0.01)} 3000`
          comet.style.strokeDashoffset = `${-(n - len)}`
        })

        if (t >= duration) {
          traced = true
          if (line) line.style.strokeDashoffset = ''
          comets.forEach((comet) => (comet.style.opacity = ''))
          svg.classList.remove('is-tracing')
          startComet(svg) // a mesma luz continua circulando
        }
      }

      /* trilha 2 — mesma largada, mesma duração */
      if (distance2 && zig) {
        const s2 = travel(t, duration, distance2, v0, 0)

        // a cauda da linha segue a seta: sai da logo, cruza os M e vai embora
        const tail2 = distance2 * easeInOut(clamp((t - dockAt) / ARROW_EXIT_MS, 0, 1))

        // trecho entre a logo e o título
        const head = Math.min(s2, arrowLength)
        showSpan(arrow, Math.min(tail2, arrowLength), head, arrowLength)
        if (arrow && arrowHead) {
          const inFlight = s2 < arrowLength
          arrowHead.style.opacity = inFlight && s2 > 6 ? '1' : '0'
          if (inFlight) {
            const at = pointAt(arrow, head)
            placeHead(arrowHead, at.x, at.y, at.angle)
          }
        }

        // zigue-zague por trás dos M (pathLength = 1000)
        const z = clamp(s2 - arrowLength, 0, zigLength)
        const zTail = clamp(tail2 - arrowLength, 0, zigLength)
        if (zigLine) {
          const visible = ((z - zTail) / zigLength) * 1000
          zigLine.style.opacity = visible > 0.5 ? '1' : '0'
          zigLine.style.strokeDasharray = `${Math.max(visible, 0.01)} 3000`
          zigLine.style.strokeDashoffset = `${-(zTail / zigLength) * 1000}`
          if (zigHead) {
            const fade = 1 - clamp((zTail - (zigLength - zig.em * 0.6)) / (zig.em * 0.6), 0, 1)
            zigHead.style.opacity = z > 0 ? String(fade) : '0'
            const at = pointAt(zigLine, z)
            placeHead(zigHead, at.x, at.y, at.angle)
          }
        }
        zig.passes.forEach((pass, i) => {
          if (!lit[i] && z >= pass) {
            lit[i] = true
            zig.spans[i].classList.add('is-lit')
          }
        })
      }

      // o M vai para a logo da navbar
      if (!docking && t >= dockAt) {
        docking = true
        dock(m, mRect).then(resolve)
      }

      if (t < Math.max(duration, dockAt + ARROW_EXIT_MS) + 50) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })

  // a seta já passou: não sobra nada no título
  if (zigLine) zigLine.style.opacity = '0'
  if (zigHead) zigHead.style.opacity = '0'
  tSvg?.classList.remove('is-tracing')

  release()
}

/** leva o M do centro até a posição exata do M na logo da navbar */
async function dock(m: SVGSVGElement, from: DOMRect) {
  const logo = document.querySelector<HTMLImageElement>('.navbar__logo')
  const target = logo?.getBoundingClientRect()

  if (!logo || !target || !target.width) {
    await m.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' }).finished
    return
  }

  // o SVG da logo é centralizado dentro do <img> (proporção do arquivo ≠ da arte)
  const viewBox = m.viewBox.baseVal
  const logoUnit = Math.min(target.width / LOGO_VIEWBOX.w, target.height / LOGO_VIEWBOX.h)
  const artLeft = target.left + (target.width - LOGO_VIEWBOX.w * logoUnit) / 2
  const artTop = target.top + (target.height - LOGO_VIEWBOX.h * logoUnit) / 2
  const scale = (logoUnit * viewBox.width) / from.width
  const dx = artLeft + (viewBox.x - LOGO_VIEWBOX.x) * logoUnit - from.left
  const dy = artTop + (viewBox.y - LOGO_VIEWBOX.y) * logoUnit - from.top

  m.classList.add('is-docking')
  await m.animate(
    [{ transform: 'translate(0, 0) scale(1)' }, { transform: `translate(${dx}px, ${dy}px) scale(${scale})` }],
    { duration: 850, easing: 'cubic-bezier(.65, 0, .2, 1)', fill: 'forwards' },
  ).finished

  // o resto da logo surge a partir do M
  root.classList.add('intro-docked')
  await wait(520)
}

export function runIntro() {
  ;(window as unknown as { __introStarted?: boolean }).__introStarted = true
  play().catch((error) => {
    console.error('[intro]', error)
    finishStatic()
  })
}
