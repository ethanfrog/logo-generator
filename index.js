const inquirer = require('inquirer');
const fs = require('fs');

const generateSVG = ({text, textColor}, shapeData) =>
`<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

  ${shapeData}

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

    if (answers.text.length > 3) {
      console.log("Logo text must be 3 characters or fewer");
    }
    else {
      let shapeData;
      if (answers.shape === 'Circle') {
        shapeData = `<circle cx="150" cy="100" r="80" fill="${answers.shapeColor}" />`;
      }
      else if (answers.shape === 'Triangle') {
        shapeData = `<polygon points="50,200 250,200 150,0" fill="${answers.shapeColor}" />`;
      }
      else {
        shapeData = `<rect x="75" y="25" width="150" height="150" fill="${answers.shapeColor}" />`;
      }
  
      const logoContent = generateSVG(answers, shapeData);
  
      fs.writeFile(`logo.svg`, logoContent, (err) =>
        err ? console.log(err) : console.log(`Generated logo.svg`)
      );
    }
  });
