/* @author Xakiru */
/* @tool simpleWaterfall-1.0 */

(function ($){
	var simpleWaterfall = function (el, opts){
		this.element = $(el);
		this._init(opts)
	}

	$.extend(simpleWaterfall.prototype, {
		options: {
			colMinWidth: 100,
		},

		reflow: function () {
			var self = this, o = self.options;

			var neededCols = ~~(($(window).width()) / o.colMinWidth) || 1;
			if (neededCols == self.container.children().length) return;
			self.items.detach();
			self._ensureColumns(neededCols)._refill();
			return self;
		},

		//Inserts new item(s)
		add: function (itemSet) {
			var self = this, o = self.options, cols = self.container.children();
			itemSet.each(function (i, el) {
				var $item = $(el);
				self._getMinCol(cols).append($item);
			})
			self.items = self.items.add(itemSet);
			return self;
		},

		addAjax: function(aps){
			var self = this;
			$.ajax({
                url: aps.url,
                beforeSend: aps.before,
                success: function (p) {
                    p=p.replace(/	/g," ");
                	p=p.replace(/'|"/g,"\'");
                	p=p.replace(/\r|\n/g,"");
                	p=p.replace(/^\s+|\s+$/g,'');
					self.add($(p)); 
					aps.after();
				}
            })
		},

		_init: function (opts) {
			var self = this,
			o = self.options = $.extend({}, self.options, opts);
			self.container = self.element;
			self.items = self.container.children();
			self.items.each(function(){
				if(!$(this).has("simplewf-item")){$(this).addClass("simplewf-item")};
			}) 
			self.items.detach();
			o.colMinWidth = parseInt(self.items.css("min-width")) || o.colMinWidth;
			self.reflow();
		},

		//ensures only number of columns exist
		_ensureColumns: function (num) {
			var self = this, o = self.options
				num = num || 1,
				columns = self.container.children();

			if (columns.length < num) {
				for (var i = 0; i < num - columns.length; i++ ){
					self.container.append(self._columnTpl());
				}
			} else if ( columns.length > num) {
				columns.slice(- columns.length + num).remove();
			}

			columns = self.container.children();
			columns.css({
				"width": ~~(100 / columns.length) +"%",
				"display": "inline-block",
				"vertical-align": "top"
			})
			return self;
		},

		_columnTpl: function () {
			return '<div class="simplewf-column"></div>';
		},

		//Redistributes items by columns
		_refill: function () {
			var self = this, o = self.options;

			//for each item place it correctly
			self.items.each(function (i, el) {
				var col = el.getAttribute("data-column")
				if (col){
					switch(col){
						case "left":
						case "first":
							self.container.children().first().append($(el))
							break;
						case "right":
						case "last":
							self.container.children().last().append($(el))
							break;
						default:
							self.container.children().eq(Math.min(col, self.container.children().length)).append($(el))
					}
				} else {
					self._getMinCol(self.container.children()).append($(el));
				}
			})

			return self;
		},

		//returns column with minimal height
		_getMinCol: function (cols) {
			var minH = Infinity, minCol = cols.first(), minColNum = 0;

			//fill min heights
			cols.each(function (colNum, col){
				var $col = $(col);

				var h = $col.height();
				if (h < minH) {
					minH = h;
					minColNum = colNum;
				}
			});

			return cols.eq(minColNum);
		},
	})


	$.fn.simplewf = function (opts) {
		return $(this).each(function (i, el) {
			if (!$(el).data("simplewf")) $(el).data("simplewf", new simpleWaterfall(el, opts));
		})
	}

	$(function () {
		$(".simplewf-item").each(function (i, e){
				var $e = $(e),
					initObj = {}
				if ($e.data("colMinWidth") != undefined) {
					initObj.colMinWidth = $e.data("colMinWidth")
				}
				if ($e.data("defaultContainerWidth") != undefined) {
					initObj.defaultContainerWidth = $e.data("defaultContainerWidth")
				}
				$e.simplewf(initObj);
			});
		});
})(jQuery)