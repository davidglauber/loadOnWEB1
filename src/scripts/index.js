    $(document).ready(function(){

        var showHeaderAt = 150;

        var win = $(window),
                body = $('body');


        if(win.width() > 600){

            win.on('scroll', function(e){

                if(win.scrollTop() > showHeaderAt) {
                    body.addClass('fixed');
                }
                else {
                    body.removeClass('fixed');
                }
            });

        }

    });

    $(document).ready(function() {
        var key = 'AIzaSyCmXyHtGFRGTTMmI_a5aQrkmi5jEvFpBcI';
        var playlistId = 'PLKSD8UK-Sfa_c56yJf7fk_3AaGnIcwT90';
        var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

        var options = {
            part: 'snippet',
            key: key,
            maxResults: 20,
            playlistId: playlistId
        }

        loadVids();

        /*lê a API do youtube e retorna os vídeos*/
        function loadVids() {
            $.getJSON(URL, options, function(data) {
                var id = data.items[0].snippet.resourceId.videoId;
                mainVid(id);
                resultsLoop(data);
            })
        }


        function like() {
            alert('vc gostou do video')
        }

        function unlike() {
            alert('vc não gostou do video')
        }


        function mainVid(id) {
            $('#video').html(`
                <iframe 
                id="frame"
                style="margin-left: 100px; border-radius: 20px; margin-top: 10px; box-shadow: 5px 5px 15px black" 
                width="45%" 
                height="340" 
                src="https://www.youtube.com/embed/${id}?color=white" 
                frameborder="4" allow="accelerometer; autoplay; 
                encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>


                
                <i onclick="like()" id="videoTitulo" class="fa fa-thumbs-up"><i/>
                <i  onclick="unlike()" style="margin-left: 100px; font-size: 100px; color: red;" class="fa fa-thumbs-down"><i/>
            `)
        }


        function resultsLoop(data){
            $.each(data.items, function(i, item) {

                var thumb = item.snippet.thumbnails.medium.url;
                var title = item.snippet.title;
                var desc = item.snippet.description;
                var vid = item.snippet.resourceId.videoId;

                $('main').append(`
                    <a id="referNav" href="#frame">
                        <article style="margin-top: 30px" class="item" data-key="${vid}">
                            <img class="thumb" src="${thumb}" alt=""/>
                            <div class= "details">
                                <h4 id="tituloTTT">${title}</h4>
                                        <p id="subtitle" >${desc}</p>
                            </div>
                        </article>
                    </a>
                `);
            })
        }

        $('main').on('click', 'article', function() {
            var id = $(this).attr('data-key');
            mainVid(id);
        });
        

    });