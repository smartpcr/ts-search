import { ISanitizer } from "./ISanitizer";

/**
 * Enforces case-sensitive text matches.
 */
export class CaseSensitiveSanitizer implements ISanitizer {
    /**
     * @inheritDocs
     */
    public sanitize(text: string | null | undefined): string {
        return text ? text.trim() : "";
    }
}
