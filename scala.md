---
layout: default
title: Scala
---

# Scala

Для запуска приложений написанных на scala, достаточно просто указать

    language: scala

По умолчанию будет использоваться версия 2.10.3.

Scala в образ dmexe/vexor-recise-full не установлена, потому что версий очень
много и совместимость между ними хромает. Вместо предустановки используется
[sbt-extras][extras] совместно с кэшированием. [sbt-extras][extras] автоматически
детектит и устанавливает нужную версию sbt, а та уже устанавливает нужную версию
scala. Во время первого запуска все будет скачано и скомпилино, в дальнейшем
благодяря кэшированию будет работать быстро.

Команды выполяемые для тесторования

    sbt ++$SCALA_VERSION update
    sbt ++$SCALA_VERSION test

Можно указать разные версии scala и java

    scala:
      - 2.10.2
      - 2.10.3

    jdk:
      - openjdk7
      - oraclejdk7

В образ dmexe/vexor-precise-full, предустановленны версии java

* openjdk7
* oraclejdk7
* oraclejdk8

Java 6 в образ не входит.

[extras]: https://github.com/paulp/sbt-extras
