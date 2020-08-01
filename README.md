# mobile-animation
My studies with React Native reanimated and Gestures Handlers

# Next steps
- Intro to Reanimated and Gesture Handler
- Translate to pt-Br

# Table of contents
1. [Introduction](#introduction)

## Introduction <a name="introduction"></a>
Recently a was making a POC app with react-native, you can check out [here](https://github.com/gustavo-candido/Notas-de-Carrinho)
, and in the middle of the project, I start to notice how bad my animations and gestures responses are. So a make a quick search about smooth apps made with react-native and found a really good [channel](https://www.youtube.com/channel/UC806fwFWpiLQV5y-qifzHnA) about this topic and them I realize how complex doing pro apps with react-native can be.

If you never search about there is no other path instead learn the standard [Animated](https://reactnative.dev/docs/animated) API react-native give us, but before you read the documentation I like to share what I've experienced with this library. Its pretty simple doing stuffs like rotating and translation with Animated but it comes with a huge performance problems and a lot of things I tested does not fell good compared with the apps I've searched.

For we better have a better talk about this topic you should know that react-native have 2 threads, one used for Javascript code and other for UI controlled by the native language of the device, and the nightmare occurs because there is a lot of things that do not run in the UI thread like, guess what, some animations and gestures. This is extremely bad because now things are competing for computational resources with our API calls and render JSX code for example.

React-native try to make a workaround using the "useNativeDriver" property that you can use as a parameter to the common animations functions like timing and spring. I've implemented a simple square moving up and down in [this]() file using the native driver from react-native and to test I also added a "busy" button to block the JS thread the idea its when you pressed the square movement will not be affected.

Looks like we find our way to go but the native driver still very immature, in my use case, for example, you may notice that the square movement stopped when the direction change and this its because we have 2 animations, one for each direction, and I join these animations with the Animated.loop and Animated.sequence functions but seems like these guys also run only with JS thread (please correct me if make something wrong because I want to be).

Not just this example but there its a lot of other limitations with "useNativeDriver" like animated colors, width and height cannot be directly animated and the css scale needs to be used but this may create some quality lost.

At this point I decide does not to focus anymore into Animated and focus my studies with Reanimated and Gestures Handler, two libraries that promise solve these problems using declarative programming.

Unfortunately, I did not found any good and recent free courses with hooks to learn how to use theses libraries unless William Candilion channel but still a little hard to jump into his amazing content because Redash, a boilerplate he created to be more productive, what it's pretty useful but slow down my understanding of how to use the basic feature and later incorporate these shortcuts.

William if one day you read this I like to tell 2 things to you, first, the way you speak it's very sexy haha, the second I really enjoy your work on Youtube and I'm sure you paid content should totally worth the money. If I can give you a tip about how to improve will try to add some small introduction vídeo about how to use  Reanimated and Gestures Handler and them how to speed up the productivity with Redash to be easy to new react-native programmers consume your videos or a road map how you will consume your own videos if you started playing with react native animations now.

So if you read until now welcome to my history trying to run at 60fps with react-native.
