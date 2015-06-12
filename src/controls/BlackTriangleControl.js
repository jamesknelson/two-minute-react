export default (Actions, Replayables) => ({
  initialize() {
    this(0);
  },

  rotateLeft(angle=1) {
    this(angle);
  },

  rotateRight(angle=1) {
    this(angle);
  },
});
