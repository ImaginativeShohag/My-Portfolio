/**
 * Minify: https://github.com/mishoo/UglifyJS2
 */
/*
# Bootstrap Used:
- ScrollSpy
- CSS: box-sizing: border-box;
- normalize.css
 */

const DELAY_BETWEEN_ELEMENTS_LONG = 1000; // 1000
const DELAY_BETWEEN_ELEMENTS_SHORT = 500; // 500
const TYPE_SPEED = 16; // 16

const objCompareFn = function (a, b) {
    let A = a.name.toUpperCase();
    let B = b.name.toUpperCase();
    if (A < B) {
        return -1;
    }
    if (A > B) {
        return 1;
    }
    return 0;
};

$(function () {

    $(".loading").fadeOut();

    $(".profile-img").addClass("ready");

    new Typed(".profile-welcome .title", {
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

    $("#go-to-more").click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $("#div-bio").offset().top
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

        const targetId = $(this).attr("data-target");

        $("#" + targetId).fadeIn();

    });

    $(".msg-box").click(function () {
        $(this).fadeOut();
    });

    // Nav bar will hide when intro page is visible
    $(window).on('activate.bs.scrollspy', function (e, obj) {

        const $spyedElId = $("#nav li > a.active").attr("href");

        if ($spyedElId === "#one") {
            $("#nav").removeClass("nav-show");
        } else {
            $("#nav").addClass("nav-show");
        }

    });

});

function showBio() {
    new Typed(".profile-welcome .bio", {
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

    const socialButtonPanel = $(".profile-welcome");
    const socialIconBottom = socialButtonPanel.offset().top + socialButtonPanel.outerHeight();
    const totalHeight = $("#one").height();

    // Bottom Padding of #div-intro: 48
    // Height of .show-more: 64
    // Extra space for safety: 8px
    const newMarginTop = totalHeight - (socialIconBottom + 48 + 64 + 8);

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

        initInformation();

    });
}

function drawParticles() {
    particlesJS.load('particles-js', 'assets/particles.json');
}

function showNavBox() {
    $("nav").css("display", "");
}

function initSiteInfo(info) {
    const element = document.querySelector('#iw-site-info');

    element.innerHTML = "Last updated on ― " + info.updated_at + " (v" + info.version + ").";
}

function initLangSkills(languages) {

    languages.sort(objCompareFn);

    const langSkillParent = document.querySelector('#div-lang-skills .skill-tags .el-spans');

    langSkillParent.innerHTML = ''

    for (let i = 0; i < languages.length; i++) {

        const obj = languages[i];

        const elSpan = document.createElement('span');
        elSpan.innerText = obj.name;

        if (obj.active) {
            elSpan.classList.add("active");
            elSpan.setAttribute("data-toggle", "tooltip");
            elSpan.setAttribute("title", "Recently Working On");
        }

        langSkillParent.append(elSpan);

    }

}

function initFrameworkSkills(frameworks) {

    frameworks.sort(objCompareFn);

    const techSkillParent = document.querySelector('#div-tech-skills .skill-tags .el-spans');

    techSkillParent.innerHTML = '';

    for (let i = 0; i < frameworks.length; i++) {

        const obj = frameworks[i];

        const elSpan = document.createElement('span');
        elSpan.innerText = obj.name;

        if (obj.active) {
            elSpan.classList.add("active");
            elSpan.setAttribute("data-toggle", "tooltip");
            elSpan.setAttribute("title", "Recently Working On");
        }

        techSkillParent.append(elSpan);

    }

}

function initAchievements(achievements) {

    achievements.reverse();

    const timelineParent = document.querySelector('#timeline-parent');
    timelineParent.innerHTML = ''

    for (let i = 0; i < achievements.length; i++) {

        const obj = achievements[i];

        const tlEl = document.createElement("div");
        tlEl.classList.add("tl-el");
        timelineParent.append(tlEl);

        const pTlType = document.createElement("p");
        pTlType.classList.add("tl-type");
        pTlType.innerHTML = obj.year;
        tlEl.append(pTlType);

        const pTlTitle = document.createElement("p");
        pTlTitle.classList.add("tl-title");
        pTlTitle.innerHTML = obj.title;
        tlEl.append(pTlTitle);

        const pTlTags = document.createElement("p");
        pTlTags.classList.add("tl-tags");
        pTlTags.innerHTML = '<span>' + obj.tags.join("</span><span>") + '</span>'
        tlEl.append(pTlTags);

        if (obj.about !== false) {
            const pTlAbout = document.createElement("p");
            pTlAbout.classList.add("tl-about");
            pTlAbout.innerHTML = obj.about;
            tlEl.append(pTlAbout);

            const pTlHr = document.createElement("hr");
            pTlHr.classList.add("tl-hr")
            tlEl.append(pTlHr);
        }

        const pTlDesc = document.createElement("p");
        pTlDesc.classList.add("tl-description");
        pTlDesc.innerHTML = obj.description;
        tlEl.append(pTlDesc);

        if ("link" in obj || "previews" in obj) {

            const btnDivContainer = document.createElement("div");
            btnDivContainer.classList.add("dl-box");
            tlEl.append(btnDivContainer);

            if ("link" in obj) {
                const btn = document.createElement("a");
                btn.classList.add("btn-full-block");
                btn.setAttribute("target", "_blank");
                btn.setAttribute("href", obj.link);
                btn.innerHTML = '<i class="fas fa-download"></i> ' + obj.link_title;
                btnDivContainer.append(btn);
            }

            if ("previews" in obj) {

                let previewImageList = obj.previews;

                const btn = document.createElement("button");
                btn.classList.add("btn-full-block");
                btn.innerHTML = '<i class="far fa-images"></i> ' + "Screenshots";
                btnDivContainer.append(btn);

                btn.addEventListener("click", function () {

                    const pswpElement = document.querySelectorAll('.pswp')[0];
                    const gallery = new PhotoSwipe(
                        pswpElement,
                        PhotoSwipeUI_Default,
                        previewImageList,
                        {
                            shareEl: false,
                            bgOpacity: 0.85
                        }
                    );
                    gallery.init();

                })
            }

        }

    }

}

function initJobs(jobs) {

    jobs.reverse();

    const timelineParent = document.querySelector('#job-timeline-parent');
    timelineParent.innerHTML = '';

    for (let i = 0; i < jobs.length; i++) {

        const obj = jobs[i];

        const tlEl = document.createElement("div");
        tlEl.classList.add("tl-el");
        timelineParent.append(tlEl);

        const pTlType = document.createElement("p");
        pTlType.classList.add("tl-type");
        pTlType.innerHTML = obj.start_date + " ― " + obj.end_date;
        tlEl.append(pTlType)

        const pTlTitle = document.createElement("p");
        pTlTitle.classList.add("tl-title");
        pTlTitle.innerHTML = obj.company_name;
        tlEl.append(pTlTitle);

        const pTlDesc = document.createElement("p");
        pTlDesc.classList.add("tl-description");
        pTlDesc.innerHTML = obj.position;
        tlEl.append(pTlDesc);

        if (obj.web_url != null) {
            const btnDivContainer = document.createElement("div");
            btnDivContainer.classList.add("dl-box");
            tlEl.append(btnDivContainer);

            const btn = document.createElement("a");
            btn.classList.add("btn-full-block");
            btn.setAttribute("target", "_blank");
            btn.setAttribute("href", obj.web_url);
            btn.innerHTML = '<i class="fas fa-globe-asia"></i> Website';
            btnDivContainer.append(btn);
        }

    }

}

function initLongBio(longBio) {

    const timelineParent = document.querySelector('#div-bio p');

    timelineParent.innerHTML = longBio;

}

function initInformation() {

    $.getJSON("json/db.json?v=2", function (data) {

        initSiteInfo(data.info);

        initLongBio(data.long_bio)

        initLangSkills(data.languages);

        initFrameworkSkills(data.frameworks);

        initAchievements(data.achievements);

        initJobs(data.jobs);

        $('[data-toggle="tooltip"]').tooltip();

    });

}
