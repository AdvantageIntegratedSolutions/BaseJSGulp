# BaseJSGulp
**QuickBase automatic build system**

## What is gulp?

gulp is a toolkit that will help you automate painful or time-consuming tasks in your development workflow. For web development (if that's your thing) it can help you by doing CSS preprocessing, JS transpiling, minification, live reloading, and much more.

## What is BaseJSGulp?

BaseJSGulp utilizes gulp and its plugins to automate and enhance the development workflow for QuickBase. These automated tasks currently include but are not limited to:
- Automatically execute tasks on change("gulp watch") or by deployment command("gulp deploy").
- Consolidate, namespace and upload files to QuickBase app including the git repo url at the top of each page.
- Compile SCSS to CSS and minify CSS.
- Compile JSX and convert ES6 to ES5.
- Automatically push to git repo.

## Setup
- Clone repo, https://github.com/AdvantageIntegratedSolutions/BaseJSGulp.git
- Fill out app.json.
- run "npm install"
- Run either "gulp deploy" or "gulp watch" to begin automating tasks!!

## How to use?
To use, run the following commands within your app:

- "gulp deploy" - if you want to run your tasks periodically, run "gulp deploy" and it will execute all deployment tasks.

- "gulp watch" - if you want to run your tasks each time you make a change to your app, run "gulp watch" in your terminal and it will execute all deployment tasks as you work in your app.
