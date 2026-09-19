---
title: Thunderbird's Extreme Mac-over
authors:
  - name: Kevin
    url: https://www.kmgerich.com
    avatarUrl: >-
      https://secure.gravatar.com/avatar/c8d6c1963572ac9a476fd65f48ea6f3a1741d7ed3b6520563cf90cb984419f86?s=96&d=mm&r=g
date: 2004-12-09T10:04:00.000Z
metadata:
  categories:
    - Design
    - Icons
    - Thunderbird
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=72
  type: wordpress
  url: https://www.kmgerich.com/2004/12/09/thunderbirds-extreme-mac-over/
tags:
  - design
  - icons
  - thunderbird
---
![Thunderbird theme before and after](before_after-nF5ZbwAueFGc.png)

After the [Pinstripe theme landed in Firebird](http://kmgerich.com/archive/000045.html), icon designer Stephen Horlander and I dove in to a companion [Thunderbird](http://www.mozilla.org/products/thunderbird/) theme. We started in early November 2003 and [finally hit](http://kmgerich.com/archive/000056.html) the “let’s stop fiddling with it and get it out there” phase in March of 2004. I’ve gone through the messages that Stephen and I exchanged during that time and pulled out a few examples of design decisions.  
  
([Jump to comments](#comments))

Because there’s more UI in Thunderbird than Firefox, it’s doubly important to keep the icons simple and minimize the clutter. It’s a neat trick to make a UI get out of the way when there’s so much of it. Did we pull it off? I have a hard time being objective about it.

![Thunderbird toolbar evolution](toolbar_evolution-Vsjj15cHPagm.png)

The colors started out a bit too clowny. Looking back, they seem more appropriate on Windows XP. Thankfully Stephen modified the Junk, Forward and Reply icons to use more subdued colors.

![Send mail icon variations](sent_variations-NAcr4dLjMkhv.png)

Apple’s Mail program features a paper airplane as a Send Mail icon. It’s very well done, but we wanted to avoid cliches and avoid copying Apple’s icons outright. I really liked all of the Send Mail icons that Stephen came up with, but none of the icons made us think “this is it”. The icons with the arrows on them are good, but ideally you want to use the primary elements of the icon to tell its story. We consciously tried not to overuse arrows in the theme. The last three icons were disqualified because the mailboxes might not be international enough. In the end we chose the mail slot and envelope icon and made a note to return to the icon later.

![Thunderbird and Mozilla Suite message lists](message_lists-G7Ogo4SNslmv.png)

Messages in the Mozilla Suite have a 16px icon on the left side of the Subject column which indicates what type of message it is, if it has been read, if it has attachments and more. Since Thunderbird has a separate column to indicate that a message has an attachment, it seemed that all of the things indicated by the Subject bullet icon are redundant. We felt pretty confident that we could drop the Subject bullet icon entirely. Actually, not entirely – one piece of information provided by the Subject bullet wasn’t redundant. We retained the small arrows to indicate if a message was replied to or forwarded.

![Thunderbird delete icon variations](delete_rampage-SmxgBIARpomV.png)

Stephen went on a rampage with this one to find just the right delete icon. I think he got it. There are some excellent ideas here but we went for the familiar circle with a slash.

![Thunderbird folder lists](folder_list-KmCdzMHbzeZc.png)

Here are some variations on the icons in the folder sidebar. Some of the icons are just a touch complex, but we made an effort to use just one element or shape so you wouldn’t need a magnifying glass to understand the icon. Since we tried to minimize the badges that we put on the actual folder and message icons, I played around with using red dots in the background to indicate that you have new messages. In the end we just turned the folder label blue, which in retrospect, may be a bit too subtle.

![Thunderbird mark as read variations](mark_variations-caZVL6iLecNb.png)

Here are some variations on Mark Message as Read. I like the glasses 🙂

![Thunderbird message header](message_header-2QEGyoOr9NL1.png)

Strangely, when Thunderbird displays a message, the headers (From, Subject, etc) are fixed to the top of the pane and do not scroll with the message. [The Bugzilla report on the issue](https://bugzilla.mozilla.org/show_bug.cgi?id=9942) has been open for four years. Let me say that again: FOUR YEARS. Even if there is a good technical reason why this hasn’t been fixed by now, it does make Thunderbird’s UI seem cramped when reading mail in the default 3-pane view. We used a rounded rectangle style with margins that gives the appearance that the header box is inside the message pane. The only problem with this approach is that when a message is too long for the Message Pane, the top of the scrollbars appear to be floating.

At the end this four month process, Stephen and I were pretty sick of the Thunderbird theme. It all seemed to blur together. We’ve updated the theme recently to keep up with the new features that have been added to the program, like Shared Search Folders and RSS feeds. At some point we’ll return to it and try to improve on the design armed with a good dose of perspective and thoughtful feedback.
