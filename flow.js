/* Procedural background. */
(() => {
  "use strict";
  const canvas = document.getElementById("flow");
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    canvas.hidden = true;
    return;
  }
  const vertex =
    "attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}";
  const fragment = `precision mediump float;
uniform vec2 resolution;uniform float time;uniform float fire;uniform vec2 pointer;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(.8,-.6,.6,.8);for(int i=0;i<4;i++){v+=a*noise(p);p=m*p*2.04+vec2(3.4,1.7);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float t=time*.12;
 vec2 p=vec2(uv.x*2.8,uv.y*2.2);p+=(pointer-.5)*.045;
 vec2 q=vec2(fbm(p+vec2(t*.35,-t*.25)),fbm(p+vec2(4.1,-1.8)+t*.2));
 float n=fbm(p+q*2.4+vec2(t*.15,0.));
 float curve=.70-.45*uv.x+.16*sin(uv.x*5.2+t)+.23*(n-.5);
 float dist=uv.y-curve;
 float ribbon=exp(-abs(dist)*46.);float haze=exp(-abs(dist)*12.);
 float edge=pow(.5+.5*sin(n*17.+uv.x*8.-t),3.);
 float curl=exp(-abs(dist+.1*sin(uv.x*6.+n*4.+t))*20.);
 float brightness=(ribbon*.62+haze*.17+curl*.14)*(.35+edge*.9);
 float side=pow(abs(uv.x-.5)*2.,.65);brightness*=.28+side*.9;
 vec3 blue=vec3(.015,.40,.62);vec3 orange=vec3(1.,.25,.045);vec3 color=mix(blue,orange,fire);
 vec3 col=vec3(.009,.015,.025)+color*brightness;
 col+=mix(vec3(.1,.55,.78),vec3(1.,.65,.23),fire)*pow(ribbon,4.)*edge*.19;
 col*=.82+.18*noise(uv*600.);gl_FragColor=vec4(col,1.);
}`;
  function shader(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      throw new Error("Background shader could not compile");
    }
    return s;
  }
  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error("Background unavailable");
  } catch {
    canvas.hidden = true;
    return;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const loc = {
    resolution: gl.getUniformLocation(program, "resolution"),
    time: gl.getUniformLocation(program, "time"),
    fire: gl.getUniformLocation(program, "fire"),
    pointer: gl.getUniformLocation(program, "pointer"),
  };
  let paused = document.documentElement.classList.contains("motion-paused"),
    hidden = document.hidden,
    lost = false,
    frameId = 0,
    last = 0,
    clock = 0,
    fire = 0,
    targetFire = 0,
    mx = 0.5,
    my = 0.5;
  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 1.25);
    const scale = innerWidth < 700 ? 0.75 : 1;
    canvas.width = Math.round(innerWidth * ratio * scale);
    canvas.height = Math.round(innerHeight * ratio * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    draw();
  }
  function draw() {
    if (lost) return;
    gl.uniform2f(loc.resolution, canvas.width, canvas.height);
    gl.uniform1f(loc.time, clock);
    gl.uniform1f(loc.fire, fire);
    gl.uniform2f(loc.pointer, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function tick(now) {
    frameId = 0;
    if (paused || hidden || lost) return;
    if (now - last >= 32) {
      clock += Math.min((now - last) / 1000, 0.05);
      last = now;
      fire += (targetFire - fire) * 0.045;
      draw();
    }
    frameId = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    if (!paused && !hidden && !lost) {
      last = performance.now();
      frameId = requestAnimationFrame(tick);
    } else draw();
  }
  window.addEventListener("resize", resize);
  window.addEventListener(
    "pointermove",
    (e) => {
      if (!paused) {
        mx = e.clientX / innerWidth;
        my = 1 - e.clientY / innerHeight;
      }
    },
    { passive: true },
  );
  window.addEventListener("portfolio-motion", (e) => {
    paused = e.detail.paused;
    sync();
  });
  window.addEventListener("portfolio-ignite", (e) => {
    targetFire = e.detail.ignited ? 1 : 0;
    if (paused) {
      fire = targetFire;
      draw();
    }
  });
  document.addEventListener("visibilitychange", () => {
    hidden = document.hidden;
    sync();
  });
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    lost = true;
    canvas.hidden = true;
    cancelAnimationFrame(frameId);
  });
  resize();
  sync();
})();
