
# rubyliu-cli

#### Description
React develops CLI. At present, there are only two templates, one for developing plugins and the other for developing background management projects.

#### Software Architecture
base of nodejs

#### Installation
`npm install rubyliu-cli -g` 
or
`yarn add rubyliu-cli -g`

#### Instructions
1. Create
`rubyliu create [options] <project-name>`
```
create a new project
Options:
  -f, --force  overwrite target directory if it exist
  -h, --help   display help for command
```
2. Config
`rubyliu config [option] <key> | <value>`
```
Options:
  -g, --get <key>          get value from option
  -s, --set <key> <value>
  -d, --delete <key>       delete option from config
  -l, --list               get all option
  -h, --help               display help for command
```
#### Contribution
1.  Fork the repository
2.  Create feature_xxx branch
3.  Commit your code
4.  Create Pull Request