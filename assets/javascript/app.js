
$(document).ready(function () {
    var topics = [];
    function displayGifs() {

        var x = $(this).attr("search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=N39cfZms5WUPG4VHQ63rlRTTTnKN6SdS&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                showImage.attr("src", staticSrc);
                showImage.addClass("Giphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(".gif-box");
                $("#gif-box").prepend(showDiv);

            }
        });
    }

    $("#addShow").on("click", function (event) {
        event.preventDefault();
        var newShow = $("#input").val().trim();
        topics.push(newShow);
        $("#input").val('');
        displayButtons();
    });

    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "show");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    $(document).on("click", "gif", displayGifs);

    $(document).on("click", ".Giphy", pausePlayGifs);
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});
