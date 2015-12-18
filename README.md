GitBook Ace Plugin
===

This is a code editor plugin for GitBook, for inserting code segments into the book, with syntax highlight supports for about 110 types of programming languages.

See the plugin at work [here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_ace.html).

## Changelog

* 0.0 Releases:
    * **0.0.5**: Include pull requests from github, fixing scrolling.
    * **0.0.4**: Fixed syntax error in code.
    * **0.0.3**: Added option to disable syntax validation.
    * **0.0.2**: Added .pdf, .epub, .emobi format export support.
    * **0.0.1**: Initial release.

## Syntax

The plugin has a basic syntax:

```
{%ace edit=true, lang='c_cpp'%}
// This is a hello world program for C.
#include <stdio.h>

int main(){
  printf("Hello World!");
  return 1;
}
{%endace%}
```

* ```edit```: if this is set to true, the code will be editable by the user.

* ```lang```: the language for syntax highlight. For the full list of keyword for each language, please check out the github page of ace [here](https://github.com/ajaxorg/ace-builds/tree/master/src-min-noconflict), all the related files are starting with prefix ```mode-```. For instance:
    * mode_c_cpp.js ----> c_cpp
    * mode_java.js ----> java
    * ...

* '''check```: if this is set to false, syntax validation will be disabled.
