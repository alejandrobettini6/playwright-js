# Sample playwright POM framework using JavaScript

 ## How to run this framework?

1) Clone this repository from github url
2) Open a terminal and navigate to the project's root folder where you cloned/downloaded it.
3) Install all dependencies running `npm install` to install all required dependencies.
4) In the `playwright.config.js` file, navigate to the `projects` section. You will find options for both `chrome desktop` and `chrome mobile`. Uncomment the option you want to run by removing the `/*` and `*/` around it. It is recommended to run only one option at a time to avoid conflicts. Choose `chrome deskptop` for desktop testing and `chrome mobile` for mobile render testing.
5) Run `npm run test` in the command line to execute all test scenarios. Wait until the tests finish to see the results. The results will be displayed in the terminal, and any failures or errors will be highlighted for easy identification. When the execution finish the html report will
automatically open where you can see user-friendly reports for all test-scenarios.


- Troubleshooting:

If the report is not automatically open please run `npx playwright show-report`

The first time you run the project the npm install command maybe does not install the executable browser, in that case run `npx playwright install`