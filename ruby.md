---
layout: default
title: Ruby
---

To run Ruby apps just issue:

    language: ruby

MRI 1.9.3 is used by default. The default setup runs: 

    rbenv shell 1.9.3
    bundle install
    bundle exec rake

If you wish to use different Ruby versions list them in `rvm` key. The following are available in dmexe/vexor-precise-full:

* MRI 1.9.3-p484
* MRI 2.0.0-p353
* MRI 2.1.0
* jruby 1.7.9

Caching is turned on automatically when you use Ruby. To turn it off set:

    cache: false
