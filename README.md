# TasksManager

## 🧭 Project Overview
This project involves creating a single, comprehensive React component called `TasksManager`. Its primary purpose is to manage a list of tasks, allowing users to add new tasks and track the time spent on each. This application serves as an exercise in building stateful components, handling user interactions, and integrating with a mock backend API (json-server).

## ✨ Key Features & Components
*   **`TasksManager.js`**: The central React component responsible for all task management logic and UI rendering.
*   **Task Creation**:
    *   A controlled form allows users to input and submit new tasks.
    *   New tasks are sent to a local API (json-server), and upon receiving the new task with an ID, it's added to the component's state.
*   **Task Display**:
    *   Each task displays its name, unique ID (from API), elapsed time (in seconds), and status (e.g., `isRunning`, `isDone`, `isRemoved`).
*   **Task Functionalities**:
    *   **Timer**: Start and stop time tracking for a task. Only one task can be timed at once.
    *   **Completion**: Mark tasks as "done," which also stops the timer and typically moves the task to the end of the list (or applies specific sorting).
    *   **Deletion**: Remove tasks from view (soft delete, by setting `isRemoved` to true, task remains in state). Deletion is only possible after a task is marked "done."
*   **API Integration**: All task state changes (creation, timing updates, completion, removal status) are persisted to the local json-server API.
*   **State Management**: Adheres to React's immutability principles for state updates (e.g., creating new arrays/objects for modifications using spread syntax, `.map()`, `.filter()`).

## 🛠 Tech Stack

  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-grey?style=for-the-badge&logo=javascript)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
  ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)


## 🚀 Getting Started

### Prerequisites
*   Node.js and npm (or yarn) installed on your system.
*   json-server installed globally:
    ```bash
    npm install -g json-server@0.17
    ```
    Verify installation: `json-server -v`

### Installation
1.  Clone the repository (if applicable) or navigate to the project directory.
2.  Install the project dependencies:
    ```bash
    npm install
    ```

### Setup Backend (JSON Server)
1.  In the project's root directory, create a `db` folder if it doesn't exist.
2.  Inside the `db` folder, create a `data.json` file. Per the original task instructions, structure it like this to store your tasks:
    ```json
    {
      "data": [
        {
          "id": 1,
          "name": "Sample Task",
          "time": 0,
          "isRunning": false,
          "isDone": false,
          "isRemoved": false
        }
      ]
    }
    ```
    *(You can start with an empty `data: []` array or pre-populate it with sample tasks.)*

### Running the Application
1.  **Start the JSON Server**:
    Open a terminal window, navigate to the project root, and run:
    ```bash
    json-server --watch ./db/data.json --port 3005
    ```
    The API will be available at `http://localhost:3005/data`.

2.  **Start the React Development Server**:
    Open another terminal window, navigate to the project root, and run:
    ```bash
    npm run start
    ```
    The application will then be accessible in your web browser, usually at `http://localhost:8080` (this is the default for `webpack serve --open`).

## 🎨 Styling
Styling for this project is handled via CSS:
*   A main stylesheet `src/styles/main.css` is imported into `src/app.js`.
*   Webpack is configured with `style-loader` and `css-loader` to bundle CSS and inject it into the HTML `<head>` as a `<style/>` tag.
*   The BEM (Block, Element, Modifier) methodology is recommended for structuring CSS classes for maintainability and scalability, as suggested in the task guidelines.

## ⚙️ Webpack Configuration
The project uses Webpack, configured via `webpack.config.js`, for the following:
*   **Entry Point**: `src/app.js` is the main entry file for the application.
*   **Output**: Bundled JavaScript is output to `build/app.min.js`.
*   **Loaders**:
    *   `babel-loader`: Transpiles modern JavaScript (ES6+) and JSX into browser-compatible code.
    *   `style-loader` and `css-loader`: Process CSS files, allowing them to be imported into JavaScript and injected into the DOM.
    *   `asset/resource`: Handles image and font files, outputting them to `build/images/` and `build/fonts/` directories respectively, and providing paths to them in the JavaScript bundle.
*   **Plugins**:
    *   `HtmlWebpackPlugin`: Generates an `index.html` file in the `build` directory and automatically injects a `<script>` tag for the bundled JavaScript (`app.min.js`).
*   **Development Server**: The `npm run start` script utilizes `webpack serve` (via `webpack-dev-server`) to provide a development server with live reloading.

## 📌 Lessons Learned (from this project)
*   **React Class Components & State**: Building a complex, stateful component (likely a class component as per `this.state` usage in task description) to manage application data and UI.
*   **Controlled Forms**: Implementing forms in React where input values are driven by component state and updated via `onChange` handlers.
*   **Event Handling**: Managing user interactions such as button clicks (`onClick`), form submissions (`onSubmit`), and other DOM events.
*   **API Integration (CRUD operations)**:
    *   Making asynchronous requests (e.g., using `fetch` or `axios`) to a backend API (json-server).
    *   Performing Create (POST), Read (GET), Update (PUT/PATCH), and Delete (DELETE, or soft delete via PUT/PATCH) operations on tasks.
    *   Handling API responses and updating component state accordingly.
*   **State Immutability**: Correctly updating state in React by creating new copies of objects and arrays instead of mutating them directly.
*   **Conditional Rendering**: Dynamically rendering UI elements (e.g., enabling/disabling buttons, showing different task views) based on component state.
*   **Array Manipulations for UI**: Using JavaScript array methods like `.map()` (for rendering lists), `.filter()` (for "removing" items or filtering views), and `.sort()` (for ordering tasks).
*   **Timers in React**: Implementing timer functionality (e.g., using `setInterval` and `clearInterval`) and managing its lifecycle within a React component, ensuring proper cleanup.
*   **Single Component Focus**: Understanding the challenges and patterns for managing a larger set of responsibilities within a single component before learning advanced state management or component splitting techniques.
*   **Basic Webpack Configuration**: Gaining familiarity with a Webpack setup for bundling JavaScript, CSS, and assets in a React project.

## 🙏 Acknowledgements
*   This project is based on a task from devmentor.pl, designed to practice fundamental and intermediate React concepts, including state management, API interaction, and component lifecycle.
