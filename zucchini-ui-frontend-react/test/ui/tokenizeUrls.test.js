import { expect } from 'chai';

import tokenizeUrls from '../../src/ui/tokenizeUrls';


describe('tokenizeUrls', () => {

  it('should return empty token list for a null input', () => {

    const result = tokenizeUrls(null);
    expect(result).to.be.empty;
  });

  it('should return single text token for a single line', () => {

    const line = 'Sample input';
    const result = tokenizeUrls(line);
    expect(result).to.deep.contain.members([
      ['text', line],
      ['eol'],
    ]);
  });

  it('should return URL tokens for URL in line', () => {

    const line = 'Hello, please see our example at http://example.org/test/#123. And see https://example.org/xyz?toto=tutu&titi=tata, or...';
    const result = tokenizeUrls(line);

    expect(result).to.deep.contain.members([
      ['text', 'Hello, please see our example at '],
      ['url', 'http://example.org/test/#123'],
      ['text', '. And see '],
      ['url', 'https://example.org/xyz?toto=tutu&titi=tata'],
      ['text', ', or...'],
      ['eol'],
    ]);
  });

});
