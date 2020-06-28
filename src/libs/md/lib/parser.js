import tokensToAST from './util/tokensToAST';
import { stringToTokens } from './util/stringToTokens';
import { cleanupTokens } from './util/cleanupTokens';
import groupTextTokens from './util/groupTextTokens';

/**
 *
 * @param {String} source
 * @param {Function} [renderer]
 * @param {AstRenderer} [markdownIt]
 */
export default function parser(source, renderer, markdownIt) {
  let tokens = stringToTokens(source, markdownIt);
  tokens = cleanupTokens(tokens);
  tokens = groupTextTokens(tokens);

  const astTree = tokensToAST(tokens);

  return renderer(astTree);
}
