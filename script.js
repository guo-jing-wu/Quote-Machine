var currentQuote = "",
	currentAuthor = "";

function getQuote() {
	$.ajax({
		url:
			"https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
		dataType: "jsonp",
		success: function(r) {
			currentQuote = r.quoteText;
			currentAuthor = r.quoteAuthor;
			$("#tweet").attr(
				"href",
				"https://twitter.com/intent/tweet?text=" +
					encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
			);
			$(".quote-text").animate(
				{
					opacity: 0
				},
				250,
				function() {
					$(this).animate(
						{
							opacity: 1
						},
						250
					);
					$("#text").text(r.quoteText);
				}
			);
			$(".quote-author").animate(
				{
					opacity: 0
				},
				250,
				function() {
					$(this).animate(
						{
							opacity: 1
						},
						250
					);
					$("#author").html(r.quoteAuthor);
				}
			);
		}
	});
}

$(document).ready(function() {
	getQuote();
	$("#new-quote").on("click", getQuote);
	$("#tweet").on("click", function() {
		windows.open(
			"https://twitter.com/intent/tweet?text=" +
				encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
		);
	});
});
