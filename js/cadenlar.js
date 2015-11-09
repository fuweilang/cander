Cadenlar = (function() {

  function Cadenlar(opts) {
    this.cadenlarContainer = opts.cadenlarContainer;
    this.input = opts.input;
    this.html = this.getHtml();
    this.cadenlarContainer.html('').html(this.html);
    this.onRender()
  }

  Cadenlar.prototype.getHtml = function() {
    var html;
    html = "<div class='cadenlar'> <div class='head'> <div class='prevbtn' id='prevbtn'> <a><span></span></a> </div> <div class='title' id='title'></div> <div class='nextbtn' id='nextbtn'> <a><span></span></a> </div> </div> <div class='week'> <ul> <li>日</li> <li>一</li> <li>二</li> <li>三</li> <li>四</li> <li>五</li> <li>六</li> </ul> </div> <div class='body'> <ul id='datearea' class='clearfix'> </ul> </div> </div>";
    return html;
  };

  Cadenlar.prototype.nextorprevFn = function(year, month, date, bool) {
    var _this, amount, curmonthhtml, dom, i, index, j, k, l, lastdate, lihtml, nextlength, nextmonthhtml, obj, prevamount, previndex, prevlastdate, prevmonthhtml, ref, ref1, ref2, ref3, temp, title, todayindex;
    _this = this;
    obj = new Date(year, month, date);
    obj.setDate(1);
    if (bool === true) {
      obj.setMonth(obj.getMonth() + 1);
    } else if (bool === false) {
      obj.setMonth(obj.getMonth() - 1);
    }
    year = obj.getFullYear();
    month = obj.getMonth();
    lastdate = new Date(year, month + 1, 0);
    amount = lastdate.getDate();
    index = obj.getDay();
    if (index === 0) {
      index = 7;
    }
    temp = index;
    curmonthhtml = "";
    for (i = j = 1, ref = amount; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      curmonthhtml += "<li class='cur'>" + i + "</li>";
    }
    _this.renderyear = obj.getFullYear();
    _this.rendermonth = obj.getMonth();
    _this.renderdate = obj.getDate();
    title = _this.renderyear + '年' + (_this.rendermonth + 1) + '月';
    nextlength = 42 - temp - amount;
    nextmonthhtml = "";
    for (i = k = 1, ref1 = nextlength; 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
      nextmonthhtml += "<li class='next'>" + i + "</li>";
    }
    obj.setMonth(obj.getMonth() - 1);
    prevlastdate = new Date(obj.getFullYear(), obj.getMonth() + 1, 0);
    prevamount = prevlastdate.getDate();
    previndex = prevamount - temp + 1;
    prevmonthhtml = "";
    for (i = l = ref2 = previndex, ref3 = prevamount; ref2 <= ref3 ? l <= ref3 : l >= ref3; i = ref2 <= ref3 ? ++l : --l) {
      prevmonthhtml += "<li class='prev'>" + i + "</li>";
    }
    lihtml = prevmonthhtml + curmonthhtml + nextmonthhtml;
    if (_this.renderyear === _this.nowyear && _this.rendermonth === _this.nowmonth) {
      todayindex = temp + _this.todaydate - 1;
      dom = document.createElement('div');
      dom.innerHTML = lihtml;
      $(dom).find('li').eq(todayindex)[0].className = 'today';
      lihtml = dom.innerHTML;
      dom = null;
    }
    this.title.html(title);
    return this.datearea.html(lihtml);
  };

  Cadenlar.prototype.onRender = function() {
    var _this, value;
    _this = this;
    this.cadenlar = this.cadenlarContainer.find('.cadenlar');
    this.title = this.cadenlar.find('#title');
    this.datearea = this.cadenlar.find('#datearea');
    this.prevbtn = this.cadenlar.find('.prevbtn');
    this.nextbtn = this.cadenlar.find('.nextbtn');
    this.now = new Date();
    this.todaydate = this.now.getDate();
    this.nowyear = this.now.getFullYear();
    this.nowmonth = this.now.getMonth();
    this.nowdate = this.now.getDate();
    this.lastdate = new Date(this.nowyear, this.nowmonth + 1, 0);
    this.nowdateamout = this.lastdate.getDate();
    this.renderyear = this.nowyear;
    this.rendermonth = this.nowmonth;
    this.renderdate = this.nowdate;
    value = this.nextorprevFn(_this.renderyear, _this.rendermonth, _this.renderdate);
    this.nextbtn.on('mousedown', function(e) {
      e.stopPropagation();
      return _this.nextorprevFn(_this.renderyear, _this.rendermonth, _this.renderdate, true);
    });
    this.prevbtn.on('mousedown', function(e) {
      e.stopPropagation();
      return _this.nextorprevFn(_this.renderyear, _this.rendermonth, _this.renderdate, false);
    });
    return this.cadenlar.on('mousedown', '#datearea li', function(e) {
      var li;
      e.stopPropagation();
      li = this;
      return _this.setinputvalue(li);
    });
  };

  Cadenlar.prototype.setinputvalue = function(li) {
    var _this, month, val, value, year;
    _this = this;
    val = li.innerHTML;
    year = _this.renderyear;
    month = _this.rendermonth;
    if ($(li).hasClass('next')) {
      month++;
    } else if ($(li).hasClass('prev')) {
      month--;
    }
    month = month + 1;
    if (month === 0) {
      year = year - 1;
      month = 12;
    } else if (month === 13) {
      year = year + 1;
      month = 1;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (val < 10) {
      val = '0' + val;
    }
    value = year + '-' + month + '-' + val;
    _this.input.val(value);
    return _this.cadenlarContainer.css({
      'display': 'none'
    });
  };

  Cadenlar.prototype.getinputvalue = function() {
    return this.input.val();
  };

  return Cadenlar;

})();