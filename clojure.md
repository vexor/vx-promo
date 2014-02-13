---
layout: default
title: Clojure
---

To run Clojure apps you should issue:

    language: clojure

Leiningen 2.3.4 is preinstalled in dmexe/vexor-precise-full image; 1.x isn't supported; symlink lein -> lein2 is included for Travis compatibility.

These commands will be run:

    lein deps
    lein test

You can set your custom command to run the tests:

    script: lein midje

You can specify a different version of the JDK

    jdk:
      - openjdk7
      - oraclejdk7

JDKs preinstalled in dmexe/vexor-precise-full include

* openjdk7
* oraclejdk7
* oraclejdk8

Java 6 isn't included.
