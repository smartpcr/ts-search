import { AllSubstringsIndexStrategy } from "../../scripts/IndexStrategy/AllSubstringsIndexStrategy";

describe("AllSubstringsIndexStrategy", function() {
    var indexStrategy = new AllSubstringsIndexStrategy();

    beforeEach(function() {
        // indexStrategy = new AllSubstringsIndexStrategy();
    });

    test("should not expand empty tokens", function() {
        const expandedTokens = indexStrategy.expandToken("");

        expect(expandedTokens.length).toEqual(0);
    });

    test("should not expand single character tokens", function() {
        const expandedTokens = indexStrategy.expandToken("a");

        expect(expandedTokens.length).toEqual(1);
        expect(expandedTokens).toContain("a");
    });

    test("should expand multi-character tokens", function() {
        const expandedTokens = indexStrategy.expandToken("cat");

        expect(expandedTokens.length).toEqual(6);
        expect(expandedTokens).toContain("c");
        expect(expandedTokens).toContain("ca");
        expect(expandedTokens).toContain("cat");
        expect(expandedTokens).toContain("a");
        expect(expandedTokens).toContain("at");
        expect(expandedTokens).toContain("t");
    });
});
