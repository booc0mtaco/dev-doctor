# dev-doctor

`dev-doctor` is a framework for adding in developer environment checks to your project. Similar to what
you might find with other popular projects (e.g., [homebrew](https://brew.sh)'s `brew doctor`, or [NPM](https://www.npmjs.com)'s `npm doctor`), this helps set up common checks in your project, and provide a
facility to add in custom checks with logic, expectations, and status message. 

Script can be configured to run as part of the project's config via package.json, or installed globally
(where it will use the doctor config file in the current directory).

This helps with engineer troubleshooting, allowing teams to commit a list of common problems and fixes,
and avoid storing such solutions in communications tools like Slack messages, Wiki pages, or other 
documents which are disconnected from the code.

## Installation

To install globally:

```sh
$ npm install -g dev-doctor
```

To add as a development dependency:

```sh
$ npm install dev-doctor --save-dev
```

When installed as a dependency, you can add an entry in `"scripts"` to run the command (using any
desired options).

## Usage

By default, the tool will not do any checks, so it always succeed.

```sh
$ npm run dev-doctor

✅ OK (0/0 checks passed)
```

Configure the tool by specifying checks with options for your project in dev-doctor.config.js

There are several types of checks that come pre-packaged with the tool:

| Type      | Description                                                  | Configuration     |
|-----------|--------------------------------------------------------------|-------------------|
| `exist`   | Check to use when if a directory or file is present          | `glob`            |
| `cmd`     | Check to see if a command can be run successfully            | `exec`            |
| `version` | Check the version of a given command, specifying a range     | `exec`, `range`   |
| `os`      | Check various aspects of the current OS (e.g., version)      | `aspect`, `range` |

All check types allow for a hint on what to do if the check fails, a status message for when the
check is being run, and an option to skip if the command is presently disabled.

### Examples

TBD

- Example config for each type
- Example of output when it passes or when it fails

```js
module.exports = [
{
    type: "exist",
    glob: "**/*/test.js
},
{
    type: "cmd",
    exec: "path/to/executable",
},
{
    type: "version",
    exec: "path/to/executable -v",
    range: "<1.0.0", // using semver range patterns
}
];
```

## Adding custom commands

You can define your own rules that check other things which should be set up in the dev environment.

**TBD**

## Plugins

Use others' configurations in your application, or share custom checks between projects within your 
organization.

**TBD**
