import { ITokenizer } from "../../scripts/Tokenizer/ITokenizer";
import { StemmingTokenizer } from "../../scripts/Tokenizer/StemmingTokenizer";
import { SimpleTokenizer } from "../../scripts/Tokenizer/SimpleTokenizer";

describe("StemmingTokenizer", function() {
    var tokenizer: ITokenizer;

    beforeEach(function() {
        var stemmingFunction = function(text: string): string {
            if (text === "cats") {
                return "cat";
            } else {
                return text;
            }
        };

        tokenizer = new StemmingTokenizer(stemmingFunction, new SimpleTokenizer());
    });

    it("should handle empty values", function() {
        expect(tokenizer.tokenize("")).toEqual([]);
        expect(tokenizer.tokenize(" ")).toEqual([]);
    });

    it("should convert words to stems", function() {
        expect(tokenizer.tokenize("the cats")).toEqual(["the", "cat"]);
    });
});
