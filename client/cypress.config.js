const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {},
    // Specifying where to find component tests
    specPattern: 'src/components/**/*.cy.{js,jsx,ts,tsx}', 
  },
});
