## Simple Project Code Statistics
While developing in nodejs I usually need to import a lot of 3part library to make things work which not written by myself, 
for me it's hard to see how much code exactlly I write for the project.
when I write java in IDE like eclipse etc, I used to search '\n' globally in specified direcotries to get rough impression about scale of code line numbers,
It works well in nodejs too, but it seems a little annoying and stupid to open the search-dialog to run fixed command everytime just want to know coding line nums...
So I write this tool for my tiny project, it's not perfect, not very fit industry, but useful for me.

### Install
 npm install simple-code-statics

### Usage

- configure the static.cfg.json
- run command node statics.js
- Woo get a log named like '2015-7-12_statics.log' contains each file's line num and total line num which specified in static.cfg.json file
