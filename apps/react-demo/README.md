## Demo for Scoreboard package

This is a simple frontend application that uses the [**"Scoreboard"**](../../packages/scoreboard/README.md) package to display the scores of the teams in a sports match.

## Important Note

- The frontend application requires the library to be built before running the application. To build the library, run the following command in the workspace root directory:

```bash
yarn scoreboard:build
```

- The package isn't designed to be used with React, so doing some bad practices (putting the class instance in the state) to make it work with React.
