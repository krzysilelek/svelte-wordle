<script>
  import { toast } from "$lib/stores.js";
</script>

<div class="toast-container position-fixed my-5 start-50 translate-middle p-3">
  <div
    id="liveToast"
    class="toast"
    data-bs-delay={$toast.delay}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header">
      <img
        src="./svelte-wordle.png"
        class="rounded me-2"
        height="30px"
        alt=""
      />

      <strong class="me-auto">SvelteWordle</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">{$toast.message}</div>
  </div>
</div>
