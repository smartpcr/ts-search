import { ISearchIndex } from "./ISearchIndex";

/**
 * Search index capable of returning results matching a set of tokens but without any meaningful rank or order.
 */
export class UnorderedSearchIndex implements ISearchIndex {
    private _tokenToUidToDocumentMap: { [token: string]: { [uid: string]: any } };

    constructor() {
        this._tokenToUidToDocumentMap = {};
    }

    /**
     * @inheritDocs
     */
    public indexDocument(token: string, uid: string, doc: Object): void {
        if (typeof this._tokenToUidToDocumentMap[token] !== "object") {
            this._tokenToUidToDocumentMap[token] = {};
        }
        this._tokenToUidToDocumentMap[token][uid] = doc;
    }

    /**
     * @inheritDocs
     */
    public search(tokens: Array<string>, corpus: Array<Object>): Array<Object> {
        const intersectingDocumentMap = {};
        const tokenToUidToDocumentMap = this._tokenToUidToDocumentMap;

        for (let i = 0, numTokens = tokens.length; i < numTokens; i++) {
            const token = tokens[i];
            const documentMap = tokenToUidToDocumentMap[token];

            // Short circuit if no matches were found for any given token.
            if (!documentMap) {
                return [];
            }

            if (i === 0) {
                const keys = Object.keys(documentMap);

                for (let j = 0, numKeys = keys.length; j < numKeys; j++) {
                    const uid = keys[j];
                    (intersectingDocumentMap as any)[uid] = documentMap[uid];
                }
            } else {
                const keys = Object.keys(intersectingDocumentMap);
                for (let j = 0, numKeys = keys.length; j < numKeys; j++) {
                    const uid = keys[j];
                    if (typeof documentMap[uid] !== "object") {
                        delete (intersectingDocumentMap as any)[uid];
                    }
                }
            }
        }

        const keys = Object.keys(intersectingDocumentMap);
        const documents = [];
        for (let i = 0, numKeys = keys.length; i < numKeys; i++) {
            const uid = keys[i];
            documents.push((intersectingDocumentMap as any)[uid]);
        }

        return documents;
    }
}
