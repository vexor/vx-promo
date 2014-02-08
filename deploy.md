---
layout: default
title: Deploy
---

# Deploy

На данные момент есть поддержка деплоя с использованием SSH. К каждому проекту привязан
SSH ключ, который нужно добавить на сервер, на который будет производиться деплой

    curl -s https://ci.example.com/api/projects/1/key.txt \
      >> ~/.ssh/authorized_keys

И добавиь в файл конфигурации билда использование приватного ключа.

    after_script:
      - ssh-add $VX_PRIVATE_KEY
      - bundle exec cap production deploy
