---
layout: help
title: Configuration
sitemap:
  priority: 0.7
  changefreq: monthly
  lastmod: 2016-11-14T13:45:20+03:00
---

# Getting started with Vexor

## Registration<a class="anchor" id="getting-started-registration"></a>

In order to start using Vexor you should have a GitHub or BitBucket account.

![Sign up to Vexor](/images/docs/01.jpg)

Vexor supports 3 popular source control providers: [GitHub](https://github.com), [BitBucket](https://bitbucket.org) and [GitLab](https://gitlab.com). No matter which one you've signed up with, you can always connect another, as well as update your email address and name, on the Profile Settings page.

![Profile settings](/images/docs/02.jpg)

## Team settings<a class="anchor" id="getting-started-team-settings"></a>

Collaborators can be invited to your team on the "Users" page. Each user can be assigned with a role Admin or Developer. Developers cannot remove projects and add users to the team.

![Team settings](/images/docs/04.jpg)

## Adding a project<a class="anchor" id="getting-started-adding-a-project"></a>

There's a list of all repos imported from your connected accounts in the "Add project" section.

![Projects list](/images/docs/03.jpg)

To add a project and make a first build just press "Add". You'll be asked to specify a project's language while adding.

![Adding a project](/images/docs/05.jpg)

Then you'll be redirected to the freshly added project.

![Project page](/images/docs/06.jpg)

## Project notification settings<a class="anchor" id="getting-started-project-notifications"></a>

You can choose on which occasions you will be notified about your project's build statuses. There're three available options:

+ **Watching** (default): Get an email after each build is completed whether it's failed or succeeded.
+ **Not watching**: Get an email only if a build was initiated by your commit or pull request.
+ **Ignoring**: Don't get any emails about this project.

![Project notifications settings](/images/docs/07.jpg)

# Project settings<a class="anchor" id="project-settings"></a>

Secure env variables, SSH keys and build restrictions can be configured on project's "Settings" page.

![Project settings page](/images/docs/project-settings.jpg)

## Choosing project's language<a class="anchor" id="project-settings-language"></a>

Project's language can be changed here.

![Project settings language](/images/docs/project-settings-language.jpg)

## Configuring build restrictions<a class="anchor" id="project-settings-build-restrictions"></a>

You can specify which branches you want to be built by a regular expression in the "Filter pushes" popup.

![Project settings | Filter branches](/images/docs/project-settings-build-restrictions.jpg)

We don't build pull requests from the same repo by default, because builds are already being initiated by pushes to a repo. This behavior can be changed by clicking on a "Build pull requests" checkbox (e.g. if you have filtered some branches but want to build all PRs). Pull requests from foreign repos are being built always, whether "Build pull requests" checkbox is on or not.

## Configuring build statuses on GitHub or GitLab (no BitBucket, sorry)<a class="anchor" id="project-settings-build-statuses"></a>

Build statuses shown in pull requests could be configured here. Enabled by default.

![Project settings | Build statuses](/images/docs/project-settings-build-statuses.jpg)

## Canceling running builds after a push to the same branch<a class="anchor" id="project-settings-cancel-ongoing-build"></a>

You might want ongoing builds to get cancelled after a push to the same branch. Enabled by default.

![Project settings | Cancel builds](/images/docs/project-settings-cancel-builds.jpg)

## Configuring Slack notifications<a class="anchor" id="project-settings-slack-notifications"></a>

Vexor can send build notifications to Slack channels. To enable this feature you should create an incoming webhook on the Slack integrations page and paste it to the "slack" section of the Vexor project settings page.

![Project settings | Slack](/images/docs/project-settings-slack.jpg)

## Securing environment variables<a class="anchor" id="project-settings-env-vars"></a>

You can add secure environment variables to your project (e.g. Heroku tokens, Code Climate keys, etc.). Note that env-vars which don't have to be secure could also be added via `.vexor.yml` config file.

![Project settings | env vars](/images/docs/project-settings-env-vars.jpg)

## Adding SSH keys<a class="anchor" id="project-settings-ssh-keys"></a>

Additional SSH keys can also be added through the interface. Note that you might want to keep keys in a particular order. User-added SSH keys are being added to the agent before the project's deploy key, ordered from most recent to earliest.

![Project settings | SSH keys](/images/docs/project-settings-ssh-keys.jpg)

# Vexor config file<a class="anchor" id="config-file"></a>

Project's config should be stored in `vexor.yml` (`.vexor.yml` works too) file in a root directory. For those who are migrating from Travis it is possible to use `.travis.yml` file but it's recommended to switch to `vexor.yml` config, because Vexor is not fully compatible with Travis and uses slightly different configuration options.

## Available configuration keys

### Common keys<a class="anchor" id="config-common-keys"></a>

#### language *string*<a class="anchor" id="config-language"></a>

  Specify a language so Vexor could run language-specific preparations for your project. If you don't have a Vexor config included in your repo's root, a default config will be used, which has only the `language` key based on a language you've chosen when added a repo to Vexor. If config file is empty, without language specified, your build won't we able to run.

  Example:

  ```yaml
  language: ruby
  ```

#### env *map*<a class="anchor" id="config-env"></a>

  Set up your environment variables here. For secure env-vars see [Configuring project ENV variables](#project-settings-env-vars) section. Environment config consists of three sections: `global`, `exclude` and `matrix`.

  **Global**

  A list of global environment variables exported into the system.

  ```yaml
  env:
    global:
    - VAR1=some_stuff
    - VAR2="i'm a var with spaces"
  ```

  **Matrix**

  A list of martix-specific variables. For each variable there will be one job started with this var + all vars from `global` section exported. See [Parallelism](#parallelism) for better matrix understanding.

  ```yaml
  env:
    martix:
    - SCRIPT=script_for_one_job
    - SCRIPT=script_for_another_job
  ```

  **Exclude**

  Soon

  **Full example**

  ```yaml
  env:
    global:
    - RAILS_ENV=test
    - DATABASE_URL=postgresql://postgres@herokupgserver.com/my_database
    matrix:
    - SCRIPT="bundle exec rspec"
    - SCRIPT="bundle exec brakeman"
    - SCRIPT="bundle exec rubocop"

  ```
#### before_install *array*<a class="anchor" id="config-before-install"></a>

  A list of commands called before installation stage.

  ```yaml
  before_install:
  - echo called before installing any dependencies
  - ... etc.
  ```

#### install *array*<a class="anchor" id="config-install"></a>

  By default we install a number of packages depending on a language specified at the beginning of your config file, including a language binary itself. Use this option to override this behavior.

  ```yaml
  install:
  - sudo apt-get install -y ruby-build rbenv
  - rbenv install 2.1.2
  - gem install bundler
  - ... etc.
  ```

#### database *array*<a class="anchor" id="config-database"></a>

  A list of database-related configuration.

  We already have Postgresql 9.4 (with postgres-contrib), MySQL 5.6, MongoDB 2.6.5 and Redis 3.0.2 installed in containers.

  **Using PostgreSQL**

  Postgres starts automatically in containers. Use `postgres` user to execute psql command.

  ```yaml
  database:
  - psql -U postgres -c "create database test;"
  ```

  **Using MySQL**

  MySQL is already running by default in containers. Use `root` user to call mysql queries.

  ```yaml
  database:
  – mysql -u root -e "create database test;"
  ```

  *Notice for Rails users*: by default we're already running all necessary database configuration to get Rails tests working so in most cases you don't have to write any database configuration at all. Use `database` config only if you want to override this behavior.

#### before_script *array*<a class="anchor" id="config-before-script"></a>

  A list of commands called after installation and database stages but before running tests. Usually it's used to install additional dependencies when the system's environment's already configured (e.g you need to install additional gems etc.)

  ```yaml
  before_script:
  - sudo npm install bower
  - sudo gem install brakeman
  ```

#### services *array*<a class="anchor" id="config-services"></a>

  Additional services you want to run in your container. For each specified service there will be `sudo service #{specified_service} start` command executed. [Here](https://github.com/vexor/vx-docker-image/tree/master/docker/trusty/playbooks/roles) you can see which services are already present in our image.

  See [Services](#services) for details about versions installed in our image.

  **Note**: *There's an alias for `rabbitmq-server`. You could simply write `rabbitmq`.*

  ```yaml
  services:
  - rabbitmq
  - redis-server
  ```

#### script *string*<a class="anchor" id="config-script"></a>

  You can override a command which runs tests. This might be useful together with `matrix` when you want to run your test in parallel.

  ```yaml
  script: bundle exec rspec
  ```

#### workdir *string*<a class="anchor" id="config-chdir"></a>
  Your project's working directory. By default it's set to your repo's root directory (which is `~/org_name/project_name`).

  ```yaml
  workdir: relative_dir
  ```

#### timeout *int*<a class="anchor" id="config-timeout"></a>
  Job's maximum running time in seconds. Default is 1 hour.

  ```yaml
  vexor:
    timeout: 1800
  ```

#### read_timeout *int*<a class="anchor" id="config-read-timeout"></a>

  If there wasn't any output within the read timeout (in seconds) a job will be shut down.

  ```yaml
  vexor:
    read_timeout: 60
  ```

#### cache <a class="anchor" id="config-cache"></a>

  Enable/disable dependencies caching. `True` by default.

  ```yaml
  cache: false
  ```

  <b>Directories caching:</b>

  You can download some packages before running tests and install them. To get away from downloading the package each time you can cache directory where it is located. Then delete "wget" from your config file and just "make" or "dpkg" your package at each run of tests.

  ```yaml
  cache:
    enabled: true
    directories:
    - ~/my_deps1
    - /usr/local/my_deps2
    - .....
  ```

### Language versions<a class="anchor" id="config-languages"></a>

Each of these keys usually gets a list of language versions which you want to run tests against. If you specified env:matrix, there will be `versions_num * martix_size` jobs. See [Paralleism](#parallelism) for better understanding.

+ **rvm** *array*
+ **go** *array*
+ **jdk** *array*
+ **scala** *array*
+ **node_js** *array*
+ **python** *array*

Example:

```yaml
rvm:
- 1.9.3
- 2.0.0-p0
- 2.1.1
```

# Builds<a class="anchor" id="builds"></a>

## Cancel a build<a class="anchor" id="builds-cancel"></a>

You can cancel any build by clicking a "Stop" button on a build page. A particular job cannot be stopped.

![Cancelling a build](/images/docs/cancelling-build.jpg)

## Restart a build<a class="anchor" id="builds-rebuild"></a>

Any finished build can be restarted.

If you want to restart a build without changing any build configuration, just click a "Rebuild" button on a build page.

![Rebuild](/images/docs/rebuild.jpg)

In case you want to quickly test some configuration options out without commiting every `vexor.yml` change to a repo, you can use "Edit config" feature. Click "Edit config" button on a build page, modify your configuration and then click "Rebuild with new config" button. A new build will be created.

![Rebuild with new config](/images/docs/rebuild-with-new-config.jpg)


# Parallelism<a class="anchor" id="parallelism"></a>

One of the Vexor's main advantages is that it can run an unlimited amount of jobs in parallel. There're several ways to set up parallelim.

## Running tests in parallel against different language versions.<a class="anchor" id="parallelism-versions"></a>

You can specify different language versions (see [Language versions](#vexor-yml-language-versions) for details) in `vexor.yml` config file. For each version there will be a job started.

**Example:**

Config:

```yaml
rvm:
  - 2.1.0
  - 2.0.0
  - 1.9.3
  - rbx-2
```

Result:

![Parallelism | Capistrano example](/images/docs/parallelism-capistrano-example.jpg)

## Running a different script for each job<a class="anchor" id="parallelism-env"></a>

Parallel jobs can also be configured via `env:matrix` key in `vexor.yml` file. The basic idea is that you specify a script which depends on an environment variable and assign different values to this variable in the matrix section of a config file. Here's an example of how we're using this aproach to build the Vexor web app:

```yaml
env:
  matrix:
  - PROJECT=backend
  - PROJECT=frontend

script: bundle exec rake test:${PROJECT}
```

And here's a resulting build:

![Parallelism | Vexor example](/images/docs/parallelism-vexor-example.jpg)

Here's another example of how to use matrix for build parallelization. We're gonna run Rspec, check security with Brakeman, check code quality with Rubocop and check our coffee, scss and haml files.

```yaml
env:
  matrix:
    - BUILD_CMD='rspec'
    - BUILD_CMD='rubocop'
    - BUILD_CMD='brakeman -z'
    - BUILD_CMD='haml-lint app/views/'
    - BUILD_CMD='scss-lint'
    - BUILD_CMD='rake coffeelint'
script: bundle exec ${BUILD_CMD}
```

![Parallelism | Vexor 2 example](/images/docs/parallelism-vexor-2-example.jpg)

## Combining language versions with a matrix<a class="anchor" id="parallelism-combined"></a>

"Matrix" and "language versions" approaches can be combined. A resulting build will be containing `versions_num * matrix_size` jobs.

Example:

```yaml
env:
  matrix:
  - TEST_SUITE=test
  - TEST_SUITE=cucumber

rvm:
- 2.2
- 2.1
- 2.0
```

And the result is:

![Parallelism | Jekyll example](/images/docs/parallelism-jekyll-example.jpg)

## Parallel Rspec<a class="anchor" id="parallelism-rspec"></a>

There's another option for Rails users. You can specify a number of parallel jobs and set `script` to `parallel_rspec` to run automatically Rspec jobs in parallel.

```
parallel: 4
script: parallel_rspec
```

# Preinstalled packages<a class="anchor" id="services"></a>

There's a number of preinstalled packages in our image.

### Xvfb

We already have `xvfb` installed and running in our image.

### Postgresql

Version 9.4 with Contrib package is preinstalled and run automatically. Use login `postgres` without a password.

    psql -U postgres -c "create database test;"


### Mysql

Version 5.6 is preinstalled and run automatically. Use login `root` without a password.

    mysql -u root -e "create database test"

### MongoDB

Version 3.2 is preinstalled.

    services:
      - mongodb

### Redis

Version 3.0.2 is preinstalled and run automatically

### Rabbitmq

Version 3.6.1 is preinstalled; to run, issue:

    services:
      - rabbitmq

### Elasticsearch

Version 1.5.2 is preinstalled; to run, issue:

    services:
      - elasticsearch

You can use v2.1.1 also:

    services:
      - elasticsearch2

### PhantomJS

Version 2.1.1 is preinstalled

### SphinxSearch

Version 2.2.10 is preinstalled


# Language guides<a class="anchor" id="language-guides"></a>

## Ruby<a class="anchor" id="language-guides-ruby"></a>

In order to start ruby tests, you only need to specify the language:

    language: ruby

In this simplest case the ``2.0.0`` ruby version will be used and these commands will be run:

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

<p id="vexor-yml-language-versions">These versions of ruby are available for testing:</p>

* ``1.8.7-p375``
* ``1.9.2-p320``
* ``1.9.3-p550``
* ``2.0.0-p645``
* ``2.1.0``
* ``2.1.1``
* ``2.1.2``
* ``2.1.3``
* ``2.1.4``
* ``2.1.5``
* ``2.1.6``
* ``2.1.7``
* ``2.1.8``
* ``2.1.9``
* ``2.1.10``
* ``2.2.0``
* ``2.2.1``
* ``2.2.2``
* ``2.2.3``
* ``2.2.4``
* ``2.2.5``
* ``2.3.0``
* ``2.3.1``
* ``jruby-1.7.19``
* ``jruby-1.7.23``
* ``jruby-9.0.0.0``
* ``rbx-2.5.2``
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

## Clojure<a class="anchor" id="language-guides-clojure"></a>

To run Clojure apps you should issue:

    language: clojure

Leiningen 2.3.4 is preinstalled in image; 1.x isn't supported; symlink lein -> lein2 is included for Travis compatibility.

These commands will be run:

    lein deps
    lein test

You can set your custom command to run the tests:

    script: lein midje

You can specify a different version of the JDK

    jdk:
      - openjdk7
      - oraclejdk7

JDKs preinstalled in image include

* openjdk7
* oraclejdk7
* oraclejdk8

Java 6 isn't included.

## Scala<a class="anchor" id="language-guides-scala"></a>

To run Scala apps issue:

    language: scala

Scala 2.10.3 is used by default.

Because of Scala's versions multitude and incompatibilities it's not preinstalled
in image. Instead, [sbt-extras][extras] is used together with caching.
[sbt-extras][extras] detects and automatically installs the required version sbt which,
in turn, manages the version of the language. Everything is being installed and set up
during the first run, then works fast because of caching.


Testing is run with these commands:

    sbt ++$SCALA_VERSION update
    sbt ++$SCALA_VERSION test

Scala and Java versions can be managed:

    scala:
      - 2.10.2
      - 2.10.3

    jdk:
      - openjdk7
      - oraclejdk7

JDKs preinstalled in image include

* openjdk7
* oraclejdk7
* oraclejdk8

Java 6 isn't included.

Caching is turned on automatically when you use Scala. To turn it off set:

    cache: false

[extras]: https://github.com/paulp/sbt-extras

## Python<a class="anchor" id="language-guides-python"></a>

In order to run tests for a __python__ project you need to specify the language:

    `language: python`


`python version 2.7` will be used for running the tests and the following commands will be run:

    install:
      virtualenv ~/.python-virtualenv
      source ~/.python-virtualenv/bin/activate

      pip install -r [Rr]equirements.txt
      or
      python setup.py install

    script:
      python manage.py test
      # or
      python setup.py test
      # or
      nosetests

These versions of __python__ are available

* ``2.7.9``
* ``2.7.10``
* ``2.7.11``
* ``3.2.6``
* ``3.3.6``
* ``3.4.3``
* ``3.5.0``
* ``3.5.1``
* ``pypy-2.5.0``

To select a specific version for testing, a ``python`` config key should be used:

    python:
    - 2.7
    - pypy-2

When searching the __python__ version, fuzzy matching is used, which first tries to find a
match strictly, and then falls back to the closest version if not found.

## Node.js<a class="anchor" id="language-guides-nodejs"></a>

In order to run the nodejs tests, you need to specify:

    language: node_js

In this case the version ``0.10.29`` will be used and the following commands will be run:

    install: npm install
    script: npm test

These versions of nodejs are available for testing

* ``0.8.28``
* ``0.9.12``
* ``0.10.37``
* ``0.10.40``
* ``0.11.16``
* ``0.12.0``
* ``0.12.2``
* ``4.0.0``
* ``4.2.2``
* ``4.2.3``
* ``4.2.4``
* ``4.2.5``
* ``4.2.6``
* ``4.4.2``
* ``4.4.4``
* ``5.1.0``
* ``5.2.0``
* ``5.3.0``
* ``5.4.0``
* ``5.4.1``
* ``5.5.0``
* ``5.10.1``
* ``5.11.0``
* ``5.11.1``
* ``6.0.0``
* ``6.1.0``

To select the specific version for testing, a configuration key ``node_js`` is used

    node_js:
    - "0.9"
    - "0.10"

When searching the __nodejs__ version, fuzzy matching is used, which first tries to find a
match strictly, and then falls back to the closest version if not found.

Build machine has phantomjs 1.9.7 preinstalled, which you can use for headless testing.

## Go<a class="anchor" id="language-guides-golang"></a>

In order to run tests for a __go__ project you need to specify the language:

    `language: go`


`go version 1.2.2` will be used for running the tests and the following commands will be run:

    install: go get -v ./...
    script: go test -v ./...

These versions of __go__ are available

* ``1.1.2``
* ``1.2.2``
* ``1.3``
* ``1.3.1``
* ``1.3.2``
* ``1.3.3``
* ``1.4.2``
* ``1.5``
* ``1.5.1``
* ``1.5.2``
* ``1.5.3``
* ``1.6``

To select a specific version for testing, a ``go`` config key should be used:

    rvm:
    - 1.1
    - 1.3
    - tip

When searching the __go__ version, fuzzy matching is used, which first tries to find a
match strictly, and then falls back to the closest version if not found.

## Rust<a class="anchor" id="language-guides-rust"></a>
In order to run the __rust__ tests, you need to specify:

    language: rust

In this case the version ``0.11`` will be used and the following commands will be run:

    install:
    - git submodule init
    - git submodule update

    script: make

These versions of __rust__ are available for testing

* ``0.11.0``
* ``0.12.0``
* ``1.0.0``
* ``1.2.0``
* ``1.3.0``
* ``1.4.0``
* ``1.5.0``
* ``1.6.0``
* ``1.7.0``
* ``1.8.0``

To select the specific version for testing, a configuration key ``rust`` is used

    rust:
    - 1.2.0


# Deploiyng your application<a class="anchor" id="deploy"></a>

Soon.

+ Capistrano examples
+ Ansible examples

# SSHing into a build<a class="anchor" id="ssh"></a>

Soon.

# Billing<a class="anchor" id="billing"></a>

Soon.
