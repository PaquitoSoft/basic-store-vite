# Basic eCommerce store

This is a very simplistic React web application with only two views:

* Products listing
* Shop Cart

The goal of this project is to showcase different ways of handling shared state across the application, in this case it's the shop cart information.

The project has three branches:

* **main**: state is managed with [React Context](https://react.dev/learn/passing-data-deeply-with-context)
* **zustand**: state is managed using the [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) library
* **signals**: state is managed using [Preact](https://preactjs.com/) (small React compatible library) [Signals](https://preactjs.com/guide/v10/signals)
