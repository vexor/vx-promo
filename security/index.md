---
layout: page
title: Security
description_key: security
js: landing
sitemap:
  priority: 0.7
  changefreq: never
  lastmod: 2014-11-14T13:45:20+03:00
---

Security
========

We know your code is extremely important to you and your business, and we're
very protective of it.

<br>

Need to report a security vulnerability? Please inform us by sending email to
[support@vexor.io](mailto:support@vexor.io)

## Physical Security

* Data center access limited to data center technicians and approved Vexor staff
* Biometric scanning for controlled data center access
* Security camera monitoring at all data center locations
* 24x7 onsite staff provides additional protection against unauthorized entry
* Unmarked facilities to help maintain low profile
* Physical security audited by an independent firm
* System Security

## System installation using hardened, patched OS

* Dedicated firewall and VPN services to help block unauthorized system access
* Dedicated intrusion detection devices to provide an additional layer of protection against unauthorized system access
* Distributed Denial of Service (DDoS) mitigation services powered by industry-leading solutions


## Operational Security

* Systems access logged and tracked for auditing purposes
* Secure document-destruction policies for all sensitive information
* Fully documented change-management procedures

## Software Security

We employ a team of 24/7/365 server specialists at Vexor to keep our software
and its dependencies up to date eliminating potential security vulnerabilities.
We employ a wide range of monitoring solutions for preventing and eliminating
attacks to the site.

## Communications

All private data exchanged with Vexor is always transmitted over SSL (which is
why your dashboard is served over HTTPS, for instance). All pushing and pulling
of private data is done over SSH authenticated with keys, or over HTTPS using
your Vexor username and password.

## File system and backups

Every piece of hardware we use has an identical copy ready and waiting for an
immediate hot-swap in case of hardware or software failure. Every line of code
we store is saved on a minimum of three different servers, including an
off-site backup just in case a meteor ever hits our data centers (we'll keep
our fingers crossed that doesn't happen). We do not retroactively remove
repositories from backups when deleted by the user, as we may need to restore
the repository for the user if it was removed accidentally.

We do not encrypt repositories on disk because it would not be any more secure:
the website and git back-end would need to decrypt the repositories on demand,
slowing down response times. Any user with shell access to the file system
would have access to the decryption routine, thus negating any security it
provides. Therefore, we focus on making our machines and network as secure as
possible.

## Employee access

No Vexor employees ever access private repositories unless required to for
support reasons. Staff working directly in the file store access the compressed
Git database, your code is never present as plaintext files like it would be in
a local clone. Support staff may sign into your account to access settings
related to your support issue. In rare cases staff may need to pull a clone of
your code, this will only be done with your consent. Support staff does not
have direct access to clone any repository, they will need to temporarily
attach their SSH key to your account to pull a clone. When working a support
issue we do our best to respect your privacy as much as possible, we only
access the files and settings needed to resolve your issue. All cloned
repositories are deleted as soon as the support issue has been resolved.

## Maintaining security

We protect your login from brute force attacks with rate limiting. All
passwords are filtered from all our logs and are one-way encrypted in the
database using bcrypt. Login information is always sent over SSL.

## Credit card safety

When you sign up for a paid account on Vexor, we do not store any of your card
information on our servers. It's handed off to [http://cloudpayments.eu/](http://cloudpayments.eu/), a company dedicated to
storing your sensitive data on PCI-Compliant servers.
