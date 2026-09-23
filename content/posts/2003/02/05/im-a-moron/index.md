---
title: I’m a moron
authors:
  - name: Kevin
    url: /
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2003-02-06T01:28:57.000Z
metadata:
  categories:
    - Stuff
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=5
  type: wordpress
  url: https://www.kmgerich.com/2003/02/05/im-a-moron/
tags:
  - stuff
---
I’ve been building a new computer over the past few days. I had read [Asa Dotzler’s](http://www.mozillazine.org/weblogs/asa/archives/002232.html) experiences with [Red Hat Linux 8.0](http://www.redhat.com/about/presscenter/2002/press_eightoh.html) and I was looking forward to trying it out myself.

After a little over a year using Mac OS X, my life has been relatively free of compiling drivers and kernels and dependency hell. And wow! The Red Hat install went very quickly and seemed to detect all of my hardware.

The Redhat desktop came up and I tried to play a wav file. Silence. I tried bringing up the Volume app and I saw an error message that complained about a problem with the sound driver. I opened the Sound preferences and it listed my sound card with the correct kernel module loaded, but I heard nothing when I tried to play the sample sound.

So a Google search lead me to a few discussions that suggested the drivers from the [ALSA Project](http://www.alsa-project.org/). Ah! This is the Linux I remember. Configure. Make. Make install. After about 15 minutes I had the ALSA drivers installed, but still no sound. But there were no error messages in /var/log/messages and the volume app worked.

After 20 minutes of combing message boards, checking my modules.conf file, and more dithering, I looked at the back of the machine and noticed that I hadn’t plugged the speakers into the sound card. Oops!
