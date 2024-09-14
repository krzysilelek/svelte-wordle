<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import Board from "$lib/components/Board.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import {
    board,
    currentRow,
    currentCol,
    gameState,
    userUUID,
  } from "$lib/stores.js";

  let ready = false;

  $: {
    if ($gameState != "playing") {
      setTimeout(() => {
        initGame();
      }, 5000);
    }
  }

  async function initGame() {
    const response = await fetch("/api/generate-word");
    gameState.set("playing");
    userUUID.set(await response.json());
    currentRow.set(0);
    currentCol.set(0);
    board.set(
      Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({ value: "", color: "" }))
      )
    );
  }

  onMount(async () => {
    let colorMode = localStorage.getItem("colorMode");

    if (!colorMode) {
      colorMode = localStorage.setItem("colorMode", "light");
    }

    if (colorMode === "dark") {
      document.documentElement.setAttribute("data-bs-theme", colorMode);
    }
    initGame();
    ready = true;
  });
</script>

<head>
  <title>SvelteWordle</title>
</head>

{#if ready}
  <header>
    <Navbar />
  </header>
  <main class="container">
    <div class="row my-3">
      <Toast />
    </div>
    <div transition:fade class="row my-3">
      <Board />
    </div>
    <div transition:fade class="row">
      <Keyboard />
    </div>
  </main>
{/if}
