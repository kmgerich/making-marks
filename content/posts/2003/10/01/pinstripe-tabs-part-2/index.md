---
title: Pinstripe Tabs, part 2
authors:
  - name: Kevin
    url: https://www.kmgerich.com
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2003-10-02T04:48:13.000Z
metadata:
  categories:
    - Pinstripe Theme
    - Usability
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=34
  type: wordpress
  url: https://www.kmgerich.com/2003/10/01/pinstripe-tabs-part-2/
tags:
  - pinstripe-theme
  - usability
---
This is in response to [Bill McGonigle’s comment](http://kmgerich.com/archive/000026.html) about Pinstripe’s tabs.

Bill says: “I think of Pinstripe as truely Aqua-consistent theme for Mozilla. I place consistency one tiny notch above optimal functionality on the Mac, so I would advocate emulating Jaguar’s tab look and feel.”

Pinstripe aims for Aqua-compliance, but it misses the mark somewhat. And where it misses, it’s due to the limitations of Mozilla’s cross-platform UI…  
  
… For instance, menus and toolbar icons do not take on the Graphite appearance when you choose the Graphite theme. And the menu items don’t flash when you click on them as they would in a native Mac OS X application. That being said, I agree that consistency is a desirable thing – but browser tabs are a special case. They differ from normal tab controls in these ways:

-   You can create and destroy browser tabs. Normal tab controls are static.
-   You can drag things to the tab bar to open a new browser tab.
-   You can right-click on a browser tab and get a context menu. Normal tabs don’t have context menus.
-   You can double-click on the tab bar to open a new browser tab (in Firebird).
-   You can middle-click (in certain cases) to close a browser tab.

All these behaviors add up to a unique widget for viewing documents. I don’t agree that the best way to render these tabs is to draw them as if they were standard Aqua tabs. In fact it is probably contrary to the spirit of the [Aqua User Interface Guidelines](http://developer.apple.com/documentation/UserExperience/Conceptual/AquaHIGuidelines/AHIGDock/index.html) to use the look of a system control.

There’s also another consistency snafu. In Panther, which will be released shortly, the browser tabs which are drawn by the Appearance Manager will be drawn as standard Jaguar tab controls and will not pick up the new Panther tab appearance. This means that Pinstripe will be inconsistent with the Panther UI.

So faced with these factors I think a preferable way to go is to make a browser tab control that has its own look. With Mozilla’s UI, this is pretty easy to do. I don’t want to copy Safari’s tab controls because there may be legal issues there. Also Apple has not indicated that Safari’s browser tab controls are to be used for anything other than Safari. If they do revise the HIG to include Safari’s browser tabs, I’ll probably rework Pinstripe’s tabs to comply with the guidelines.

In the meantime I continue to work on the tabs. I’ve made the curves of the tab match the curves of the window so there is a visual link between the tab and the window title bar. [Here is a screenshot](http://kmgerich.com/archive/tabnew1.png). This is still a work in progress – I think the active tab can be made a little brighter and more translucent. If you have comments, please let me know. Thanks for the well thought out post Bill.
