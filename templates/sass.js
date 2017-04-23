/**
 * - Dependencies
 * - File templates
*/

// Dependencies

const devDependenciesSass = [
  'autoprefixer',
  'sass-loader',
  'node-sass'
];

// File templates

const appScss = `
.app {
  h1 {
    color: red;
    span { color: blue; }
  }
  h2 {
    font-size: 9rem;
    margin-bottom: 0px;
  }
  button { font-size: 1rem; }
}
`;

module.exports = {
  devDependenciesSass,
  appScss
};
