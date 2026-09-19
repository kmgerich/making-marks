---
title: 'Closing in on Firefox 1.0: the Mac user experience'
authors:
  - name: Kevin
    url: https://www.kmgerich.com
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2004-06-24T21:33:31.000Z
metadata:
  categories:
    - Stuff
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=57
  type: wordpress
  url: >-
    https://www.kmgerich.com/2004/06/24/closing-in-on-firefox-10-the-mac-user-experience/
tags:
  - stuff
---
Now that the dust is settling from the 0.9 release, I thought I’d turn my attention to the Mac Firefox experience and what I think needs to happen to make 1.0 great. Firefox’s UI is “good enough” for day to day use, but there are some not so subtle rough edges that make Mac Firefox user experience less than stellar. Here’s a list with some thoughts. The ones on the top are very important in my opinion. The ones near the bottom will probably be random gibbering 🙂  

### Natively-drawn widgets

This may take a lot of work, but [native look and feel are critical for usability](http://ocallahan.org/mozilla/why-no-native-widgets.html). Camino uses Mac OS X to draw its widgets. The code seems to be there.

### Make the Customize Toolbar dialog work as expected

When you click “Customize…” in the menu, the customization dialog rolls open, pinned to the top left of the screen. You have to reposition the dialog to drag icons back and forth from the toolbars. This is not how a Mac customize toolbar dialog should work. [Bug 206649](http://bugzilla.mozilla.org/show_bug.cgi?id=206649).

### Disable menus when certain dialogs are open

The Find dialog, Download dialog, Extension Manager, Theme Manager, all have active menu items “File, Edit, etc..” when the dialogs are shown, but if you choose any of those menu items, nothing happens. The menus items should work or be the whole menu bar should be disabled. The best solution would be to go through the menu and determine which items should be disabled when the dialogs are up. For instance, if the Download dialog is open, it makes sense that File > New Window should be enabled but File > New Tab should not. See Bug [227774](http://bugzilla.mozilla.org/show_bug.cgi?id=227774).

### Sort out modal versus non-modal dialogs

The Add Bookmark dialog should be modal. The About and Preferences dialogs should not. Particularly in the Preferences dialog, nested sheets are pretty ugly. When you click on the “View Saved Passwords…” button in Preferences, the whole Preferences dialog rolls up and disappears then the Passwords dialog rolls open. when you finish with the Passwords dialog, it rolls up and then the Prefs dialog rolls out again. Ick. See Bugs [222364](http://bugzilla.mozilla.org/show_bug.cgi?id=222364), [228165](http://bugzilla.mozilla.org/show_bug.cgi?id=228165), [206649](http://bugzilla.mozilla.org/show_bug.cgi?id=206649).

### Make sure that new browser windows always fit on the screen

[bug 218214](http://bugzilla.mozilla.org/show_bug.cgi?id=218214).

### Re-orient Preferences window toolbar

The Preferences dialog is based on a Windows design with a vertical group of icons on the left side for changing panes. The redesigned dialog should have a toolbar across the top. [Bug 222686](http://bugzilla.mozilla.org/show_bug.cgi?id=222686).

### Use native OS X menus instead of XUL popups

I know this one may not be realistic, but native menus would improve the user experience just as the implementation of native scrollbars have. The menus that we have now try to fake a Mac look, but they don’t have the subtle transparency of the real thing and they don’t change colors when you change the system theme.

I’m sure you can help me fill out this list, so please leave a comment 🙂 By the way, theme/icon changes are easy and incremental changes are in the works. This post deals with UI issues outside of themes.
