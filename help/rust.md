---
layout: help
title: Rust
---

In order to run the __rust__ tests, you need to specify:

    language: rust

In this case the version ``0.11`` will be used and the following commands will be run:

    install:
    - git submodule init
    - git submodule update

    script: make

These versions of __rust__ are available for testing

* ``0.11.0``
* ``nightly`` fresh build from the repository, refreshed nightly

To select the specific version for testing, a configuration key ``rust`` is used

    rust:
    - nightly
