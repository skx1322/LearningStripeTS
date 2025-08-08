import { randomUUIDv7 } from "bun";

type UUIDFormat = "hex";
type SegmentLimit = 0 | 1 | 2 | 3 | 4;

export async function UUIDHex(GenType: UUIDFormat = "hex", SegmentLength: SegmentLimit = 0): Promise<string> {
    const id = randomUUIDv7(GenType) || "";
    if (!id) {
        console.error("Something with wrong generating UUID HEX");
    }
    const idSegment = id.split("-")
    
    return idSegment.slice(SegmentLength, 5).join("-")
}
