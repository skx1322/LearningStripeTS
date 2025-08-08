export async function getFileBuffer(image: File): Promise<Buffer | undefined> {
    try {
        const buffer = await image.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);
        return fileBuffer;
    } catch (error) {
        console.error("Failed to convert file into buffers.")
    }
}