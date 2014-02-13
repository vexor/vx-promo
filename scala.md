---
layout: default
title: Scala
---

To run Scala apps issue:

    language: scala

Scala 2.10.3 is used by default.

Because of Scala's versions multitude and incompatibilities it's not preinstalled
in dmexe/vexor-recise-full. Instead, [sbt-extras][extras] is used together with caching.
[sbt-extras][extras] detects and automatically installs the required version `sbt` which,
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

JDKs preinstalled in dmexe/vexor-precise-full include

* openjdk7
* oraclejdk7
* oraclejdk8

Java 6 isn't included.

Caching is turned on automatically when you use Scala. To turn it off set:

    cache: false

[extras]: https://github.com/paulp/sbt-extras
