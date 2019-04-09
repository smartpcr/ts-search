import { Search } from "../../scripts/Search";
import { UnorderedSearchIndex } from "../../scripts/SearchIndex/UnorderedSearchIndex";

describe("Search", function() {
    let documents: Array<Object>, search: Search;

    beforeEach(function() {
        search = new Search("uid");
        search.searchIndex = new UnorderedSearchIndex();
        search.addIndex("title");

        var titles = [
            "this document is about node.",
            "this document is about ruby.",
            "this document is about ruby and node.",
            "this document is about node. it has node examples"
        ];

        documents = [];
        for (var i = 0, length = titles.length; i < length; ++i) {
            var document = {
                uid: i,
                title: titles[i]
            };

            documents.push(document);
            search.addDocument(document);
        }
    });

    var validateSearchResults = function(results: Array<Object>, expectedDocuments: Array<Object>) {
        expect(results.length).toBe(expectedDocuments.length);
        expectedDocuments.forEach(function(document) {
            expect(results).toContain(document);
        });
    };

    it("should return documents matching search tokens", function() {
        var results = search.search("node");

        validateSearchResults(results, [documents[0], documents[2], documents[3]]);
    });
});
