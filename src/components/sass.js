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
body {
  margin: 0;
}

.center-wrapper {
  text-align: center;
  position: relative;
  margin-top: 15%;
  top: -25%;
}

h2 {
  font-size: 9rem;
  margin-bottom: 0px;

  span {
    &:first-child { color: black }
    &:last-child { color: blue }
  }
}

button { font-size: 1rem; }
`;

const appScssRooter = `
.main-wrapper {
  text-align: center;

  ul.menu {
    padding: 0;
    margin: 0;
    background: #EEE;
    border-bottom: 1px solid #AAA;

    li {
      list-style: none;
      display: inline-block;
      margin: 10px 13px 6px;
      text-transform: uppercase;

      a {
        text-decoration: none;
        font-size: 1em;
        color: #AAA;
        font-weight: bold;

        &.active, &:hover {
          color: #222;
        }
      }
    }
  }
}
`;

module.exports = {
  appScss,
  appScssRooter,
  devDependenciesSass
};
