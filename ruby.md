---
layout: default
title: Ruby
---

# Ruby

Для запуска приложений написанных на ruby, достаточно просто указать

    language: ruby

Будет использовать по умолчанию MRI 1.9.3, и выполнены команды

    rbenv shell 1.9.3
    bundle install
    bundle exec rake

Для тестирования не нескольких версиях, в ключе rvm нужно их перечислить,
в образе dmexe/vexor-precise-full  доступны:

* MRI 1.9.3-p484
* MRI 2.0.0-p353
* MRI 2.1.0
* jruby 1.7.9

Для руби автоматически включается кэширование, выключить его можно указав

    cache: false
