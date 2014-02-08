---
layout: default
title: How to install
---

# How to install

## Требования

Для работы нужно будет минимум 2 (лучше конечно 3) сервера c Ubutnu 12.04 или 13.10,
x64 обязательно, на серверах будут размещены:

* Web application
* Worker
* Rabbitmq

Если очень нужно web appalication и rabbitmq можно совместить на одной машине.

На машине с воркером ядро должно быть минимум 3.8 версии, а лучше выше. Проверить
можно командой _uname -r_, и в случае необходимости обновить командой
_sudo apt-get install linux-generic-lts-saucy_.

Уставновка будет происходить в автоматическом режиме, поэтому для ее работы на
всех серверах необходим настроенные _sudo_ без пароля, проверить можно командой
_sudo -u root id_, если будет просить пароль, добавить в /etc/sudoers
_ALL=(ALL:ALL) NOPASSWD:ALL_ для пользователя или группы.

<div class="sep"></div>

## Перед началом установки

Если вы намериваетесь использовать Github, то нужно [создать][app] приложение

* __Application name__ любое
* __Homepage URL__ адрес вашего сервера
* __Authorization callback URL__ http[s]://адрес.вашего.сервера/auth/github/callback

Если нужен будет Gitlab, то ничего делать не надо, понадобится только его адрес.

<div class="sep"></div>

## Установка

Для установки используется [ansible][ansible], поэтому он должен быть на машине
с которой будете ее запускать.

OSX

    brew install ansible

Ubuntu

    apt-add-repository ppa:rquillo/ansible
    sudo apt-get update
    sudo apt-get install ansible

Остальным посмотреть [официальный гайд][ansible-install] по установке

Дальше нужно склонировать репу с установщиком

    git clone https://github.com/vexor/vx-install.git
    cd vx-install
    cp inventory/production.example inventory/production

И отредактировать файл конфигурации _inventory/production_

    [vexor-mq]
    # адрес rabbitmq сервера
    mq0.example.com

    [vexor-web]
    # адрес web application
    ci.example.com

    [vexor-worker]
    # адрес сервера с воркером
    worker0.example.com

    [vexor:children]
    vexor-mq
    vexor-web
    vexor-worker

    [vexor:vars]

    # Тут непосредственно конфигурация

    # Имя юзера под которым будем конектиться
    ansible_ssh_user=ubuntu

    # Ключ и секрет от github application, если github
    # не будет использоваться то можно все 3 строки неже удалить
    github_key=<YOU GITHUB KEY>
    github_secret=<YOU GITHUB SECRET>

    # Разрешит логин только пользователям состоящим в
    # указанной организации
    github_restriction=<YOU ORGANIZATION NAME>

    # Для Gitlab нужно просто указать адреса серверов через запятую
    gitlab_url=http://demo.gitlab.com,gitlab.example.com

    # На всякий случай имя сервера с web application,
    # будет использоваться в web hooks
    vx_web_hostname=ci.example.com

    # Сколько процессов web application запускать,
    # по умолчанию равно количеству процессоров
    vx_web_num_workers=8

    # Сколько потоков с воркерами будет работать,
    # по умолчанию равно количеству процессоров
    vx_worker_num_workers=3

    # Можно переопределить docker image используемый по умолчанию
    vx_worker_docker_image: "dmexe/precise-full"

После этого можно запускать

    ./play production

Дальше нужно зайти на машину(ы) c воркерами и вручную скачать docker image,
который используется по умолчанию для работы, его размер около 4 gb, поэтому
скачивание займет некоторое время.

    docker pull dmexe/vexor-precise-full

Поздравляем, квест пройден!


<div class="sep"></div>

## Что будет установлено на серверы

Web application

* Ruby в /opt/vexor/ruby
* Приложение в /opt/vexor/web/current
* postgresql 9.1
* memcached

Worker

* Ruby в /opt/vexor/ruby
* Приложение в /opt/vexor/worker/current
* docker

Rabbitmq

* rabbitmq и erlang


[app]: https://github.com/settings/applications
[ansible]: http://www.ansible.com/home
[ansible-install]: http://docs.ansible.com/intro_installation.html
