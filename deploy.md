---
layout: default
title: Deploy
---

На данные момент есть поддержка деплоя с использованием SSH. К каждому проекту привязан
SSH ключ, который нужно добавить на серверы, на который будет производиться деплой

    curl -s https://ci.example.com/api/projects/1/key.txt \
      >> ~/.ssh/authorized_keys

Во время выполения билда стартует ssh-agent и добавляется private key,
ваше deploy tool должно быть сконфигурировано так что бы использовать agent forwarding.

Capistrano

    set :ssh_options, { forward_agent: true }

Mina

    set :forward_agent, true

в конфигурации билда нужно добавить запуск деплоя

    after_success:
      - if [ $CI_BRANCH = 'production' ] ; then bundle exec cap production deploy ; fi
