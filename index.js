const inquirer = require('inquirer');
const fs = require('fs');

const generateSVG = ({text, textColor, shape, shapeColor}) =>
`<svg version="1.1" width="300" height="200">

  <rect width="100%" height="100%" fill="red" />

  <circle cx="150" cy="100" r="80" fill="green" />

  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>

</svg>
`;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter logo text (max 3 characters):',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color:',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color:',
    },
  ])
  .then((answers) => {

    const logoContent = generateSVG(answers);

    fs.writeFile(`logo.svg`, logoContent, (err) =>
      err ? console.log(err) : console.log(`Generated logo.svg`)
    );
  });
