$(function() {

    $(window).on("load", function() {

        $(".loading").fadeOut();

        $(".profile-img").addClass("ready");

        var DELAY_BETWEEN_ELEMENTS_LONG = 1000; //1000
        var DELAY_BETWEEN_ELEMENTS_SHORT = 500; //500
        var TYPE_SPEED = 25; // 25

        var typedTitle = new Typed(".profile-welcome .title", {
            stringsElement: '.for-title',
            typeSpeed: TYPE_SPEED,
            startDelay: DELAY_BETWEEN_ELEMENTS_LONG,
            backDelay: 1500,
            showCursor: false,
            loop: false,
            onComplete: function(self) {
                showBio();
            }
        });

        function showBio() {
            var typedBio = new Typed(".profile-welcome .bio", {
                stringsElement: '.for-bio',
                typeSpeed: TYPE_SPEED,
                startDelay: DELAY_BETWEEN_ELEMENTS_LONG,
                showCursor: false,
                loop: false,
                onComplete: function(self) {
                    setTimeout(function() {
                        showContactButtons();
                    }, DELAY_BETWEEN_ELEMENTS_SHORT);
                }
            });
        }

        function showContactButtons() {
            $(".profile-contact").fadeIn(function() {
                setTimeout(function() {
                    // showSocialButtons();
                    showDownButton();
                }, DELAY_BETWEEN_ELEMENTS_SHORT);
            });
        }

        // function showSocialButtons() {
        //     $(".profile-social").fadeIn(function() {
        //         showDownButton();
        //     });
        // }

        function showDownButton() {

            // var socialButtonPanel = $(".profile-social");
            var socialButtonPanel = $(".profile-contact");
            var socialIconBottom = socialButtonPanel.offset().top + socialButtonPanel.outerHeight();
            var totalHeight = $("#one").height();
            $("#div-intro").css("min-height", totalHeight);

            // Bottom Padding of #div-intro: 48
            // Height of .show-more: 64
            // Extra space for safety: 8px
            var newMarginTop = totalHeight - (socialIconBottom + 48 + 64 + 8);

            if (newMarginTop > 0) {
                $(".show-more").css("margin-top", newMarginTop);
            }

            setTimeout(function() {
                $(".show-more").fadeIn(function() {

                    showTheRest();

                });
            }, DELAY_BETWEEN_ELEMENTS_SHORT);

        }

        function showTheRest() {
            $(".the-rest").slideDown(function() {

                //drawBackground();
                drawParticles();

                showNavBox();

                initializeThings();

            });
        }

        function showNavBox() {
            $("nav").css("display", "");
        }

        function drawParticles() {
            /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
            particlesJS.load('particles-js', 'assets/particles.json', function() {
                // console.log('callback - particles.js config loaded');
            });
        }

        function initializeThings() {
            // Bootstrap tooltips initialize
            $('[data-toggle="tooltip"]').tooltip();

            // paroller.js initialize
            // If user in Tabs or big devices then only this will on
            // We also set "background-attachment: scroll;"
            // for "#one" element in css using meadia quries.
            if($(window).width() >= 600)
            {
                $(window).paroller();
            }
        }

        // function drawBackground() {
        //     // SVG cheatsheet
        //     // https://learn-the-web.algonquindesign.ca/topics/svg-cheat-sheet/
        //
        //     // initialize SVG.js
        //     var draw = SVG('drawing');
        //
        //     // draw pink square
        //     var rect = [];
        //
        //     var TOTAL_DOT = 100;
        //
        //     for (var i = 0; i < TOTAL_DOT; i++) {
        //         var rnd = Math.floor((Math.random() * 10) + 1);
        //         rect[i] = draw.circle(rnd).fill('#d5d5d5');
        //     }
        //
        //     var theSvgWidth = $(".the-rest").width();
        //     var theSvgHeight = $(".the-rest").height();
        //
        //     for (var j = 0; j < TOTAL_DOT; j++) {
        //         var rndr = Math.floor((Math.random() * 5) + 1);
        //         var rndx = Math.floor((Math.random() * theSvgWidth) + 1);
        //         var rndy = Math.floor((Math.random() * theSvgHeight) + 1);
        //
        //         rect[j].move(rndx, rndy);
        //
        //         rect[j].animate({
        //             ease: '<>'
        //         }).radius(rndr).loop(true, true);
        //     }
        //
        // }

    });

    $("#go-to-more").click(function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $(".study-timeline").offset().top
        }, 1000);

    });

    $("#nav a").click(function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);

    });

    $("a[data-msg='on']").click(function(event) {
        event.preventDefault();

        var targetId = $(this).attr("data-target");

        $("#" + targetId).fadeIn();

    });

    $(".msg-box").click(function() {
        $(this).fadeOut();
    });


    // Nav bar will hide when intro page is visible
    var navEl = $("#nav");

    navEl.on('activate.bs.scrollspy', function() {
        var spyedElId = $("#nav li.active > a").attr("href");

        if (spyedElId == "#one") {
            $(this).removeClass("nav-show");
        } else {
            $(this).addClass("nav-show");
        }

    });

    // Tooltip manually hide
    $('[data-toggle="tooltip"]').click(function(){
        $(this).tooltip("hide");
    });



});
