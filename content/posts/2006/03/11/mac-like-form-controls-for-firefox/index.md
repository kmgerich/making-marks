---
title: Mac-like Form Controls for Firefox
authors:
  - name: Kevin
    url: /
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2006-03-12T08:34:15.000Z
metadata:
  categories:
    - Design
    - Firefox
  uuid: >-
    11ty/import::wordpress::http://kmgerich.com/2006/03/11/mac-like-form-controls-for-firefox/
  type: wordpress
  url: https://www.kmgerich.com/2006/03/11/mac-like-form-controls-for-firefox/
tags:
  - design
  - firefox
---
![select controls with various CSS rules applied](/archive/images/select-variations.png)The Mac-like form controls seen in Safari and Camino look nice, but tend to ignore CSS styling. I wanted to see if I could bring more flexible form widget styles to Firefox, while staying close to a native look as seen in [Camino](http://www.caminobrowser.org).

Single select boxes were the most problematic. How do you fuse the aqua pill-like control with a CSS background or border color? I think the answer is: You don’t. I decided to abandon Aqua for my own hand-rolled look which hopefully is Mac-like enough to blend with the other controls, but flexible enough to look good when CSS styles are applied.

The look for the select box is created with semi-transparent PNG images that allow the background color to show through. You’ll notice the widget also respects your choice of either the Blue or Graphite OS theme. [Here’s a build](http://kmgerich.com/downloads/ff-kmgerich-2006-03-11.dmg.gz) off the Firefox 1.8 branch with the new Mac widget styles. Check it out and let me know what you think.

Download: [ff-kmgerich-2006-03-11.dmg.gz, 9 MB](http://kmgerich.com/downloads/ff-kmgerich-2006-03-11.dmg.gz)

If you want a less experimental build of Firefox with native looking form widgets, check out [Neil Lee’s G4 and G5 optimized builds](http://www.beatnikpad.com/archives/2006/02/02/firefox1501).
