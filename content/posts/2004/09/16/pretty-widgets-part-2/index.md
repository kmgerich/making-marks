---
title: Pretty Widgets, Part 2
authors:
  - name: Kevin
    url: https://www.kmgerich.com
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2004-09-17T00:28:45.000Z
metadata:
  categories:
    - Design
    - Firefox
    - Projects
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=63
  type: wordpress
  url: https://www.kmgerich.com/2004/09/16/pretty-widgets-part-2/
tags:
  - design
  - firefox
  - projects
---
![The second version of the pretty-widgets HTML form controls for Mac Firefox](widgets2-Fm7SR2Z4gJkn.png)

Here’s a followup on [my attempt to make the HTML widgets on Mac Firefox presentable](http://kmgerich.com/archive/000069.html). I’ve had to make some compromises here to get the widgets to look nice, for instance I force the background-color and -image on buttons. And text box borders usually use my colors rather than the ones specified by the web page CSS. For these reasons these styles would probably not be acceptable for inclusion in Firefox, but in most cases I’ve found these to be more comfortable than the primitive default widgets.

Instructions: Close Firefox. Right-click on your Firefox application, choose “Show Package Contents”, and then open the Contents > MacOS > res folder. Make a backup copy of your platform-forms.css file. Then copy these files into the res folder:

-   [radio.png](http://kmgerich.com/archive/temp/radio.png)
-   [radio\_checked.png](http://kmgerich.com/archive/temp/radio_checked.png)
-   [checkbox.png](http://kmgerich.com/archive/temp/checkbox.png)
-   [platform-forms.css](http://kmgerich.com/archive/temp/platform-forms.css)

Important: If you followed [my instructions in the previous blog post](http://kmgerich.com/archive/000069.html) to modify your userContent.css file, either delete it or remove my additional code before trying out the new and improved widgets.

A little bug: I’m not sure how I can get rid of the black border around the inside of the selected select box. Please let me know if you have any comments or suggestions for improvements!
