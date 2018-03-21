// ==UserScript==
// @name        mq beautifier
// @namespace   mqgreatagain
// @description Makes the Active MQ UI less useless.
// @include     http://*activemq*/admin/queues.jsp*
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var full_queue_names = function() {
  var queue_markup = function(index, oldHtml) {
    return oldHtml.split("<span>")[1];
  };
  $("#queues td a .tooltip").html(queue_markup);
};

var total_numbers = function() {
  var counter = 0;
  var all_the_numbers = $("#queues tbody tr").map(function( index, element ){ 
    var pending = parseInt($(element).find("td:eq(1)").text());
    var consumers = parseInt($(element).find("td:eq(2)").text());
    var enqueued = parseInt($(element).find("td:eq(3)").text());
    var dequeued = parseInt($(element).find("td:eq(4)").text());
    return [[pending, consumers, enqueued, dequeued]];
  } );

  var pendingTotal = 0;
  var consumersTotal = 0;
  var enqueuedTotal = 0;
  var dequeuedTotal = 0;
  
  for(i = 0; i < all_the_numbers.length; i++) {
    pendingTotal += all_the_numbers[i][0];
    consumersTotal += all_the_numbers[i][1];
    enqueuedTotal += all_the_numbers[i][2];
    dequeuedTotal += all_the_numbers[i][3];
  };
  
  $("#queues tbody").prepend("<tr><td><b>Grand totals</b></td>" 
                   + table_cell(pendingTotal) 
                   + table_cell(consumersTotal) 
                   + table_cell(enqueuedTotal)
                   + table_cell(dequeuedTotal) 
                   + "<td></td><td></td></tr>");
};

var table_cell = function(number) {
  return "<td>" + number + "</td>";
};

var fix_sorting = function() {
  var pending_messages_header = $("#queues thead th:eq(1) a");
  pending_messages_header.click(); // click once to sort on this field
  pending_messages_header.click(); // click again to reverse the sort order
};

$(function() {
  full_queue_names();
  fix_sorting();
  setTimeout(total_numbers, 1000);
});
