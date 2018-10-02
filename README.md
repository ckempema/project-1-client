
# README
This tic tac toe game uses the following technologies for implementation:
- Webpage: HTML base with CSS and bootstrap styling
- Backend: Javascript base using Ajax to interface with an external server and JQuery to interface with html elements
- Version Control: Git


## User Stories and Wireframe
  The first stage of planning was to write user stories and generate a general layout for the webpage.

  #### User stories:
  - As a user, I want to be able to log in to my account and perform account functions
  - As a user, I want to be able to create a new game and play against myself
  - As a user, I want to be able to return to a game I have already started playing
  - As a user, I want to be able to view game statistics

  Not V1: As a user, I want to be able to chose to play against a user or a computer opponent.

  [V1 Wireframe](public/project1_wireframe_v1_0.png)

## Planning
  For planning I laid out a rough structure of what was required for mvp then wrote code in the order:
    - Game logic
    - User authentication
    - Game server Manipulation
    - Advanced Features

  I first laid out function headers and TODO statements for each thing i thought I needed, trying to break problems down to smaller blocks that fit inside of functions. After adding minor functionality I would return back and test everything. I often noticed that a minor change would result in unexpected errors elsewhere, and often required major refactoring to fix in a way that kept the code base as clean as possible.

  Major problems mostly evolved from minor logic errors or typos that cascaded to major failures when run, particularly within the AI functionality. I often found my codebase to be unweildy, and had to stop and restructure large blocks of code to clean it up and maintain usability. Logic errors were resolved using copious amounts of console.log() statements to trace the issue to its location, and whiteboarding out the intended logic versus resulting output.

## Unresolved Issues
  The largest unresolved issue to my mind is styling. Beyond the ovbious 'Buttons dont line up' ther are a number of changes I would want to implement.
    - Make pages scale to screen size
      - Use media queries to help render
      - Dont use fixed width for buttons/boxes
    - Differentiate between input field and buttons
    - Clean up retrieve games output to a more usable format
    - Allow user to click a retrieved game to reactivate it for player

  Outside of styling, future work could be put into:
    - Further optimization of the AI functionailty
      - Ensure a best move rather than the first availible optimal move
      - Enable user to play with easyAI rather than just advanced AI
    - Use of mutiplayer option on server
    - Optimize the checkWin function to determine who won.
