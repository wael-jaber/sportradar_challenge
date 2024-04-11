# Sportradar Challenge
![example branch parameter](https://github.com/wael-jaber/sportradar_challenge/actions/workflows/ci.yaml/badge.svg?branch=main)

## Description
This project is a solution to the Sportradar Challenge. The project is a monorepo consists of a simple library 
**"Scoreboard"** which is used to keep track of the scores of different teams in a sports match.And
a simple frontend application that uses the library to display the scores of the teams in a sports match.

## Installation
To install the project on your local machine, you need to have the following installed:
- Node JS v20.10.0 (test and developed with this version)
- Yarn (and [corepack enabled](https://yarnpkg.com/corepack))

To install the project, follow the steps below:
1. Clone the project to your local machine
2. Navigate to the root directory of the project
3. Run `yarn install` to install the dependencies of the project (make sure you have yarn installed and corepack enabled)

## Running the project
Run the following command to :

- build the library:
```bash
yarn scoreboard:build
```
- run the frontend application:
```bash
yarn frontend:start
```
- run the tests for both the library and the frontend application:
```bash
yarn test-all
```

## Usage
TBD



