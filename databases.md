---
layout: default
title: Databases
---

# Databases

### Postgresql

Установлена версия 9.3 и пакет contrib, запускается автоматически, для доступа
нужно сипользовать логин postgres без пароля

    psql -U postgres -c "create database test;"


### Mysql

Установлена версия 5.5, запускается автоматически для доступа нужно использовать
логин root без пароля

    mysql -u root -e "create database test"

### Redis

Установлена версия 2.8.5, запускается автоматически

### Rabbitmq

Установлена версия 3.2.3, для запуска нужно указать

    services:
      - rabbitmq

### Elasticsearch

Установленна версия 0.90.10, для запуска нужно указать

    services:
      - elasticsearch
