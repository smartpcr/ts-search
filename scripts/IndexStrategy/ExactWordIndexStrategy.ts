import { IIndexStrategy } from "./IIndexStrategy";

/**
 * Indexes for exact word matches.
 */
export class ExactWordIndexStrategy implements IIndexStrategy {

    /**
     * @inheritDocs
     */
    public expandToken(token: string): string[] {
        return token ? [token] : [];
    }

}