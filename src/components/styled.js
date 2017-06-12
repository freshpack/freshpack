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

module.exports = {
  dependenciesStyled,
  styledJs
};
