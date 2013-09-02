dbootstrap seems to go wrong if you minify it.  If found that I needed
to build it like so for it to work:

cssOptimize: 'comments',
    mini: true,
    //optimize: 'closure',
    layerOptimize: false,
    //stripConsole: 'all',

versions:
  dgrid: 0.3.8
  dojo/dijit/dojox: 1.9.1
  less: 1.3.3 - is this right?
  nib: 0.8.1
  put-selector: 0.3.4
  xstyle: 0.1.2
  
