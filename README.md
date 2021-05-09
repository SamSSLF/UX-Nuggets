# UX-Nuggets
 
## What is this?
In an organization where multiple research studies are conducted every week, month, or year by a variety of researchers, these reports pile up quickly. Then, when a team member, executive, or client asks a question about a certain topic (e.g., what do we know about how our users book conference rooms?), there’s a need to rely on the long-term memory of researchers who happened to conduct related studies. 

Inspired by this insight, I created a database for the future designers of the imaginary Martian Frontiers Colony to consolidate user research data and synthesise insights to guide them through their design processes. Each observation and related insights are logged as a "nugget" that any member of the organisation can query and refer to.

## Key Info
This project was completed in the course of 6 weeks from zero knowledge of Javascript, SQL, Front-end and Back-end programming during the Summer Term of the 2019-20 academic year for my Computing-2:Applications module. We were required to write a web application from scratch without the use of frameworks, utilising best practices. This was a solo project. 

Recently I have improved upon the code I wrote last year, improving the modularity of the program, the UI, and testing. 

## Features
- A user can input an observation/insight via the 'Add New Nugget' popup form in the sidebar.
- 'Nuggets' can be filtered by Experience Vector.
- A back-end that stores insights (nuggets) on a server, and allows the user to read from and write to that database via the use of asynchronous javascript Promises and callbacks.  

### Accessibility
- Colour Contrast is conforms to Web Content Accessibility Guidelines(WCAG) Level AA. 
- Input form row has aria labels for each field.
- All interactive elements tabable.
- Context is given to table elements through use of semantics such as `<thead>` and `<td>` so people using screen readers can have the row and column headers read aloud as they navigate through the table, or use alternative ways to render data to suit their needs.

## Limitations and Future Work Needed
- A more intricate data structure in the form of relational tables could be added to expand the functionality of the app e.g. a database of team members and different collections of insights for different teams and organisations.
- More filters e.g. a key word search, sort by emotions.
- Better testing framework i.e. not depending on IDs to delete test records would make the test script more robust. More tables would help with writing useful tests.

## How to Run
1. Make sure you have Node.js installed.
2. Navigate to the program's working directory 'UX-Nuggets' in the terminal.
3. Install dependencies by typing `$ npm install` into the terminal.
4. To view the web-app on your browser, type `$ node server.js` to run the program on port 8080 of your computer.

Best viewed on Google Chrome on a desktop computer.

## Tests
Run tests with 
```bash
$ npm run test
```