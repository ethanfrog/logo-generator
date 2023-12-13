const inquirer = require('inquirer');
const fs = require('fs');

const generateREADME = ({title, description, installation, usage, license, contributing, tests, github, email}, badgeLink) =>
`# ${title}

${badgeLink}

## Description

${description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

## License

This project is utilizing the ${license} license.

## Contributing

${contributing}

## Tests

${tests}

## Questions

If you have additional questions, I can be contacted here:
* GitHub: [My GitHub Profile](https://github.com/${github})
* Email: ${email}
`;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your project\'s title?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a project description:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license:',
      choices: ['Apache 2.0', 'MIT', 'MPL 2.0'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution instructions:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter test instructions:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ])
  .then((answers) => {
    let badgeLink;
    if (answers.license === 'Apache 2.0') {
      badgeLink = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    }
    else if (answers.license === 'MIT') {
      badgeLink = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    }
    else {
      badgeLink = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
    }

    const readmePageContent = generateREADME(answers, badgeLink);

    fs.writeFile(`${answers.title}.md`, readmePageContent, (err) =>
      err ? console.log(err) : console.log(`Successfully created ${answers.title}.md!`)
    );
  });
