/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

// Dependencies

const devDependenciesSass = [
  'autoprefixer',
  'sass-loader',
  'node-sass'
];

// File templates

const appScss = `
.app {
  text-align: center;

  span {
    &:first-child { color: black }
    &:last-child { color: blue }
  }

  h2 {
    font-size: 9rem;
    margin-bottom: 0px;
  }
  button { font-size: 1rem; }
}
`;

module.exports = {
  appScss,
  devDependenciesSass
};
