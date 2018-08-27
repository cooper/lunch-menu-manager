# LMM

**LMM** (**L**unch **M**enu **M**anager) is a centralized solution for maintaining and distributing cafeteria menus. It is written in PHP and stores data with SQLite, making it quite portable and fairly simple to incorporate into any facility's existing web services.

## Purpose

Most cafeterias plan ahead. They decide on which meals will be served days, weeks, or even months in advance. Unfortunately, the same old methods are still being used to distribute the menus to customers:

1. After the menu is finalized, someone has to transcribe it into a program such as Publisher for printing.
2. Then, someone must manually distribute or post the new menus.
3. Each morning, someone has to update the website with the meal for the current day.
4. All these "someones" become frustrated by these seemingly redundant steps.

LMM is a centralized menu solution that turns a tedious, repetitive multi-step process into one which can be completed weeks or months in advance in just one sitting. Input your menu just *once*, and let LMM handle the logistics.

## Features

* a productive, clean, and straightforward interface for entering menu data
* the ability to plan menus ahead indefinitely
* a simple means by which menus can be printed and e-mailed, eliminating the need for a manually-updated printable menu such as in Publisher
* dynamic embeddable menus for your website
* a JSON-encoded API for automatically retrieving menu information


## Screenshots

Login screen

![Login](http://i.imgur.com/Mc1rVYy.png)

Administrator calendar, crimson theme

![Calendar](http://i.imgur.com/7LKHp4h.png)

Menu editor, crimson theme

![Menu editor](http://i.imgur.com/bbjr0LH.png)

Public calendar, crimson theme

![Calendar](http://i.imgur.com/piJWIK1.png)

Generated PDF calendar for printing

![PDF](http://i.imgur.com/dOTLqTG.png)



## Setup

Install SQLite3 and enable the necessary PHP extensions for its use. This process varies based on your web server and PHP setup.

Clone the repository as a subdirectory in your web server's document root.

Create a file called `verify_login.php` in the root directory of LMM with a single function `verify_login($username = '', $password = '')` which returns `true` or `false` for authentication. Some PHP knowledge required. I have plans for built-in authentication options in the future.

## Documentation

Refer to the [technical documentation](doc/lmm-technical.pdf) for more detailed
setup instructions and info about the APIs.

A [user instruction](doc/lmm-user-instructions.pdf) document is also provided.
