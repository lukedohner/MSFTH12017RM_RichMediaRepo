"use strict";

var MU = MU || {};

(function() {
    var timeline;
    var wrapper, clickThrough, logo, copy, cta, bgBig, ksp1, ksp2, ksp3, current_view, new_view, menu, endframe;
    var tl_ksp, tl_endframe;

    var productLaptop;
    var productTablet;

    var learnMore;
    var learnMore1;
    var learnMore2;
    var kspArray;
    
    var trackingArray;
    var total = 3;
    var viewCount = 0;

    var next_is_end = false;

    var carat_left = 159;

    var c;
    var active;
    var activeNum
    var inactivityTL;

    var ctaHotspot;

    var startPoint;
    var logo;
    var timerObject = 0;


    //Tracking stuff to put in here.
    // 	{"name":"replayClick", "type": "string"},
    // {"name":"Next_Versatility", "type": "string"},
    // {"name":"Next_Touchscreen", "type": "string"},
    // {"name":"Next_Battery_Life", "type": "string"},
    // {"name":"Learn_More", "type": "string"},
    //{"name":"Next_Offer", "type": "string"}


    MU.init = function() {
        // Initialize any variables here
        wrapper = MU.$('#wrapper');
        clickThrough = MU.$('#click_through');
        logo = MU.$('#logo');
        copy = MU.$('#copy');
        cta = MU.$('#cta');
        bgBig = MU.$('#bg-big-holder');
        ctaHotspot = MU.$("#cta-hotspot");
        productTablet = MU.$("#ksp2 .tablet");
        productLaptop = MU.$("#ksp2 .laptop");
        
        menu = MU.$('#menu');
        endframe = MU.$('#endframe');

       

        myFT.applyClickTag(ctaHotspot, 1); 


        ksp1 = {
            id: MU.$('#ksp1'),
            viewed: false,
            left: 158,
            name: "ksp1",
            inactive: false,
            next: MU.$('.copy_next')
        }

        ksp2 = {
            id: MU.$('#ksp2'),
            viewed: false,
            left: 158,
            name: "ksp2",
            inactive: false,
            next: MU.$('.copy_next')
        }

        ksp3 = {
            id: MU.$('#ksp3'),
            viewed: false,
            left: 158,
            name: "ksp3",
            inactive: false,
            next: MU.$('.copy_next')
        }
        kspArray = [ksp1, ksp2, ksp3];


        
        trackingArray = ["Next_Versatility", "Next_Touchscreen", "Next_Battery_Life"];



        learnMore = MU.$('#learnMore');
        learnMore1 = MU.$('#learnMore1');
        learnMore2 = MU.$('#learnMore2');

        current_view = menu;

        tl_ksp = new TimelineMax();
        tl_endframe = new TimelineMax();

        TweenMax.set(["#f1-copy1", "#f4-copy1"], { autoAlpha: 0 });
        TweenMax.set(productTablet, { x: 20});
        
        TweenMax.set("#screen_1", { scale: 1, left: 645, top: 22, width: 252, rotationY: 0, transformOrigin: "left top", autoAlpha: 0 });
        TweenMax.set("#menu", { autoAlpha: 0, x: 0 });
        TweenMax.set(bgBig, { scale: 1, width: 970, height: 250, left: 0, top: 0, rotationY: 0, transformOrigin: "left top", autoAlpha: 0 });
        TweenMax.set(["#hotspot1", "#hotspot2", "#hotspot3", "#btn-replay", "#back-button", "#logo-end"], { autoAlpha: 0 });
        TweenMax.set(["#ksp1", "#ksp2", "#ksp3", "#endframe"], { x: 970 });
        TweenMax.set("#logo-blue", { x: 0, autoAlpha: 0 });
        
      

        wrapper.addClass('show');

        MU.initAnimation();

        if (MU.useFallback()) {
            MU.injectFallback();
        } else {
            MU.startAnimation();
        }
    };

    MU.restartAd = function() {
        for (var i = 0; i < kspArray.length; i++) {
            kspArray[i].viewed = false;
            MU.switchToActive("hotspot" + (i + 1));
        }
        next_is_end = false;
        current_view = menu;
        TweenMax.set(myFT.logo, {autoAlpha:1});
        TweenMax.set(["#menu", ], { autoAlpha: 0, x: 0 });
        TweenMax.set("#screen_1", { scale: 1, left: 645, top: 22, width: 252, rotationY: 0, transformOrigin: "left top", autoAlpha: 0 });
        TweenMax.set(bgBig, { scale: 1, width: 970, height: 250, left: 0, top: 0, rotationY: 0, transformOrigin: "left top", autoAlpha: 0 });
        TweenMax.set(["#hotspot1", "#hotspot2", "#hotspot3", "#btn-replay", "#back-button", "#logo-end"], { autoAlpha: 0 });
        TweenMax.set(["#ksp1", "#ksp2", "#ksp3", "#endframe"], { x: -970 });
        TweenMax.set("#logo-blue", { x: 0, autoAlpha: 0 });
        TweenMax.set("#invisi-hotspot", { autoAlpha: 1 });

        MU.initAnimation();
        MU.startAnimation();
    };

    MU.injectFallback = function() {
        var body = document.body;

        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }

        var img = new Image();
        img.src = './img/static.jpg';

        document.body.appendChild(img);
    };

    MU.initAnimation = function() {
        // TweenMax can be used to set css
        // It will even take care of browser prefixes

        timeline = new TimelineMax({
            delay: 0.2,
            onComplete: MU.onAnimationComplete
        });


        timeline.pause();

        timeline.add([
            //TweenMax.to( logo, 0.6, {opacity: 1, onComplete:MU.startAnimation} ),
            //TweenMax.to(f1Copy1, 0.6, {opacity: 1, onComplete:MU.startAnimation} )
            // TweenMax.to(copy, 0.8, { css:{opacity: 1}, delay:0.4 } )
        ]);

        // Listener for updating on requestAnimationFrame interval
        TweenMax.ticker.addEventListener('tick', MU.onTick);

        var back = document.getElementById('back-button');

        back.onclick = function() {
            MU.$("#invisi-hotspot").removeClass('active');
            MU.$("#invisi-hotspot").addClass('inactive');
            var tl = new TimelineMax();
            tl.to("#hotspot1", 0.3, { autoAlpha: 1 })
                .to("#hotspot2", 0.3, { autoAlpha: 1 })
                .to("#hotspot3", 0.3, { autoAlpha: 1 })

            TweenMax.to(new_view, 0.3, { x: 970 });
            TweenMax.fromTo("#menu", 0.3, { x: -970 }, { x: 0 });
            current_view = "#menu";

            TweenMax.set(["#back-button", "#carat", "#btn-replay"], { autoAlpha: 0 });

            TweenMax.to("#logo-blue", .3, { autoAlpha: 0 });
            TweenMax.to(myFT.logo, .3, {autoAlpha:1});	
        }

        document.getElementById("cta-hotspot").onclick = function() {
            myFT.tracker('Learn_More'); 
        }


        document.getElementById("btn-replay").onclick = function() {
            MU.$("#invisi-hotspot").removeClass('active');
            MU.$("#invisi-hotspot").addClass('inactive');
            //console.log('restart');
            timeline.kill();
            myFT.tracker('replayClick'); 
            MU.restartAd();
        }

        for (var i = 1; i < 4; i++) {
            document.getElementById('hotspot' + i).onclick = function() {
                MU.$("#invisi-hotspot").removeClass('inactive');
                MU.$("#invisi-hotspot").addClass('active');
                inactivityTL.kill();
                 MU.restartInactiveTimer();
                TweenMax.to(myFT.logo, .3, {autoAlpha:0});
                MU.menuSelect(this.id);
            };
        }


        var next_item = document.getElementById('invisi-hotspot');

        
        next_item.onmouseover = function() {
            TweenMax.to(this.previousElementSibling, .3, { x: 5 });
        }
        next_item.onmouseout = function() {
            TweenMax.to(this.previousElementSibling, .3, { x: 0 });
        }
        next_item.onclick = function() {
            TweenMax.set(["#carat"], { autoAlpha: 0 });

            switch (current_view) {
                case "ksp1":
                    current_view = ksp1.id;
                    kspArray[0].viewed = true;
                    break;
                case "ksp2":
                    current_view = ksp2.id;
                    kspArray[1].viewed = true;
                    break;
                case "ksp3":
                    current_view = ksp3.id;
                    kspArray[2].viewed = true;
                    break;
                default:
            }

            
            inactivityTL.kill();
            
            MU.restartInactiveTimer();
            MU.checkKSPArray();
            
           	
        }



        MU.resetKSPPos = function(ksp) {
            TweenMax.set(ksp, { x: 970 });
        }

        MU.animateKSP = function(ksp) {


            for (var i = 0; i < kspArray.length; i++) {
                //console.log(kspArray[i].viewed);
                if (kspArray[i].id == ksp) {
                    kspArray[i].viewed = true;

                    active = kspArray[i];
                    activeNum = i;

                    if (!next_is_end) {
                        myFT.tracker(trackingArray[activeNum]); 

                    } else {
                        
                        myFT.tracker('Next_Offer'); 
                    }

                    carat_left = kspArray[i].left;
                    break;
                } else {
                    carat_left = 214;
                }
            }

            // console.log(activeNum);
            console.log(activeNum+" is the active num");


            TweenMax.fromTo(current_view, 0.3, { x: 0 }, { x: -970, ease: Cubic.easeInOut });

            TweenMax.fromTo(new_view, 0.3, { x: 970 }, { x: 0, onComplete: MU.setCurrent, onCompleteParams: [new_view], ease: Cubic.easeInOut });

            if (ksp === endframe) {

                TweenMax.to("#logo-end", 0.3, { delay: 0.5, autoAlpha: 1 });
                TweenMax.to("#logo-blue", 0.3, { x: -970, autoAlpha: 1 });
                TweenMax.fromTo("#learnMore", 0.5, { x: -970, autoAlpha: 0 }, { x: 0, delay: 0.3, autoAlpha: 1, ease: Cubic.easeInOut });
                TweenMax.fromTo("#btn-replay", 0.5, { autoAlpha: 0 }, { delay: 1, autoAlpha: 1 });
                TweenMax.set(["#invisi-hotspot", "#back-button"], { autoAlpha: 0 });
                TweenMax.to("#carat", 0.7, { autoAlpha: 0, left: -970, ease: Cubic.easeInOut });
                return;
            }

            TweenMax.to(current_view, 0.5, { x: -970, onComplete: MU.resetKSPPos, onCompleteParams: [current_view], ease: Cubic.easeInOut });
            TweenMax.fromTo(new_view, 0.5, { x: 970 }, { x: 0, onComplete: MU.setCurrent, onCompleteParams: [new_view], ease: Cubic.easeInOut });


            if(ksp == kspArray[1].id){
            	console.log("WE ARE IN KSP2");
            	TweenMax.set(productTablet, { autoAlpha: 0 });
            	TweenMax.set(productLaptop, { autoAlpha: 0 });
            	TweenMax.fromTo("#ksp2 .product", 1, { autoAlpha: 1 }, { delay: 2.3, autoAlpha: 0, ease: Cubic.easeInOut });
            	TweenMax.to(productTablet, 1, { delay: 2.3, autoAlpha: 1 });

            	TweenMax.to(productTablet, 1, { delay: 4.3, autoAlpha: 0 });
            	TweenMax.to(productLaptop, 1, { delay: 4.3, autoAlpha: 1 });
            }


            if (!next_is_end) {
                console.log("next_is_end:"+next_is_end);
                var newName_copy = "#" + ksp[0].id + " .copy-line";
                var newName_copy2 = "#" + ksp[0].id + " .copy-next";
                var newName_copy3 = "#" + ksp[0].id + " .copy-alt";
                var newName_product = "#" + ksp[0].id + " .product";

                TweenMax.set(newName_copy2, { autoAlpha: 1 });
                TweenMax.set(newName_copy3, { autoAlpha: 0 });

                TweenMax.from(newName_copy, 0.7, { delay: 0.3, x: -970, ease: Cubic.easeInOut });
                TweenMax.from(newName_copy2, 0.7, { delay: 0.4, x: -970, ease: Cubic.easeInOut });
                TweenMax.fromTo(newName_product, 0.7, { x: 970, ease: Cubic.easeInOut }, { delay: 0.5, x: 0 });
                TweenMax.set("#invisi-hotspot", { autoAlpha: 1 });
                TweenMax.fromTo("#carat", 0.7, { autoAlpha: 0, left: 200 }, { delay: 0.8, autoAlpha: 1, left: carat_left, ease: Cubic.easeInOut });
            } else {
                console.log("next_is_end:"+next_is_end);
                var newName_carat = "#" + ksp[0].id + " .carat";
                var newName_copy = "#" + ksp[0].id + " .copy-line";
                var newName_copy2 = "#" + ksp[0].id + " .copy-next";
                var newName_copy3 = "#" + ksp[0].id + " .copy-alt";
                var newName_product = "#" + ksp[0].id + " .product";

                TweenMax.set("#invisi-hotspot", { autoAlpha: 1 });
                TweenMax.fromTo("#carat", 0.7, { autoAlpha: 0, left: 200 }, { delay: 0.8, autoAlpha: 1, left: 214, ease: Cubic.easeInOut });
                TweenMax.from(newName_copy, 0.7, { autoAlpha: 0, delay: 0.3, x: -970, ease: Cubic.easeInOut });
                TweenMax.set(newName_copy2, { autoAlpha: 0 });
                TweenMax.set(newName_copy3, { autoAlpha: 1 });
                TweenMax.from(newName_copy3, 0.7, { delay: 0.4, x: -970, ease: Cubic.easeInOut });

                TweenMax.fromTo(newName_product, 0.7, { x: 970, ease: Cubic.easeInOut }, { delay: 0.5, x: 0 });

            }

        }

        document.getElementById("cta-hotspot").onmouseover = function(event) {
            myFT.tracker('Learn_More'); 
            event.stopPropagation();

            TweenMax.set(learnMore1, { y: 0 });
            TweenMax.set(learnMore2, { y: 0 });
            TweenMax.to(learnMore1, .15, { y: -30, ease: Linear.easeNone });
            TweenMax.to(learnMore2, .15, { y: -30, ease: Linear.easeNone });
        }


    };


    MU.checkKSPArray = function() {

        console.log("checkKSPArray");

        for (var i = 0; i < kspArray.length; i++) {

            viewCount = 0;

            for (var k = 0; k < kspArray.length; k++) {
                if (kspArray[k].viewed === true) {
                    viewCount++;
                    //console.log("checkksparray-viewcount "+viewCount);
                }
            }

            // console.log(viewCount + " is the view count");

            if (kspArray[i].viewed == false) {
                new_view = kspArray[i].id;

                MU.animateKSP(new_view);
                break;
            }
            if (viewCount == 2) {
                next_is_end = true;
            }
            if (viewCount >= 3) {

                new_view = endframe;
                MU.animateKSP(new_view);
            }
        }
    };

    MU.switchToInactive = function(str) {
        console.log("switch to inactive"+str);
        MU.$("#" + str).removeClass("active-hotspot");
        MU.$("#" + str).removeClass("pulse-button");
        MU.$("#" + str).addClass("inactive-hotspot");
    }

    MU.switchToActive = function(str) {
        console.log("switch to active"+str);
        MU.$("#" + str).addClass("active-hotspot");
        MU.$("#" + str).addClass("pulse-button");
        MU.$("#" + str).removeClass("inactive-hotspot");
    }


    MU.menuSelect = function(str) {

        switch (str) {
            case "hotspot1":
                new_view = kspArray[0].id;
                viewCount = viewCount + 1;
                console.log(viewCount);

                if (viewCount == 3) {
                    next_is_end = true;
                }
                
                break;
            case "hotspot2":
                new_view = kspArray[2].id;
                viewCount = viewCount + 1;
                console.log(viewCount);
                if (viewCount == 3) {
                    next_is_end = true;
                }
                
                break;
            case "hotspot3":
                new_view = kspArray[1].id;
                viewCount = viewCount + 1;
                console.log(viewCount);
                if (viewCount == 3) {
                    next_is_end = true;
                }
                break;
            default:
        }
        MU.switchToInactive(str);

        TweenMax.set([hotspot1, hotspot2, hotspot3], { autoAlpha: 0 });
        TweenMax.to("#logo-blue", 0.3, { delay: 0.5, autoAlpha: 1 });
        TweenMax.fromTo("#back-button", 0.5, { autoAlpha: 0 }, { delay: 1, autoAlpha: 1 });
        MU.animateKSP(new_view);
        MU.restartInactiveTimer();
        
    }


    MU.restartInactiveTimer = function(){
        inactivityTL.restart();
        console.log("restart inactive");
    }

    MU.startTimer = function(t) {
        console.log("start timer");
        inactivityTL = new TimelineMax();
        inactivityTL.to(this, t, { onComplete: MU.jumpToEnd });
    }

    MU.jumpToEnd = function() {
        TweenMax.to(myFT.logo, .3, {autoAlpha:0});
        TweenMax.set([hotspot1, hotspot2, hotspot3], { autoAlpha: 0 });
        TweenMax.to("#logo-blue", 0.3, { delay: 0.5, autoAlpha: 1 });
        new_view = endframe;

        if (current_view != endframe) {
            TweenMax.fromTo(current_view, 0.5, { x: 0 }, { x: -970, ease: Cubic.easeInOut });
            TweenMax.fromTo(new_view, 0.5, { x: 970 }, { x: 0, onComplete: MU.setCurrent, onCompleteParams: [new_view], ease: Cubic.easeInOut });
        }
        MU.animateKSP(endframe);
        inactivityTL.kill();
        console.log("Jump to End");
    }


    MU.setCurrent = function(nm) {

        for (var i = 0; i < kspArray.length; i++) {
            if (nm === kspArray[i].id) {
                current_view = kspArray[i].name;
                break;
            }
        }
    }

    MU.showMenuBg = function() {
        TweenMax.set("#menu", { autoAlpha: 1 });
    }

    MU.startAnimation = function() {
        // Code for animation		
        logo.addClass("activeLogo");
        timeline.play();

        timeline.to("#f1-copy1", 1, { autoAlpha: 1 })
            .to("#f1-copy1", 1, { delay: 4, autoAlpha: 0 })
            .to(["#screen_1", bgBig], 1, { x: 0, autoAlpha: 1, onComplete: MU.showMenuBg }, "-=1")
            .to(bgBig, 2.25, { scale: 6, left: -3500, top: -300, rotationY: 30, transformOrigin: "left top" }, "+=1.5")
            .to("#screen_1", 1.5, { scale: 5, left: 300, top: -200, rotationY: 35, transformOrigin: "left middle", autoAlpha: 0 }, "-=2.25")

        .to("#f4-copy1", 0.6, { x: 0, autoAlpha: 1 }, "-=1")
            .fromTo(["#hotspot1", "#hotspot-copy3"], 0.3, { autoAlpha: 0 }, { autoAlpha: 1 })
            .fromTo(["#hotspot2", "#hotspot-copy2"], 0.3, { autoAlpha: 0 }, { autoAlpha: 1 })
            .fromTo(["#hotspot3", "#hotspot-copy1"], 0.3, { autoAlpha: 0 }, { autoAlpha: 1 })
            .add(function() {
                MU.startTimer(15);
            })
    };

    MU.showMenu = function() {
        TweenMax.to(current_view, 0.3, { x: 970 });
    }

    MU.onTick = function() {
        // Interval for updating on requestAnimationFrame
    };

    MU.onAnimationComplete = function() {
        // Log duration of timeline
        console.log('Animation Duration: ' + timeline.time() + 's');

        // Show a CTA or any animations outside main timeline
        // TweenMax.from( cta, 0.4, { y: '110%' } );
        // TweenMax.to( cta, 0.4, { opacity: 1 } );
    };
})();