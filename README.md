# BeatYourFriends
A tiny quiz game web application

### Authors
* [Felix Gaggl](https://github.com/felixgaggl)
* [Michael Gundacker](https://github.com/migu3lle/)
* [Christina Senger](https://github.com/ChrissiSenger)

### Functionality:
 * Online Multiplayer game (no singleplayer)
 * Quiz with a predefined pool of questions
 * Unlimited games with your friends
                       
### Development:
 * IDE used for development: Visual Studio Code
 * Front-end framework: Angular
 * Back-end: NodeJS
 * Server mail-service: Nodemailer (https://nodemailer.com)
 * Database: MySQL
 
### Installation
To run this project on your computer please stick to the instructions below.<br>
1. Clone this project (git required)<br>
  Open Terminal and move to your installation folder. Run command <br>
  `git clone https://github.com/migu3lle/BeatYourFriends` <br>
  You will download the master branch to your computer.
2. Install and setup MySQL Database (MySQL installation preconditioned)<br>
  2.1 Create Database and user<br>
    Run commands <br>
    `mysql -u root -p` --> type in root password<br>
    `CREATE DATABASE beatyourfriends;`<br>
    `CREATE USER 'beatyourfriends'@'localhost' IDENTIFIED BY 'test123';`<br>
    `GRANT ALL PRIVILEGES ON beatyourfriends.* TO 'beatyourfriends'@'localhost';`<br>
  2.2 Fill database from script<br>
    Run the SQL script `beatyourfriends_database.sql` located in project's root folder<br>
3. Install NodeJS and serve NodeJS server application<br>
  3.1 Install NodeJS from https://nodejs.org (if you haven't done so far)<br>
  3.2 Move to project folder /BeatYourFriends/beatyourfriends-app/ and run `node /api/server/server.js` command<br>
4. Install Angular and serve application<br>
  4.1 Install Angluar CLI (if you haven't so far) by running `npm install -g @angular/cli`<br>
  4.2 Move to project folder /BeatYourFriends/beatyourfriends-app/ and run `npm install` command<br>
  4.3 Start Angular development server with command `ng serve --open`<br>
  



