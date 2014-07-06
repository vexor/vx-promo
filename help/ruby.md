---
layout: help
title: Ruby
---

In order to start ruby tests, you only need to specify the language:

    language: ruby

In this simplest case the ``1.9.3`` ruby version will be used and these commands will be run:

    install: bundle install
    script: bundle exec rake

If you're using ``rails``, you will need to setup the DB before running tests:

    before_script:
    - bundle exec rake db:create db:migrate RAILS_ENV=test

You can specify additional bundler options:

    bundler_args: --without debugger

You can also specify several different Gemfile versions, in this case
a matrix will be created:

    gemfile:
    - Gemfile.pg
    - Gemfile.mysql

These versions of ruby are available for testing:

* ``1.9.3-p547``
* ``2.0.0-p481``
* ``2.1.1``
* ``2.1.2``
* ``jruby-1.7.13``
* ``head``, fresh repository version, rebuilt every week

To select the required version, use ``rvm`` key:

    rvm:
    - 2.0
    - 2.1
    - head

When searching a ruby version, a fuzzy matching is used, so you don't need to strictly specify the versions.
If for whatever reasons you need the version we don't have, you have ``ruby-build`` preinstalled on the build
machine, so you can always compile the required version.

In order to save time when running tests, installed gems are cached.
You can disable this with:

    cache: false


We don't use ``rbenv`` or ``rvm`` to manage the ruby versions; all rubies are
built as deb packages. When running your tests, the required ruby version
is installed from the corresponding deb package.
We don't have neither ``rbenv``, nor ``rvm`` on the testing machine, but
``ruby-build`` is installed and can be used to compile the required version.
The best option, however, will be to let us know which ruby version you need and
we'll create the deb package for you.
