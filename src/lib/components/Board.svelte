<script>
  import { board } from "$lib/stores.js";

  const red = {
    getRGBA(opacity) {
      return "rgba(255, 0, 0, " + opacity + ")";
    },
  };

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
    red,
    yellow,
    gray,
    green,
    none,
  };

  class colorNametoRGBA {
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
</script>

<div class="col-8 col-md-6 mx-auto">
  {#each $board as row}
    <div class="my-2 d-flex justify-content-between gap-sm-3">
      {#each row as letter}
        <div class="border border-3 rounded ratio ratio-1x1">
          <div
            class="d-flex align-items-center justify-content-center"
            style="background-color: {colorNametoRGBA
              .chooseColor(letter.color)
              .getRGBA(0.2)};"
          >
            {letter.value}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>
