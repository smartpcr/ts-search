import { IIndexStrategy } from "../../scripts/IndexStrategy/IIndexStrategy";
import { ExactWordIndexStrategy } from "../../scripts/IndexStrategy/ExactWordIndexStrategy";

describe("ExactWordIndexStrategy", function() {
    let indexStrategy: IIndexStrategy;

    beforeEach(function() {
        indexStrategy = new ExactWordIndexStrategy();
    });

    it("should not expand empty tokens", function() {
        const expandedTokens = indexStrategy.expandToken("");

        expect(expandedTokens.length).toEqual(0);
    });

    it("should not expand tokens", function() {
        const expandedTokens = indexStrategy.expandToken("cat");

        expect(expandedTokens.length).toEqual(1);
        expect(expandedTokens).toContain("cat");
    });
});
