# react-black-triangle

<small>HELLO: react-black-triangle (and [Maxim](https://github.com/jamesknelson/maxim)) are  at v0.1 - if you find this neat, please help me out by indicating where you'd like to see more documentation!</small>

**react-black-triangle provides you with the code and conventions you need to get straight into building your React-based app.** Heres a rundown:

- Your directory structure is sorted as soon as you `git clone`
- ES6 compilation and automatic-reloading development server are all handled by `npm start`
- [Maxim](https://github.com/jamesknelson/maxim) (based on [RxJS](https://github.com/Reactive-Extensions/RxJS)) makes your data flow easy to reason about - Events start at your controls, then flow through your models, reducers, actors, and finally through your components to the user's screen.
- CSS conventions and helper functions *completely eliminate* bugs caused by conflicting styles
- Elegant routing is included *without* depending on the confusing `react-router`
- A simple layout is included to help you get started on the important stuff right away
- Comes with a cool spinning [Black Triangle](http://rampantgames.com/blog/?p=7745) - *how fucking awesome is that?!*

## Getting Started

You only need 2 minutes to get things (literally) moving/spinning/etc. 

### Happiness is six lines away

<small>Prerequisites: note.js and git</small>

```
git clone -o ... repo
cd repo
npm install
npm install -g gulp jest
npm start2
npm run open # (from a different console window, otherwise open localhost:3000)
```

Presto, Black Triangle!

### What to do next

Put your name on it:

- Update name and author in package.json
- Update app title in `src/static/index.html`
- Restart the dev server (make sure to do this after any changes to `src/static`)

Make sure your editor is happy

- Setup ES6 syntax highlighting on extensions `.js` and `.jsx` (see [babel-sublime](https://github.com/babel/babel-sublime))

Remove the stupid black triangle and any references to it:

- `BlackTriangleControl`
- `BlackTriangleModel`
- `AnimatorActor`
- `BlackTrianglePage`

Start building!

- Add a route to `src/utils/router.js`
- Add a nav menu item in `src/components/NavMenu/NavMenu.jsx`
- Add a component for it in `src/components`
- Add the new component and route to `src/components/Application.jsx` and `src/theme/theme.less`
- Bask in the glory of your creation
- Don't forget to commit your changes and push to bitbucket or github!

## Structure

### Model

Your model is managed by [Maxim](https://github.com/jamesknelson/maxim) - which gives you four clear types of modules with well defined responsibilities:

#### Controls

All possible actions which can affect the state of your model are defined in these files.

Each `control` file defines a number of action functions. Action functions can do things which change the outside world (like making HTTP requests or setting timers), and can call other actions in the same control module (as long as the calls are in a separate tick).

Once an action has run any necessary code, it should call `this` to emit an event to be processed by model modules.

#### Models

Models take the [Rx.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) objects from the above action files as inputs. Each model returns a single observable itself, which represents the state of that model.

#### Reducers

Reducers take the Rx.Observable objects produced from models and other reducers, and further process them into more Rx.Observables.

#### Actors

Actors subscribe to the Rx.Observable objects from your Model and Reducer files, using the result to change the outside world through actions such as displaying a UI or calling further control actions.

### View

Of course, having an actor which is called with the latest version of your data is only half the problem - you need to effectively communicate this data to your users. We accomplish this with (surprise!) [React](https://facebook.github.io/react/)!

To help concenctrate on actually building your application, use these conventions when building your user interface:

#### Structure

- `UserInterfaceActor` renders the `Application` component every time any model/reducer data changes
- Components should access control actions through their `this.context.Actions` property (see `BlackTrianglePage.jsx` for an example)
- Data should be passed as props, and *not* passed through `context`.
- Make sure each of your components have their own directory under `src/components` (other than the special `Application`, `Base` and `Link` components).
- Each component should inherit from the Base component (which provides helpers for genrating classes, see `src/components/Base.jsx` for documentation)
- Control Actions are 

#### Style rules

- Each component's root element should have a class named after the component itself
- Each component should accept a `className` prop which adds any specified classes to it's own classes
- Style selectors should always be a single class, and optionally a pseudo-selector. For example:
  
  * `.NavMenu .Link` is bad
  * `.NavMenu-item` is good

  The `this.c` method on every component which inherits from base helps with making these methods.

### Summary

Maxim directories:

- `src/controls` - Each `control` contains actions which can be called by actors
- `src/models` - Each `model` maintains a single value, updating it based on control events 
- `src/reducers` - Further process the values of models and other reducers
- `src/actors` - Interfact with the world based on changes to your model

UI directories:

- `src/components` - React components and their associated stylesheets
- `src/theme` - Global CSS (you generally don't put anything here except imports for component stylesheets)

Other directories:

- `build` - Intermediate files produced by the development server. Don't touch these.
- `src/utils` - Pure functions which you may want to use across your entire project go here

Individual modules (documentation coming soon):

- `src/actors/UserInterfaceActor.jsx`
- `src/components/Application.jsx`
- `src/components/Base.jsx`
- `src/components/Link.jsx`
- `src/controls/NavigationControl.js`
- `src/models/NavigationModel.js`
- `src/static/index.html`
- `src/theme/theme.less`
- `src/utils/router.js`
- `src/main.js`

And other files:

- `gulpfile.babel.js` - Build scripts written with [gulp](http://gulpjs.com/)
- `webpack.config.js` - [Webpack](http://webpack.github.io/) configuration

## TODO

- Watch `static` for changes and copy them across to `build` when appropriate
