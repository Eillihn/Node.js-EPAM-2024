# Node.js EPAM Mentoring program 2024

# Task 1. Introduction to Node.js
- src/task1/index.ts: getRandomNumber() function is exported by default. The function returns a random integer from 1 to 1000;
- nodemon is installed as dev dependency;
- src/task1/index.ts file is started via npm script command using nodemon;
- NVM is installed. Two versions of Node.js are installed - LTS one and the latest released one.
  ![alt text](resourses/task1-screen1.png)
  ![alt text](resourses/task1-screen2.png)

### Usage
To use the `getRandomNumber()` function run in terminal:

```javascript
node--
experimental - modules
const {default: getRandomNumber} = await import("./index.ts");
getRandomNumber()
```

# Task 2. Standard Library
src/task2/activityMonitor.ts: 
- shows the most CPU-intensive process that's running on the system;
- program uses system shell command output to retrieve process name, CPU, and memory usage details;
- refresh rate is ten times per second;
- the program uses only the standard library;
- each update will NOT start from the new line. It is always displayed only in one row;
- once per minute program appends the output to the log file src/task2/activityMonitor.log in the format `<unixtime> : <process info>.` If the file doesn't exist - the program creates it.
- program supports Linux, macOS, and Windows operating systems.
