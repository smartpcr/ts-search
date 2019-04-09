import { IIndexStrategy } from "./IndexStrategy/IIndexStrategy";
import { ISanitizer } from "./Sanitizer/ISanitizer";
import { PrefixIndexStrategy } from "./IndexStrategy/PrefixIndexStrategy";
import { LowerCaseSanitizer } from "./Sanitizer/LowerCaseSanitizer";

/**
 * This utility highlights the occurrences of tokens within a string of text. It can be used to give visual indicators
 * of match criteria within searchable fields.
 *
 * <p>For performance purposes this highlighter only works with full-word or prefix token indexes.
 */
export class TokenHighlighter {
    private _indexStrategy: IIndexStrategy;
    private _sanitizer: ISanitizer;
    private _wrapperTagName: string;

    /**
     * Constructor.
     *
     * @param opt_indexStrategy Index strategy used by Search
     * @param opt_sanitizer Sanitizer used by Search
     * @param opt_wrapperTagName Optional wrapper tag name; defaults to 'mark' (e.g. <mark>)
     */
    constructor(opt_indexStrategy: IIndexStrategy, opt_sanitizer: ISanitizer, opt_wrapperTagName: string) {
        this._indexStrategy = opt_indexStrategy || new PrefixIndexStrategy();
        this._sanitizer = opt_sanitizer || new LowerCaseSanitizer();
        this._wrapperTagName = opt_wrapperTagName || "mark";
    }

    /**
     * Highlights token occurrences within a string by wrapping them with a DOM element.
     *
     * @param text e.g. "john wayne"
     * @param tokens e.g. ["wa"]
     * @returns {string} e.g. "john <mark>wa</mark>yne"
     */
    public highlight(text: string, tokens: Array<string>) {
        const tagsLength: number = this._wrapText("").length;

        const tokenDictionary = {};

        // Create a token map for easier lookup below.
        for (let i = 0, numTokens = tokens.length; i < numTokens; i++) {
            const token: string = this._sanitizer.sanitize(tokens[i]);
            const expandedTokens: Array<string> = this._indexStrategy.expandToken(token);

            for (let j = 0, numExpandedTokens = expandedTokens.length; j < numExpandedTokens; j++) {
                const expandedToken: string = expandedTokens[j];

                if (!(tokenDictionary as any)[expandedToken]) {
                    (tokenDictionary as any)[expandedToken] = [token];
                } else {
                    (tokenDictionary as any)[expandedToken].push(token);
                }
            }
        }

        // Track actualCurrentWord and sanitizedCurrentWord separately in case we encounter nested tags.
        let actualCurrentWord: string = "";
        let sanitizedCurrentWord: string = "";
        let currentWordStartIndex: number = 0;

        // Note this assumes either prefix or full word matching.
        for (let i = 0, textLength = text.length; i < textLength; i++) {
            const character: string = text.charAt(i);

            if (character === " ") {
                actualCurrentWord = "";
                sanitizedCurrentWord = "";
                currentWordStartIndex = i + 1;
            } else {
                actualCurrentWord += character;
                sanitizedCurrentWord += this._sanitizer.sanitize(character);
            }

            if (
                (tokenDictionary as any)[sanitizedCurrentWord] &&
                (tokenDictionary as any)[sanitizedCurrentWord].indexOf(sanitizedCurrentWord) >= 0
            ) {
                actualCurrentWord = this._wrapText(actualCurrentWord);
                text = text.substring(0, currentWordStartIndex) + actualCurrentWord + text.substring(i + 1);

                i += tagsLength;
                textLength += tagsLength;
            }
        }

        return text;
    }

    /**
     * @param text to wrap
     * @returns Text wrapped by wrapper tag (e.g. "foo" becomes "<mark>foo</mark>")
     * @private
     */
    private _wrapText(text: string): string {
        const tagName = this._wrapperTagName;
        return `<${tagName}>${text}</${tagName}>`;
    }
}
