---
layout: help
title: Go
---

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
* ``tip``, fresh repository build, updated weekly

To select a specific version for testing, a ``go`` config key should be used:

    rvm:
    - go1.1
    - go2.2
    - tip

When searching the __go__ version, fuzzy matching is used, which first tries to find a
match strictly, and then falls back to the closest version if not found.
