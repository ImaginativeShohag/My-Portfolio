/**
 * Minify: https://github.com/mishoo/UglifyJS2
 */
/*
# Bootstrap Used:
- ScrollSpy
- CSS: box-sizing: border-box;
- normalize.css
 */

$(function () {

    {

        $(".loading").fadeOut();

        $(".profile-img").addClass("ready");

        var DELAY_BETWEEN_ELEMENTS_LONG = 1000; //1000
        var DELAY_BETWEEN_ELEMENTS_SHORT = 500; //500
        var TYPE_SPEED = 16; // 25

        var typedTitle = new Typed(".profile-welcome .title", {
            stringsElement: '.for-title',
            typeSpeed: TYPE_SPEED,
            startDelay: DELAY_BETWEEN_ELEMENTS_LONG,
            backDelay: 1500,
            showCursor: false,
            loop: false,
            onComplete: function (self) {
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
                onComplete: function (self) {
                    setTimeout(function () {

                        showDownButton();

                    }, DELAY_BETWEEN_ELEMENTS_SHORT);
                }
            });
        }

        function showDownButton() {

            var socialButtonPanel = $(".profile-welcome");
            var socialIconBottom = socialButtonPanel.offset().top + socialButtonPanel.outerHeight();
            var totalHeight = $("#one").height();

            // Bottom Padding of #div-intro: 48
            // Height of .show-more: 64
            // Extra space for safety: 8px
            var newMarginTop = totalHeight - (socialIconBottom + 48 + 64 + 8);

            if (newMarginTop > 0) {
                $(".show-more").css("margin-top", newMarginTop);
            }

            setTimeout(function () {
                $(".show-more").fadeIn(function () {

                    showTheRest();

                });
            }, DELAY_BETWEEN_ELEMENTS_SHORT);

        }

        function showTheRest() {
            $(".the-rest").slideDown(function () {

                drawParticles();

                showNavBox();

                sortLangSkills();

                sortFrameworkSkills();

            });
        }

        function drawParticles() {
            particlesJS.load('particles-js', 'assets/particles.json');
        }

        function showNavBox() {
            $("nav").css("display", "");
        }

        function sortLangSkills() {

            var languages = [
                "C",
                "C++",
                "Java",
                "JavaScript",
                "PHP",
                "Python"
            ];

            languages.sort();

            var langSkillParent = document.querySelector('#div-lang-skills .skill-tags .el-spans');

            languages.forEach(function (value) {

                var el_span = document.createElement('span');
                el_span.innerText = value;

                langSkillParent.append(el_span);

            });

        }

        function sortFrameworkSkills() {

            var frameworks = [
                "Android",
                "Django",
                "Laravel",
                "jQuery",
                "Firestore Database",
                "Firebase Realtime Database",
                "Google Maps API"
            ];

            frameworks.sort();

            var techSkillParent = document.querySelector('#div-tech-skills .skill-tags .el-spans');

            frameworks.forEach(function (value) {

                var el_span = document.createElement('span');
                el_span.innerText = value;

                techSkillParent.append(el_span);

            });

        }

    }

    $("#go-to-more").click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $(".study-timeline").offset().top
        }, 1000);

    });

    $("#nav a").click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);

    });

    $("a[data-msg='on']").click(function (event) {
        event.preventDefault();

        var targetId = $(this).attr("data-target");

        $("#" + targetId).fadeIn();

    });

    $(".msg-box").click(function () {
        $(this).fadeOut();
    });


    // Nav bar will hide when intro page is visible
    // var $navEl = $("#nav");

    // $(window).scrollspy({target: '#nav'});

    // $(window).on('activate.bs.scrollspy', function () {
    //     console.log("This event is not firing...");
    // });

    $(window).on('activate.bs.scrollspy', function (e, obj) {

        var spyedElId = $("#nav li > a.active").attr("href");

        if (spyedElId === "#one") {
            $("#nav").removeClass("nav-show");
        } else {
            $("#nav").addClass("nav-show");
        }

    });

    initAchievements();

});

function initAchievements() {
    var items = [];

    $.getJSON("json/db_achievements.json", function (data) {

        $.each(data, function (key, value) {

            item = '<div class="tl-el"> \
<p class="tl-type">' + value.year + '</p> \
<p class="tl-title">' + value.title + '</p> \
<p class="tl-tags"><span>' + value.tags.join("</span><span>") + '</span></p>';

            if (value.about !== false) {
                item += '<p class="tl-about">' + value.about + '</p> \
<hr class="tl-hr">';
            }

            item += '<p class="tl-description">' + value.description + '</p>';

            if (value.link !== false) {
                item += '<div class="dl-box"> \
<a class="btn-full-block" target="_blank" href="' + value.link + '">' + value.link_title + '</a> \
</div>';
            }

            item += '</div>';

            items.push(item);

        });

        $("<div>", {
            "class": "timeline",
            html: items.join("")
        }).appendTo("#div-projects");

    });
}
