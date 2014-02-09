---
layout: default
title: Clojure
---

# Clojure

Для запуска приложений написанных на Clojure, нужно указать

    language: clojure

В образ dmexe/vexor-precise-full предутановлен leiningen 2.3.4, версия 1.x
в образ не входит, для совместимости с travis присутствует symlink lein -> lein2

Будут выполнены команды

    lein deps
    lein test

Команду для запуска тестов можно переопределить

    script: lein midje

Можно указать разные версии java

    jdk:
      - openjdk7
      - oraclejdk7

В образ dmexe/vexor-precise-full, предустановленны версии java

* openjdk7
* oraclejdk7
* oraclejdk8

Java 6 в образ не входит.
