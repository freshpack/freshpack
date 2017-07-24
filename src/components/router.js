
// Yarn scripts

// Dependencies

const dependenciesRouter = [
  'react-router-dom'
];

const appCssRouter = `
.main-wrapper {
  text-align: center;
}

.main-wrapper ul.menu {
  padding: 0;
  margin: 0;
  background: #EEE;
  border-bottom: 1px solid #AAA;
}

.main-wrapper li {
  list-style: none;
  display: inline-block;
  margin: 10px 13px 6px;
  text-transform: uppercase;
}
.main-wrapper a {
  text-decoration: none;
  font-size: 1em;
  color: #AAA;
  font-weight: bold;
}
.main-wrapper a.active,
.main-wrapper a:hover {
  color: #222;
}
`;

// File templates


module.exports = {
  dependenciesRouter,
  appCssRouter
};
