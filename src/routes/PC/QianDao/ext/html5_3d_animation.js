/* eslint-disable */

export default function (canvas, options) {
  console.log("options", options);
  const window_width = options.window_width || 500;
  const window_height = options.window_height || 400;
  const star_count = options.star_count || 600;
  const star_color = options.star_color || "#FFF";
  const star_depth = options.star_depth || 250;

  const fov = star_depth;
  const SCREEN_WIDTH = window_width;
  const SCREEN_HEIGHT = window_height;
  const HALF_WIDTH = SCREEN_WIDTH / 2;
  const HALF_HEIGHT = SCREEN_HEIGHT / 2;
  const numPoints = star_count;

  canvas.setAttribute("width", SCREEN_WIDTH);
  canvas.setAttribute("height", SCREEN_HEIGHT);

  function setup() {
    const c = canvas.getContext('2d');

    function draw3Din2D(point3d) {
      const x3d = point3d[0];
      const y3d = point3d[1];
      const z3d = point3d[2];
      const scale = fov / (fov + z3d);
      const x2d = (x3d * scale) + HALF_WIDTH;
      const y2d = (y3d * scale) + HALF_HEIGHT;

      // c.lineWidth = scale;
      // c.strokeStyle = star_color;
      // c.beginPath();
      // c.moveTo(x2d, y2d);
      // c.lineTo(x2d + scale, y2d);
      // c.stroke();

      // 圆形星星
      c.fillStyle = star_color;
      c.beginPath();
      c.arc(x2d, y2d, scale, 0, 2 * Math.PI);
      c.fill();
    }

    let points = [];

    function initPoints() {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        const point = [(Math.random() * SCREEN_WIDTH) - HALF_WIDTH, (Math.random() * SCREEN_HEIGHT) - HALF_HEIGHT, (Math.random() * 400) - 200];
        points.push(point);
      }
      console.log("points", points);
    }

    function render() {
      c.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      c.fillStyle = 'rgba(255, 255, 255, 0)';
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      for (let i = 0; i < numPoints; i++) {
        const point3d = points[i];

        let z3d = point3d[2];
        z3d -= 4;
        if (z3d < -fov * 0.6) z3d += 400;
        point3d[2] = z3d;

        draw3Din2D(point3d);
      }
      window.requestAnimationFrame(render);
    }

    initPoints();
    render();
  }

  setup();
}
