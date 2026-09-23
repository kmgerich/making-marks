---
title: 'The Browser, Redesigned: Take Two (or 0.2)'
authors:
  - name: stephen
    url: /
    avatarUrl: https://secure.gravatar.com/avatar/?s=96&d=mm&r=g
date: 2004-06-28T10:33:54.000Z
metadata:
  categories:
    - Design
    - Firefox
    - Icons
  uuid: 11ty/import::wordpress::http://kmgerich.com/journal/?p=58
  type: wordpress
  url: https://www.kmgerich.com/2004/06/28/the-browser-redesigned-take-two-or-02/
tags:
  - design
  - firefox
  - icons
---
   
![winstripe 0.2 toolbar](winstripe_0_2_toolbar-ku911Q1OYBtj.png)

\[ This post is by Stephen Horlander, the designer behind the majority of the Firefox icons. – Kevin \]

After the release of “Winstripe” into the wild there was a large and varied response. Ranging from mindless petulant rants and demands, to well thought out critiques. Lets just say there were more of the former than the latter. Even before it’s inclusion in Firefox I was personally less than thrilled about how it turned out. The idea, as you may have read, was to take the icons from Pinstripe and make them fit into a Windows environment. The theory was sound as the icon concepts used in Pinstripe were, I feel, fairly strong. Due to time constraints and my own admittedly limited familiarity with more recent incarnations of Windows I think they failed on this count. They do however work well enough and are a good deal better than most of the icons used by many Windows applications, in my biased opinion anyway : )

Even without the harsh criticism, most of which I disregarded anyway do to the immature way in which it was conveyed, I still felt that the icons missed the mark. They needed work, but we needed them now, so what we had we went with. Seeing as how Firefox is a product in heavy development I don’t see the problem with developing the visual identity as well as the code in tandem. It is a mystery to me why people expect something to stay the same throughout it’s entire development, that is the risk of early adoption. If you can’t take drastic changes in a prerelease product, I would recommend you stay away until it is “finished”. Unless of course you just don’t have a life and you like to bitch about things, then prerelease products are for you.

#### A new direction

After I had time to digest the more intelligent criticism I sat down with my recently obtained Windows machine and thought seriously about what needed to be done. I decided that “Winstripe” needs to be attractive, be consistent within itself first, still fit in with Windows and have it’s own distinct look. Being attractive may be the easy part as well as consistent. The hard part is getting it to fit into Windows and be attractive at the same time, while still maintaining it’s own look. I personally don’t like the too cartoony looks of XP, that is something I would like to avoid. I started with the five main navigation buttons since they were the most noticeable and by default the only icons shown. Several things needed to change:

-   They needed to be larger. They now fill almost the whole 24×24 space including shadow. This is inline with Microsoft’s toolbar icons and it makes them much nicer to look at. The small icons also make more efficient use of space.
-   Moved development to Illustrator for a smoother (I think fuzzier) XP look. Initially I did them strictly in Photoshop because Illustrator tends to give exported bitmaps a fuzzy look. I was using Paths in Photoshop, but it is still sharper. A lot of people tend to use vector artworks smooth resizing abilities as kind of a crutch I think, ending up with vague smeary icons, especially at smaller sizes. I settled for a compromise between a lot of tweaking to get a more crisp look, and the ability to resize later. There are other problems with getting cartoony designed icons to scale well, but its a trade off to get a more XP consistent look.

![home scaled (image no longer available)](/media/placeholder-missing.png)

-   Made them bolder and have more depth. More severe gradients, darker and softer outlines, and drop shadows. They are slightly more bold than anything found in Windows by default, but this is where “distinct style” comes into play. I even have subtle highlights on some of the icons. Not traditionally Windows, but I have seen it done and nothing forbids it. It also gives them a more solid look I think.
-   “Fixed” the **Reload** icon to be much more dynamic, and rounder 😉 Since very few people like that icon apparently.
-   Added 3D perspective to the home icon that really makes it feel more XPish. Also changed the color to be more inviting and less fake(not purple).
-   Made the disabled states transparent. Looks 200% better in Classic mode. Especially Classic mode with darker or colored backgrounds.
-   Also made new and consistent buttons for the Extension manager

#### The end destination

I feel much better about these icons than the ones initially included with Winstripe. This is the direction the rest of the icons will be going over the next few weeks when I can find the time. There is a lot of misinformation floating around about the goals of this theme change, a lot of people seem to think that we are focusing purely on a cross platform look. That is not the case. A lot of the concepts used in the Mac version of the theme can be used in the Windows or Linux versions, and vice-versa. The style will have to be applied to fit in with each platform, and some concepts just won’t make the transition. Giving a better user experience for each platform is a more important goal than anything else, and it always has been. Cross-platform consistency is secondary goal that can and will be sacrificed for that.

If people don’t like the new icons, that is fine, feel free to hate them. I know that you can’t please everyone, and if you try you will not please anyone. The real goal here is to make something that is distinctly Firefox. The functions of the icons should be clear even to the new user, which is why I am going to try and avoid too many elements in one icon wherever possible. A lot of things are going to change, so if you are one of the above mentioned users, prepare to whine 😉

#### Common problems

I have seen several comments regarding the icon spacing being too large. I have to assume most, if not all, of these users are using a pre-XP version of Windows, or Windows XP with the Classic style. The problem is that the spacing in Luna is much larger than Classic. Windows adjusts this on the fly for native toolbars, our toolbar spacing is defined in the CSS. That is something that does not change wether you are using Luna or Classic. So we can leave it large or make it smaller, but I can’t make it so that it is dynamic in regards to Windows theme changes. Sorry.

If there are any more theme related bugs let us know. I don’t mean stylistic problems, I mean usability problems directly related to the theme CSS. Thanks
