---
layout: default
title: Puppet And Ansible
---

А контейнерах можно делать интеграционные тесты для provisionning, для этого
нужно использовать образы с предустанной OS в минимальной конфигурации

    images:
      - dmexe/vexor-precise

__Важно__ если будете тестить в ubuntu и собираетесь использовать свои образы
то для коректной работы понадобится запущенный init, пример конфигурации можно посмотреть в
[Dockerfile][dockerfile]

### Puppet

Если используется nodeless конфигурация и hiera, то достаточно будет такого

    env:
      - ROLE=webapp
      - ROLE=balancer
      - ROLE=db

    before_script:
      - sudo apt-get install puppet
      - sudo mkdir -p /etc/facter/facts.d/
      - echo "role: $ROLE" | sudo tee /etc/facter/facts.d/role.yaml

    script:
      - sudo puppet apply --verbose site.pp

Это позволит проверить что как минимум конфигурация разворaчивается без ошибок,
можно для дополнительных проверок использовать [serverspec][serverspec], или
сам puppet:

    $ cat test.pp

    exec { "test -d /etc/application": }
    exec { "nc -z localhost 5432": }

### Ansible

Для ansible все довольно просто

    env:
      - ROLE=webapp
      - ROLE=balancer
      - ROLE=db

    before_script:
      - sudo apt-get install python-software-properties
      - sudo apt-add-repository -y ppa:rquillo/ansible
      - sudo apt-get update
      - sudo apt-get install -qy ansible
      - echo "localhost ansible_connection=local" > hosts

    script:
      - ansible-playbook -i hosts -v -s site.yml

Это позволит проверить что как минимум конфигурация разворaчивается без ошибок,
можно для дополнительных проверок использовать [serverspec][serverspec], или
сам ansible:

    $ cat test.yml

    - shell: test -d /etc/application
    - shell: nc -z localhost 5432

Пример реального теста можно посмотреть в [инсталяторе Vexor CI][install], он сделан для
использования в travis, поэтому все в chroot выполняется, для Vexor CI будет все
проще.


[serverspec]: http://serverspec.org/
[install]: https://github.com/vexor/vx-install/blob/master/.travis.yml
[dockerfile]: https://github.com/vexor/vx-worker/blob/master/docker/Dockerfile
