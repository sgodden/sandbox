dbootstrap seems to go wrong if you minify it.  If found that I needed
to build it like so for it to work:

cssOptimize: 'comments',
    mini: true,
    //optimize: 'closure',
    layerOptimize: false,
    //stripConsole: 'all',
