# Real World App - Cypress Test Automation Framework (TAF)

## Prerequisites

Before installation and execution of the Cypress tests, ensure you have [Node.js](https://nodejs.org/en/download/) installed on your system. Node.js is essential as it includes npm (Node Package Manager) needed to manage the project dependencies.

## Installation

#### Clone the repository to your local machine

```bash
git clone https://github.com/dusan-automation/ds-real-world-app
```

#### Install dependencies

```bash
npm install
```

## Running tests

#### Open Cypress

For interactive test executions and development, open Cypress using:

```bash
npx cypress open
```

#### Run Cypress from the command line for different browsers:

Chrome

```bash
npm run test:chrome
```

Firefox

```bash
npm run test:firefox
```

Edge

```bash
npm run test:edge
```

## Code Formatting

Check formatting:

```bash
npm run format:check
```

Fix formatting issues:

```bash
npm run format:fix
```

## Mochawesome Report

Generate detailed and visually appealing test reports:

Combine Reports: Combine individual test outputs into a single JSON file:

```bash
npm run combine-reports
```

Generate HTML Report: Generate an HTML report from the combined JSON:

```bash
npm run generate-report
```

## Further Help

For detailed guidelines on Cypress functionalities and usage, refer to the [official Cypress documentation](https://docs.cypress.io/).
