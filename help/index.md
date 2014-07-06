---
layout: help
title: Configuration
---
Build config file must be a YAML file called ``.tavis.yml`` and located in the project root.
For supported languages the configuration process is very simple, just specify the language
in the ``language`` config section, for example ``language: ruby``.
In this case the preparing of the environment and running the tests will be automatic and
will follow the conventions of currently selected language.
Some supported languages need only one ``language`` key, but some will require additional setup.

If built-in configuration for running tests doesn't suit your for whatever reason,
you can always customize it with ``install``, ``script``, ``before_install`` and ``before_script``
keys. These keys contain commands that will be run in the shell.


* __env__ allows to list environment variables that your tests use.

* __before_install__ is run, as seen from the name, before the installation and is usually
required to install additional libraries or dependencies for your project.

* __install__ runs commands to install the dependencies, libraries and anything that your tests require.
If this config key is empty, the default commands for each language will be used, for example
``bundle install`` for ruby or ``go get -v ./...`` for go.

* __before_script__ here you can prepare various services to run your tests, for example to setup your database.

* __script__ actually runs your tests. If this config key is empty, the default test runner for each
particular language will be used.

Here is the example configuration that uses some of the above keys

    language: ruby

    before_install: sudo apt-get install libicu-dev

    before_script:
    - psql -U postgres -c 'create database test;'
    - bundle exec rake db:migrate

    script: bundle exec rake test:ci


Besides regular configuration keys with commands, you can create build matrices,
i.e. run a single build simultaneously in different configurations.
The list of configuration keys for a matrix:

* __env__ environment variable
* __rvm__ ruby version
* __jdk__ java version
* __scala__ scala version
* __go__ go version
* __node_js__ node.js version

The matrices are used for parallelizing your test suite besides running several different configurations.
You can split your tests into several parts and run them in parallel.
This can give you a significant speed boost, for example to decrease the test run time
from 1 hour to 5 minutes.
Since vexor.io bills you for used resources, there is no difference in cost when
running your tests on a single worker for 1 hour or running it on 12 workers for 5 minutes.

Besides all above, you can change the timeout values that are used when running the tests:

* __timeout__ maximum test run time, 1 hour by default.
If test does not finish within this time it is stopped forcibly.

* __read timeout__ 10 minutes by default. If no stdout occured during this time, the test is stopped.
This config is used to kill the hung test after 10 minutes and avoid waiting for entire hour.

Timeouts generally allow you to forcibly close misbehaving tasks, but sometimes they can get in your way.
In this case you can always increase their values, because in vexor.io you pay only for used
resources, that's why we allow you to set any timeout values.

* __vexor.timeout__ Maximum task run time. Can be any value.

* __vexor.read_timeout__ Maximum task stdout read wait time. Can be any value.

