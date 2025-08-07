export async function copyImageToClipboard(base64Image: string) {
  try {
    const response = await fetch(`data:image/jpeg;base64,${base64Image}`);
    console.log(response);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/jpeg": blob,
      }),
    ]);
    console.log("Image copied to clipboard!");
    alert("Image copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy image:", error);
    alert("Failed to copy image.");
  }
}