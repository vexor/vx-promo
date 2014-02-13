---
layout: default
title: Build Configuration
---

The build description should be placed in .travis.yml in the repo's root. Here's the keys description:

    ---
    env:
      - environment variables, used in the matrix

    cache:
      directories:
        - folders to be cached between the builds (defaults are set for Ruby and Scala)

    rvm:
      - Ruby versions list, used in the matrix

    scala:
      - Scala versions list, used in the matrix

    java:
      - Java versions list, used in the matrix

    gemfile:
      - Gemfiles list, used in the matrix

    image:
      - Docker images list, used in the matrix

    before_install:
      - commands to run before dependencies installation

    before_script:
      - commands to run before build

    script:
      - commands running the tests

    after_success:
      - commands to execute after the successful test run
