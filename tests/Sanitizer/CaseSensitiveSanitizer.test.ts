import { CaseSensitiveSanitizer } from "../../scripts/Sanitizer/CaseSensitiveSanitizer";
import { ISanitizer } from "../../scripts/Sanitizer/ISanitizer";

describe('CaseSensitiveSanitizer', function() {
    let sanitizer: ISanitizer;
  
    beforeEach(function() {
      sanitizer = new CaseSensitiveSanitizer();
    });
  
    it('should handle falsy values', function() {
      expect(sanitizer.sanitize(null)).toEqual('');
      expect(sanitizer.sanitize(undefined)).toEqual('');
    });
  
    it('should handle empty strings', function() {
      expect(sanitizer.sanitize('')).toEqual('');
    });
  
    it('should handle whitespace-only strings', function() {
      expect(sanitizer.sanitize('  ')).toEqual('');
    });
  
    it('should handle leading and trailing whitespace', function() {
      expect(sanitizer.sanitize(' a')).toEqual('a');
      expect(sanitizer.sanitize('b ')).toEqual('b');
      expect(sanitizer.sanitize(' c ')).toEqual('c');
    });
  
    it('should not modify case', function() {
      expect(sanitizer.sanitize('AbC')).toEqual('AbC');
    });
  });