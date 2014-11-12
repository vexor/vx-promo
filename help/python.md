---
layout: help
title: Python
---

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

* ``2.7.8``
* ``3.1.5``
* ``3.2.5``
* ``3.3.3``
* ``3.4.1``
* ``pypy-2.2.1``

To select a specific version for testing, a ``python`` config key should be used:

    python:
    - 2.7
    - pypy-2

When searching the __python__ version, fuzzy matching is used, which first tries to find a
match strictly, and then falls back to the closest version if not found.
