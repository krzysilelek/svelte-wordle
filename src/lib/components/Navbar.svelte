<script>
  let colorMode = localStorage.getItem("colorMode");

  function toggleDarkMode() {
    colorMode = colorMode === "light" ? "dark" : "light";
    if (colorMode === "dark") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("colorMode", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
      localStorage.setItem("colorMode", "light");
    }
  }
</script>

<nav class="navbar bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand mx-auto" href="/">
      <img src="./svelte-wordle.png" alt="icon" width="30" height="30" />
      SvelteWordle
    </a>
    <button type="button" class="btn btn-success" on:click={toggleDarkMode}>
      <i class="bi bi-sun"></i>
    </button>
  </div>
</nav>
