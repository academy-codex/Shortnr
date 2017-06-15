$.fn.toggleState = function(b) {
	$(this).stop().animate({
		width: b ? "300px" : "50px"
	}, 600, "easeOutElastic" );
}

$(document).ready(function() {
	var container = $(".container");
	var boxContainer = $(".search-box-container");
	var submit = $(".submit");
	var searchBox = $(".search-box");
	var response = $(".response");
    var link = document.getElementsByClassName("link");
	var isOpen = false;
	submit.on("mousedown", function(e) {
		e.preventDefault();
		boxContainer.toggleState(!isOpen);
		isOpen = !isOpen;
		if(!isOpen) {
			handleRequest();
		} else {
			searchBox.focus();
		}	
	});
	searchBox.keypress(function(e) {
		if(e.which === 13) {
			boxContainer.toggleState(false);
			isOpen = false;
			handleRequest();
		}
	});
	searchBox.blur(function() {
		boxContainer.toggleState(false);
		isOpen = false;
	});
	function handleRequest() {
		// You could do an ajax request here...
		var value = searchBox.val();
		searchBox.val('');
		if(value.length > 0) {
			response.text(('SHORTNRing "' + value + '" . . .'));
			response.animate({
				opacity: 1
			}, 300).delay(2000).animate({
				opacity: 0
			}, 300);
            
            var kvpairs = {
              url:value  
            };
            
            // AJAX REQUEST
            $.ajax({
                type:'POST',
                url:"/url",
                data: JSON.stringify(kvpairs),
                processData:false,
                contentType: "application/json; charset=utf-8",
                success:function(data) {
                    console.log('success', data);
                    response.text(('http://127.0.0.1/url'+data));
                    response.animate({
                        opacity: 1
                    }, 300);
                    link[0].setAttribute("href", 'http://127.0.0.1:3000/url'+data);
                    console.log(link[0].attributes);
                },
                error:function(exception){console.log(exception);}
            });
		}
	}
});