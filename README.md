My Portfolio

---

# How to configure File Watchers in PhpStorm

- https://www.jetbrains.com/help/phpstorm/minifying-javascript.html


## UglifyJS

- https://github.com/mishoo/UglifyJS2/tree/harmony

```
Settings > Tools > File Watchers > UglifyJS > Edit

Program: uglifyjs
Arguments: $FileName$ -o $FileNameWithoutExtension$.min.js -c -m
Output paths to refresh: $FileNameWithoutExtension$.min.js
```


## CSSO (CSS Optimizer)

- https://github.com/css/csso-cli

```
Settings > Tools > File Watchers > CSSO CSS Optimizer > Edit

Program: csso
Arguments: $FileName$ --output $FileNameWithoutExtension$.min.css
Output paths to refresh: $FileNameWithoutExtension$.min.css
```
