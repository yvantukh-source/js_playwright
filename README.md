# Test Automation Framework

## Overview

This is a simple test automation framework built using Node.js and Playwright. The framework is designed to automate web application testing, providing an easy way to write, execute, and manage test cases.

## Features

- **Cross-browser testing:** Supports multiple browsers including Chromium, Firefox, and WebKit.
- **Headless execution:** Run tests in headless mode for faster execution.
- **Easy setup and configuration:** Simple configuration to get started quickly.
- **Reporting:** Generates detailed test reports.
- **Parallel execution:** Execute tests in parallel to reduce test execution time.

## Prerequisites

- Node.js (version 12 or later)
- npm (version 6 or later)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/js_playwright.git
    cd js_playwright
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Install Playwright browsers:

    ```bash
    npx playwright install
    ```

## Directory Structure

```
test-automation-framework/
│
├── tests/                # Test files
│   ├── example.test.js   # Example test case
│   └── ...
│
├── utils/                # Utility functions
│   └── ...
│
├── playwright.config.js  # Playwright configuration
├── package.json          # Project configuration
├── README.md             # Project documentation
└── ...
```

## Configuration

The configuration for Playwright is located in the `playwright.config.js` file. You can customize the browsers, headless mode, timeout, and other settings here.

```javascript
// playwright.config.js

module.exports = {
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};
```

## Writing Tests

Tests are located in the `tests` directory. Each test file should follow the naming convention `*.test.js`.

Example test (`tests/example.test.js`):

```javascript
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/example.test.js
```

To run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

## Reporting

After running the tests, a report will be generated in the `test-results` directory. You can view the report by opening the `index.html` file in a web browser.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please feel free to contact the project maintainer at [crossbar471@gmail.com](mailto:crossbar471@gmail.com).
