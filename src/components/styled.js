/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

// Dependencies

const dependenciesStyled = [
  'styled-components'
];

// File templates

const styledJs = `
import styled from 'styled-components';

export const Wrapper = styled.div\`
  text-align: center;
  position: relative;
  margin-top: 15%;
  top: -15%;
\`;

export const Headline = styled.h2\`
  font-size: 9rem;
  margin-bottom: 0px;
\`;

export const Button = styled.button\`
  font-size: 1rem;
\`;
`;

const styledJsRouter = `
/* eslint no-unused-expressions: 0 */

import styled, { injectGlobal } from 'styled-components';

injectGlobal\`
  body {
    margin: 0;
  }
\`;

export const CounterWrapper = styled.div\`
  text-align: center;
  position: relative;
  margin-top: 15%;
  top: -15%;
\`;

export const Headline = styled.h2\`
  font-size: 9rem;
  margin-bottom: 0px;
\`;

export const Button = styled.button\`
  font-size: 1rem;
\`;

export const AppWrapper = styled.div\`
  text-align: center;
\`;

export const Menu = styled.ul\`
  padding: 0;
  margin: 0;
  background: #EEE;
  border-bottom: 1px solid #AAA;
\`;

export const MenuItem = styled.li\`
  list-style: none;
  display: inline-block;
  margin: 10px 13px 6px;
  text-transform: uppercase;

  > a {
    text-decoration: none;
    font-size: 1em;
    color: #AAA;
    font-weight: bold;

    &.active, &:hover {
      color: #222;
    }
  }
\`;
`;

module.exports = {
  dependenciesStyled,
  styledJs,
  styledJsRouter
};
