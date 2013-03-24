


simpleWaterfall: $(selector).simplewf();
==========

Lightweight and simple jquery plugin that enable a waterfall on elements within a container.


## Usage

Let's suppose this is our container that have `container` as id: 
```html
<div id="container">
	<div id='itm1'></div>
	<div id='itm2'></div>
	<div id='itm3'></div>
</div>
```

It's easy and simple to apply the simpleWaterfall :  if the is visible on the screen use `$("#element").inViewport();` : 
```html
<script>
$(function () {
	$('#container').simplewf();
});
</script>
```

## Methods

Simplewf instance is stored in `simplewf` data-attribute of jQuery.
```javascript
$('#container').simplewf();
var simplewf = $('#container').data('simplewf');
```

#### `simplewf.reflow()` 
Recounts needed number of columns, redistributes items. Optimized for speed, so it takes minimal possible calcs.
There’s a sense to call `simplewf.reflow()` if resize happened.

#### `simplewf.add(item)` 
Appends new item or bunch of items to layout.
Simplewf will take care of optimal placing and appending.

```javascript
simplewf.add($('<div class="itm">test</div>')); 	//one item
simplewf.add($('<div class="itm">test1</div><div class="itm">test2</div>')); //few items
```

#### `simplewf.addAjax(obj)` 
Gets html code throught an ajax request to appends this or these new elements to layout. 

```javascript

 var obj = {
		url:"exemple.php?action=getelements", // url to get the items from these should be html elements
		before:function () {
	       	//code executed before filling elements to the simplewf
	    },
	    after:function () {
		    //code execute after filling elements to the simplewf
	    }
	};
simplewf.addAjax(obj); 

```

## Properties

#### `colMinWidth`
Minimal width of column, in px. If column width is below `colMinWidth`, number of columns will be recalculated.


### Item properties
Also you can set an options straight on items to fix exact column to place the item into. For example, this may happens if you want to point exact column for element, whether it is menu or something else:
```html
<div id="container" data-col-min-width="320" >
	<div class="itm" data-column="first">Item 1</div>
	<div class="itm" data-column="last">Item 2</div>
	<div class="itm" data-column="2">Item 3</div>
</div>
```

## Require

```html
<script src="js/jquery.js"></script>
<script src="js/simplewf.min.js"></script>
```

