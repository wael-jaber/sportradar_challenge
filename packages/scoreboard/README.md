## Scoreboard Package

this package consists of two classes `Match` and `Scoreboard` that can be used to keep track of the scores of different teams in a sports match.

### Match

This class represents a match between two teams. the constructor of the class takes an object with the following properties:

- `homeTeam`: the name of the home team
- `awayTeam`: the name of the away team
- `homeScore`: the initial score of the home team (optional, default is 0)
- `awayScore`: the initial score of the away team (optional, default is 0)

and the class has the following methods:

- `updateScore(homeScore: number, awayScore: number)`: updates the scores of the home and away teams
- `totalScore()`: returns the total score of the match as number
- `toString()`: returns a string representation of the match in the format `home 0 - 0 away`

### Scoreboard

this class represents a collection of matches. the class has the following methods:

- `addMatch(match: Match)`: adds a match to the scoreboard
- `endMatch(match: Match)`: end and removes a match from the scoreboard
- `getMatches()`: returns an array of matches in the scoreboard sorted by the total score of the match in descending order

### Usage

The library is a simple class that can be used to keep track of the scores of different teams in a sports match.

```typescript
import { Scoreboard, Match } from 'scoreboard';

const match1 = new Match({
  homeTeam: 'Mexico',
  homeScore: 0, // initial home score (optional)
  awayTeam: 'Canada',
  awayScore: 5, // initial away score (optional)
});
const match2 = new Match({ homeTeam: 'Spain', awayTeam: 'Brazil' }); // initial scores are 0
const scoreboard = new Scoreboard();

scoreboard.addMatch(match1);
scoreboard.addMatch(match2);

scoreboard.getMatches(); // returns an array of matches
// [ match1, match2 ]

scoreboard.updateScore(
  match2,
  5, // home score
  6, // away score
);
scoreboard.getMatches();
// [ match2, match1 ]

scoreboard.endMatch(match1);

scoreboard.getMatches();
// [ match2 ]
```
