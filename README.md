# Sportradar Challenge
![example branch parameter](https://github.com/wael-jaber/sportradar_challenge/actions/workflows/ci.yaml/badge.svg?branch=main)

## Description
This project is a solution to the Sportradar Challenge. The project is a monorepo consists of a simple package 
**"Scoreboard"**, which is used to keep track of the scores of different teams in a sports match.And
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
- run the frontend application in development mode:
```bash
yarn frontend:dev
```
- run the tests for both the library and the frontend application:
```bash
yarn test-all
```

## Usage
The library is a simple class that can be used to keep track of the scores of different teams in a sports match.

```typescript
import { Scoreboard ,Match } from 'scoreboard';

const match1 = new Match({
    homeTeam: 'Mexico',
    homeScore: 0,   // initial home score (optional)
    awayTeam: 'Canada',
    awayScore: 5    // initial away score (optional) 
});
const match2 = new Match({ homeTeam: 'Spain', awayTeam: 'Brazil' }); // initial scores are 0
const scoreboard = new Scoreboard();

scoreboard.addMatch(match1);
scoreboard.addMatch(match2);

scoreboard.getMatches(); // returns an array of matches
// [ match1, match2 ]

scoreboard.updateScore(match2
    ,5 // home score
    ,6 // away score
)
scoreboard.getMatches(); 
// [ match2, match1 ]

scoreboard.endMatch(match1);

scoreboard.getMatches();
// [ match2 ]
```



