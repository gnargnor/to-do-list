# To Do List

This project demonstrates a to-do list that allows the user to create, edit, delete, and retrieve stored tasks using a PostgreSQL database.  In addition to the basic functionality, you can also prioritize tasks with a dropdown menu, which will change the color and the position of the task.

## Getting Started

Follow the steps below to get a copy of the To-Do List application up and running on your local machine.

### Prerequisites

* Git
* Grunt  
* Node and NPM  
* Postico or a similar PostGreSQL database server

### Installing

* Git
  * Initialize a Git repository
  * Add the remote
  * Pull the project to your local repository
```
>git init
>git remote add origin https://github.com/gnargnor/to-do-list.git
>git pull origin master
```
* NPM  
  * Install dependencies
```
>npm install
```
* Grunt  
  * Start Grunt 
```
>grunt
```
* Postico
  * Start a local Postico database server on port 5432 (default port for postico)  
```
>brew services start postgresql
``` 
  * The database name will be 'chi' by default - this can be changed in task.js under the server folder of the project
* Node
  * Spin up the Node server
```
>npm start
```
* Browser  
  * Navigate to `localhost:5000`

## Built With

* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com/)
* [jQuery](jquery.com)
* [PostgreSQL](https://postgresql.org)
* [Postico](https://eggerapps.at/postico/)
* CSS3
* HTML5
* JavaScript

## Authors

* **Logan Kelly**
  * [github.com/gnargnor](https://github.com/gnargnor)  
  * [Bizzey Tech, LLC](www.bizzeytech.com)  

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Prime Academy](www.primeacademy.io) - assignment credit
