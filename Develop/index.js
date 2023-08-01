const fs = require("fs");
const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "Enter the project title:",
  },
  {
    type: "input",
    name: "description",
    message: "Project Description:",
  },
  {
    type: "input",
    name: "installation",
    message: "Installation",
  },
  {
    type: "input",
    name: "usage",
    message: "Usage:",
  },
  {
    type: "input",
    name: "contributing",
    message: "Contributing Guidlines:",
  },
  {
    type: "input",
    name: "tests",
    message: "Test instructions",
  },
  {
    type: "input",
    name: "github",
    message: "Questions- add Github username",
  },
  {
    type: "input",
    name: "email",
    message: "Questions- add your email",
  },
  {
    type: "list",
    name: "license",
    message: "Select a license",
    choices: [
      { id: "afl", name: "Academic Free License 3.0" },
      { id: "apache-2.0", name: "Apache License 2.0" },
      { id: "artistic-2.0", name: "Artistic License 2.0" },
      { id: "bsl-1.0", name: "Boost Software License 1.0" },
      { id: "bsd-2-clause", name: 'BSD 2-Clause "Simplified" License' },
      { id: "bsd-3-clause", name: 'BSD 3-Clause "New" or "Revised" License' },
      { id: "bsd-3-clause-clear", name: "BSD 3-Clause Clear License" },
      { id: "bsd-4-clause", name: 'BSD 4-Clause "Original" or "Old" License' },
      { id: "0bsd", name: "BSD Zero-Clause License" },
      { id: "cc", name: "Creative Commons License Family" },
      { id: "cc0-1.0", name: "Creative Commons Zero v1.0 Universal" },
      { id: "cc-by-4.0", name: "Creative Commons Attribution 4.0" },
      {
        id: "cc-by-sa-4.0",
        name: "Creative Commons Attribution Share Alike 4.0",
      },
      { id: "wtfpl", name: "Do What The F*ck You Want To Public License" },
      { id: "ecl-2.0", name: "Educational Community License v2.0" },
      { id: "epl-1.0", name: "Eclipse Public License 1.0" },
      { id: "epl-2.0", name: "Eclipse Public License 2.0" },
      { id: "eupl-1.1", name: "European Union Public License 1.1" },
      { id: "agpl-3.0", name: "GNU Affero General Public License v3.0" },
      { id: "gpl", name: "GNU General Public License Family" },
      { id: "gpl-2.0", name: "GNU General Public License v2.0" },
      { id: "gpl-3.0", name: "GNU General Public License v3.0" },
      { id: "lgpl", name: "GNU Lesser General Public License family" },
      { id: "lgpl-2.1", name: "GNU Lesser General Public License v2.1" },
      { id: "lgpl-3.0", name: "GNU Lesser General Public License v3.0" },
      { id: "isc", name: "ISC" },
      { id: "lppl-1.3c", name: "LaTeX Project Public License v1.3c" },
      { id: "ms-pl", name: "Microsoft Public License" },
      { id: "mit", name: "MIT" },
      { id: "mpl-2.0", name: "Mozilla Public License 2.0" },
      { id: "osl-3.0", name: "Open Software License 3.0" },
      { id: "postgresql", name: "PostgreSQL License" },
      { id: "ofl-1.1", name: "SIL Open Font License 1.1" },
      { id: "ncsa", name: "University of Illinois/NCSA Open Source License" },
      { id: "unlicense", name: "The Unlicense" },
      { id: "zlib", name: "zLib License" },
    ],
  },
];

function generateReadmeContent(answers) {
  const selectedLicenseName = answers.license;
  const encodedLicenseName = encodeURIComponent(selectedLicenseName);

  const readmeContent = `
  # ${answers.projectTitle}

  ## License
 
  ![Static Badge](https://img.shields.io/badge/License-${encodedLicenseName}-blue)
 

  ## Description
  ${answers.description}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  ${answers.installation}

  ## Usage
  ${answers.usage}

 

  ## Contributing
  ${answers.contributing}
  ## Tests
  ${answers.tests}

  ## Questions? visit my Github or Email me below
  - GitHub: https://github.com/${answers.github}
  - Email: ${answers.email}
`;

  return readmeContent;
}

function writeFile(fileName, data, callback) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const readmeContent = generateReadmeContent(answers);
      writeFile("README.md", readmeContent, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("README.md has been generated successfully.");
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

init();
