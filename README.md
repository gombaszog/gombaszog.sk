[![Build Status](https://travis-ci.org/gombaszog/gombaszog.sk.svg?branch=master)](https://travis-ci.org/gombaszog/gombaszog.sk)
[![Dependency Status](https://img.shields.io/badge/dependency-ruby%202.1.0-blue.svg)](https://www.ruby-lang.org/en/news/2013/12/25/ruby-2-1-0-is-released/)

gombaszog.sk
============

### Description

The Gombasek Summer Camp is the traditional festival of Hungarian-speaking young people living in Slovakia. You can read more about it [here](http://www.gombaszog.sk). 
The festival's website is created from the *master* branch of this repository.

### Requires

ruby 2.1.0

### Install

Installing rvm (Ruby Version Manager) with ruby 2.1.0
```sh
$ gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$ \curl -sSL https://get.rvm.io | bash -s stable
$ rvm install 2.1.0
$ rvm use 2.1.0 --default
```
Clone and install dependecies:
```sh
$ git clone https://github.com/gombaszog/gombaszog.sk.git
$ cd gombaszog.sk
$ bundle install
 ```

### Usage

You'll have to install an ExecJS library e.g. [Node.js](http://nodejs.org).

Run the Jekyll server inside the main directory of the repository:
```
$ jekyll serve
```
If you want to build the static site and get the result in the *_site* folder:
```
$ jekyll build
```
If you get a Pagination error, you need to delete the *plugins/pagination.rb* file (it's a temporary solution).

The site will be available at: [http://localhost:4000](http://localhost:4000)

For more info please visit the [Jekyll project site](http://jekyllrb.com/).

### License
This source code is released under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).
