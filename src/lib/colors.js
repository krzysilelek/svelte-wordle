const yellow = {
    getRGBA(opacity) {
      return "rgba(255, 255, 0, " + opacity + ")";
    },
  };

const green = {
    getRGBA(opacity) {
      return "rgba(0, 255, 0, " + opacity + ")";
    },
  };

const gray = {
    getRGBA(opacity) {
      return "rgba(128, 128, 128, " + opacity + ")";
    },
  };

const none = {
    getRGBA(opacity) {
      return "";
    },
  };

const colors = {
    yellow,
    gray,
    green,
    none,
  };

export class colorNametoRGBA {
    static strategy = null;

    static chooseColor(colorName) {
      this.strategy = colors[colorName.toLowerCase()] || colors["none"];
      if (!this.strategy) {
        throw new Error(`Color not found: ${colorName}`);
      }
      return this;
    }

    static getRGBA(opacity) {
      return this.strategy.getRGBA(opacity);
    }
  }