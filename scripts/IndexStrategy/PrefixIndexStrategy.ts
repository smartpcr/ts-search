import { IIndexStrategy } from "./IIndexStrategy";

/**
 * Indexes for prefix searches (e.g. the term "cat" is indexed as "c", "ca", and "cat" allowing prefix search lookups).
 */
export class PrefixIndexStrategy implements IIndexStrategy {
    /**
     * @inheritDocs
     */
    public expandToken(token: string): string[] {
        const expandedTokens: string[] = [];
        let buffer = "";

        for (let i = 0, length = token.length; i < length; ++i) {
            buffer += token.charAt(i);
            expandedTokens.push(buffer);
        }

        return expandedTokens;
    }
}
