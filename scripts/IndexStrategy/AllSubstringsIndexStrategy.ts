import { IIndexStrategy } from "./IIndexStrategy";

/**
 * Indexes for all substring searches (e.g. the term "cat" is indexed as "c", "ca", "cat", "a", "at", and "t").
 */
export class AllSubstringsIndexStrategy implements IIndexStrategy {

    /**
     * @inheritdoc
     */
    public expandToken(token: string): string[] {
        const expandedTokens: string[] = [];
        let buffer: string;

        for (let i = 0, length = token.length; i < length; ++i) {
            buffer = "";

            for (let j = i; j < length; ++j) {
                buffer += token.charAt(j);
                expandedTokens.push(buffer);
            }
        }

        return expandedTokens;
    }
}
