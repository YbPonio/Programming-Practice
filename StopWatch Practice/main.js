function Stopwatch() {
  let starTime,
    endTime,
    duration,
    running = 0;

  this.start = function () {
    if (running) {
      throw new Error("Stopwatch is already running");
    }

    starTime = new Date();
    console.log("started");
  };

  this.stop = function () {
    if (!running) {
      throw new Error("Stopwatch is not started");
    }

    endTime = new Date();

    const seconds = (endTime - starTime) / 1000;
    duration += seconds;
  };

  this.reset = function () {
    starTime = null;
    endTime = null;
    duration = 0;
    running = false;
  };

  Object.defineProperty(this, "duration", {
    get: function () {
      return duration;
    },
  });
}
let sw = new Stopwatch();
