---
layout: help
title: Node.js
---

In order to run the nodejs tests, you need to specify:

    language: node_js

In this case the version ``0.10.29`` will be used and the following commands will be run:

    install: npm install
    script: npm test

These versions of nodejs are available for testing

* ``0.9.12``
* ``0.10.29``
* ``0.11.13``

To select the specific version for testing, a configuration key ``node_js`` is used

    node_js:
    - "0.9"
    - "0.10"

When searching the __nodejs__ version, fuzzy matching is used, which first tries to find a
match strictly, and then falls back to the closest version if not found.

Build machine has phantomjs 1.9.7 preinstalled, which you can use for headless testing.
