---
layout: default
title: Puppet And Ansible
---

Integration tests of provisioning may be run in containers. To do it, you'll need
the minimal images of a preinstalled OS.

    images:
      - dmexe/vexor-precise

__NB:__ if you are going to test Ubuntu in your own images, you should setup your init correctly.
See examples in [bash.sh][base.sh]

### Puppet

The following will be enough if you use nodeless configuration and hiera.

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

The following will help to check that your configuration at least doesn't have errors.
Use [serverspec][serverspec] or puppet for further checking.

    $ cat test.pp

    exec { "test -d /etc/application": }
    exec { "nc -z localhost 5432": }

### Ansible

Ansible way is quite simple:

    env:
      - ROLE=webapp
      - ROLE=balancer
      - ROLE=db

    before_script:
      - sudo apt-get install python-software-properties
      - sudo apt-add-repository -y ppa:rquillo/ansible
      - sudo apt-get update
      - sudo apt-get install -qy ansible

    script:
      - ansible-playbook -i localhost, -c local -v -s site.yml

This lets you check if the configuration is being deployed without errors. For
further checking use [serverspec][serverspec] or ansible itself.

    $ cat test.yml

    - shell: test -d /etc/application
    - shell: nc -z localhost 5432

The example of a real test may be found in [Vexor CI installer][install]. It was made for use with Travis so
everything there is done in chroot; Vexor CI itself does things much simpler.

[serverspec]: http://serverspec.org/
[install]: https://github.com/vexor/vx-install/blob/master/.travis.yml
[base.sh]: https://github.com/vexor/vx-docker-image/blob/master/script/base.sh
