import { ISanitizer } from "./ISanitizer";

/**
 * Sanitizes text by converting to a locale-friendly lower-case version and triming leading and trailing whitespace.
 */
export class LowerCaseSanitizer implements ISanitizer {
    /**
     * @inheritDocs
     */
    public sanitize(text: string | null | undefined): string {
        return text ? text.toLocaleLowerCase().trim() : "";
    }
}
