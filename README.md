# Lmm

Lmm (**L**unch **M**enu **M**anager) is a centralized solution for maintaining and distributing cafeteria menus. It is written in PHP and stores data in an SQLite database, making it quite portable and fairly simple to incorporate into any facility's existing web services.

## Purpose

Most cafeterias plan the food they will serve weeks or even months in advance. But the same old processes are still being used to distribute the menus to customers. After the menu is finalized, someone has to transcribe it into a program such as Publisher for printing. Then, an employee has to manually hand out or place the menus. Each morning, someone has to update the website with the menu for the current day.

Lmm is a centralized solution that turns an ongoing multi-step process into one that can be completed months in advance in just one sitting. Input the menus just one time, and let Lmm do all the other steps. No more copying and pasting

## Features

* a productive, clean, and straightforward interface for entering menu data
* the ability to plan menus weeks, months, or even years ahead
* a simple means by which menus can be printed and e-mailed, eliminating the need for a manually-updated printable menu such as in Publisher
* a JSON-encoded API for automatically retrieving menu information (useful for displaying today's menu on your website, etc.)


## Screenshots

Login screen

![Login](http://i.imgur.com/VBLIFWs.png)

Administrator calendar, red and black theme

![Calendar](http://i.imgur.com/BEFalg9.png)

Menu editor, red and black theme

![Menu editor](http://i.imgur.com/Gnw7I26.png)

Generated PDF calendar for printing

![PDF](http://i.imgur.com/Eq1jijk.png)



## Setup

Install SQLite3 and enable the necessary PHP extensions for its use. This process varies based on your web server and PHP setup.

Clone the repository as a subdirectory in your web server's document root.

Create a file called `verify_password.php` in the root directory of Lmm with a single function `verify_password($username = '', $password = '')` which returns `true` or `false` for authentication. Some PHP knowledge required. I have plans for built-in authentication options in the future.

## API

Lmm provides a JSON-encoded API.
Documentation for it will eventually be here.