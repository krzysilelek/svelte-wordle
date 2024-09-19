<script>
  import { board } from "$lib/stores.js";
  import { colorNametoRGBA } from "$lib/colors.js";
</script>

<div class="col-8 col-md-6 col-lg-4 mx-auto">
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
