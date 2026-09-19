---
title: Pretty Widgets, Part 3
authors:
  - name: Kevin
    url: https://www.kmgerich.com
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2005-01-24T06:57:05.000Z
metadata:
  categories:
    - Design
    - Firefox
    - Projects
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=74
  type: wordpress
  url: https://www.kmgerich.com/2005/01/23/pretty-widgets-part-3/
tags:
  - design
  - firefox
  - projects
---
![widgets-three.png](widgets-three-fRB2vhIaE54T.png)This is a third try at making Mac Firefox’s primitive-looking HTML widgets work with the design of Pinstripe. This time I took care to make the styles play well with others. For instance these styles won’t override CSS set by a web page in most cases.  
  
You’ll note that the styles have moved into forms.css from platform-forms.css. That’s because platform-forms.css doesn’t seem to exist in recent trunk builds of Firefox. If you’ve used a previous version of these widgets, you should remove them before you apply these files or start with a fresh new copy of Firefox.

There are bugs here, the most prominent is the inside of the URLbar that gets a focus ring when it’s not supposed to. Any ideas? I hope you’ll help me test these styles and let me know of any bugs.

Instructions: Download this file: [firefox-widgets3.zip (13k)](http://kmgerich.com/archive/firefox-widgets3.zip) and unzip it. Close Firefox. Right-click on your Firefox application, choose “Show Package Contents”, and open the Contents > MacOS > res folder. BACKUP YOUR FORMS.CSS file. Then copy the unzipped files in, overwriting the forms.css file as you do so.

Note: This was designed to work on the recent Firefox trunk builds. It may work on older versions of Firefox, but there may be additional bugs. If you want to use these widgets on Firefox 1.0, try out [Firefoxy](http://homepage.mac.com/amake/software/firefoxy.html).

Thanks to Amake for [Firefoxy, the fancy widget applicator](http://homepage.mac.com/amake/software/firefoxy.html), and [Garett LeSage](http://linuxart.com/log/archives/2004/09/22/firefox-forms-work-in-progress/), [Kaz](http://pbx.homeunix.org/tpj/jam_log/article.php?id=418), and [NAKAJIMA Hiroki](http://homepage.mac.com/travellers/software/Firefox/aquafirefox_en.html), who expanded on my earlier widget styles.
