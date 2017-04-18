# Dynamics Data Search
Simple Angular2 app that connects to Dynamics OData API and allows you to search for data

## Dependencies (for running in VS2015)
- Latest version of node.js and npm (comes with node.js) - https://nodejs.org/en/
- .NET Core 1.1 and Visual Studio Tools from - https://www.microsoft.com/net/download/core#/current
- Typescript - https://www.typescriptlang.org/
- Visual Studio Typescript tooling - https://www.microsoft.com/en-us/download/details.aspx?id=48593
- WebPack Task Runner - https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner
- NPM Task Runner - https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner

## Setup
- Run 'npm install' in folder with package.json
- Create a real appsettings.json file with your Dynamics configuration settings

## Planned features/improvements
- Display error message returned from odata if filter is invalid
- Allow users to select which fields to return
- Build filter dynamically with UI
- Functionality to count entities (either all or based on filter)
- Retrieve list of entities from odata metadata and allow users to search for any of these
- Retrieve entity fields automatically
- Entity detail page. Search return either one entity and redirects automatically to detail page, or a list and displays them in a table which can then each be clicked to navigate to the detail page.
- Move Dynamics config out of appsettings.json. Maybe use User Secrets (https://codeopinion.com/sensitive-configuration-data-asp-net-core/)

## References
- Angular - https://angular.io/
- Webpack - https://webpack.github.io/
- OData filter reference - http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption
- Angular lifecycle hooks - https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
