export async function turnOnToast() {
    const toastController = (await import("bootstrap/js/dist/toast")).default;
    const toastDiv = document.getElementById("liveToast");
    const toast = new toastController(toastDiv);
    toast.show();
}