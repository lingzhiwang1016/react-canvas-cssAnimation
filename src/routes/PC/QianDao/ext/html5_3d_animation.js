/* eslint-disable */

const screenScale = 1;

class StarsAni {
  constructor(canvas, options) {
    console.log("options", options);
    this.window_width = options.window_width || 1000;
    this.window_height = options.window_height || 1000;
    this.window_near = options.window_near || 1000 * screenScale;
    this.window_fovy = options.window_fovy || 200 * screenScale;

    this.start_size = options.start_size || 30 * screenScale;
    this.star_speed = options.star_speed || 1;
    this.star_count = options.star_count || 100;
    this.star_urls = options.star_urls || [];

    this.half_width = this.window_width / 2;
    this.half_height = this.window_height / 2;

    this.canvas = canvas;
    canvas.setAttribute("width", this.window_width);
    canvas.setAttribute("height", this.window_height);
    this.ctx = canvas.getContext('2d');
    this.g_points = [];
    this.g_photos = [];
    this.currentIndex = 0;
    this.isStarted = false;
    // 是否对池中photo更新图片资源
    this.isChangeSrc = true;

    this.init();
  }

  initPoints() {
    this.g_points = [];
    this.g_photos = [];
    for (let i = 0; i < this.star_count; i++) {
      const z = Math.random() * this.window_near - this.window_near * 0.5;
      const scale = z / this.window_near;
      const point = [
        Math.random() * this.window_width - this.half_width,
        Math.random() * this.window_height - this.half_height,
        z,
        this.start_size
      ];
      this.g_points.push(point);

      if (this.star_urls[i]) {
        const photo = new Image();
        photo.src = this.star_urls[i];
        photo.onload = () => {
        };
        this.g_photos.push(photo);
        this.currentIndex = i;
      }
    }
    console.log("g_points", this.g_points);
    console.log("g_photos", this.g_photos);
  }

  draw3Din2D(photo, point3d, z) {
    if (!photo) {
      return;
    }
    const x3d = point3d[0];
    const y3d = point3d[1];
    const z3d = point3d[2];
    const size = point3d[3];

    const scale = this.window_fovy / (this.window_fovy + z3d);

    const x2d = scale * x3d + this.half_width;
    const y2d = scale * y3d + this.half_height;
    const screenSize = scale * size;

    this.ctx.drawImage(photo, x2d, y2d, screenSize, screenSize);

    // if (photo.circle) {
    //   ctx.drawImage(photo.circle, x2d, y2d, screenSize, screenSize);
    // } else {
    //   ctx.drawImage(photo, x2d, y2d, screenSize, screenSize);
    // }
  }

  update = () => {
    if (!this.isStarted) {
      return;
    }
    this.render();
    window.requestAnimationFrame(this.update);
  }

  render = () => {
    this.ctx.clearRect(0, 0, this.window_width, this.window_height);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    this.ctx.fillRect(0, 0, this.window_width, this.window_height);

    for (let i = 0; i < this.star_count; i++) {
      const point3d = this.g_points[i];

      // 重置位置
      let z3d = point3d[2];
      z3d -= this.star_speed;
      if (z3d < -this.window_fovy) {
        z3d = z3d + this.window_near;
        // 取图片，换图片,候选图片够多，换图才有意义
        if (this.star_urls.length > this.star_count) {
          this.currentIndex += 1;
          if (this.currentIndex >= this.star_urls.length) {
            this.currentIndex = 0;
          }
          if (this.isChangeSrc && this.star_urls[this.currentIndex]) {
            const photo = new Image();
            photo.src = this.star_urls[this.currentIndex];
            photo.onload = () => {
            };
            this.g_photos[i] = photo;
            // console.log("currentIndex", this.currentIndex, this.star_urls[this.currentIndex])
          }
        }
      }
      point3d[2] = z3d;

      const photo = this.g_photos[i];
      this.draw3Din2D(photo, point3d);
    }
  }

  init = () => {
    this.isStarted = true;
    this.initPoints();
    this.update();
  }

  setUrls = (urls) => {
    this.star_urls = urls;
    // 图片没有加载完全
    if (this.g_photos.length < this.star_urls.length) {
      for (let i = this.g_photos.length; i < this.star_urls.length; i++) {
        if (this.star_urls[i]) {
          const photo = new Image();
          photo.src = this.star_urls[i];
          photo.onload = () => {
          };
          this.g_photos.push(photo);
          this.currentIndex = i;
        }
      }
    }
  }

  reseize = (w, h) => {
    this.window_width = w;
    this.window_height = h;
    this.half_width = this.window_width / 2;
    this.half_height = this.window_height / 2;
    this.canvas.setAttribute("width", this.window_width);
    this.canvas.setAttribute("height", this.window_height);
  }
}

export default function (canvas, options) {
  return new StarsAni(canvas, options);
}
