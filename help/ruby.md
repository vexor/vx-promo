---
layout: help
title: Ruby
---

To run Ruby apps just issue:

    language: ruby

MRI 1.9.3 is used by default. The default setup runs:

    rbenv shell 1.9.3
    bundle install
    bundle exec rake

If you wish to use different Ruby versions list them in `rvm` key.

    rvm:
      - 1.9.3
      - 2.0.0
      - 2.1.0

You can set your custom command to run the tests:

    script: rake spec:integration

The following are available in image:

* MRI 1.9.3-p547
* MRI 2.0.0-p481
* MRI 2.1.1
* MRI 2.1.2
* jruby 1.7.12

Caching is turned on automatically when you use Ruby. To turn it off set:

    cache: false

