'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Easing functions (simplified versions of AJS easing)
const easeInBack = (start: number, end: number, duration: number, currentFrame: number): number => {
  const t = currentFrame / duration;
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return start + (end - start) * (c3 * t * t * t - c1 * t * t);
};

const easeOutBack = (start: number, end: number, duration: number, currentFrame: number): number => {
  const t = currentFrame / duration;
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return start + (end - start) * (1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2));
};

const TactusWebsite: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navState, setNavState] = useState<'menu' | 'arrow'>('menu');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const topLineRef = useRef<SVGPathElement>(null);
  const middleLineRef = useRef<SVGPathElement>(null);
  const bottomLineRef = useRef<SVGPathElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(1);
  const animationStateRef = useRef({
    menuDisappearComplete: false,
    arrowAppearComplete: false,
    arrowDisappearComplete: false,
    menuAppearComplete: false
  });

  // Animation functions
  const menuDisappearAnimation = useCallback(() => {
    const currentFrame = animationFrameRef.current++;
    const duration = 15;
    
    if (currentFrame <= duration) {
      requestAnimationFrame(() => {
        if (topLineRef.current && bottomLineRef.current) {
          const topLineY = easeInBack(37, 50, duration, currentFrame);
          const bottomLineY = easeInBack(63, 50, duration, currentFrame);
          
          topLineRef.current.setAttribute('d', `M30,${topLineY} L70,${topLineY}`);
          bottomLineRef.current.setAttribute('d', `M30,${bottomLineY} L70,${bottomLineY}`);
        }
        menuDisappearAnimation();
      });
    } else {
      if (middleLineRef.current) {
        middleLineRef.current.style.opacity = '0';
      }
      animationFrameRef.current = 1;
      animationStateRef.current.menuDisappearComplete = true;
      openMenuAnimation();
    }
  }, []);

  const arrowAppearAnimation = useCallback(() => {
    const currentFrame = animationFrameRef.current++;
    const duration = 15;
    
    if (currentFrame <= duration) {
      requestAnimationFrame(() => {
        if (topLineRef.current && bottomLineRef.current) {
          const topLeftX = easeOutBack(30, 35, duration, currentFrame);
          const topLeftY = easeOutBack(50, 35, duration, currentFrame);
          const bottomRightX = easeOutBack(70, 65, duration, currentFrame);
          const bottomRightY = easeOutBack(50, 65, duration, currentFrame);
          
          const bottomLeftX = easeOutBack(30, 35, duration, currentFrame);
          const bottomLeftY = easeOutBack(50, 65, duration, currentFrame);
          const topRightX = easeOutBack(70, 65, duration, currentFrame);
          const topRightY = easeOutBack(50, 35, duration, currentFrame);
          
          topLineRef.current.setAttribute('d', `M${topLeftX},${topLeftY} L${bottomRightX},${bottomRightY}`);
          bottomLineRef.current.setAttribute('d', `M${bottomLeftX},${bottomLeftY} L${topRightX},${topRightY}`);
        }
        arrowAppearAnimation();
      });
    } else {
      animationFrameRef.current = 1;
      animationStateRef.current.arrowAppearComplete = true;
      openMenuAnimation();
    }
  }, []);

  const openMenuAnimation = useCallback(() => {
    if (!animationStateRef.current.menuDisappearComplete) {
      menuDisappearAnimation();
    } else if (!animationStateRef.current.arrowAppearComplete) {
      arrowAppearAnimation();
    }
  }, [menuDisappearAnimation, arrowAppearAnimation]);

  const arrowDisappearAnimation = useCallback(() => {
    const currentFrame = animationFrameRef.current++;
    const duration = 15;
    
    if (currentFrame <= duration) {
      requestAnimationFrame(() => {
        if (topLineRef.current && bottomLineRef.current) {
          const topLeftX = easeInBack(35, 30, duration, currentFrame);
          const topLeftY = easeInBack(35, 50, duration, currentFrame);
          const bottomRightX = easeInBack(65, 70, duration, currentFrame);
          const bottomRightY = easeInBack(65, 50, duration, currentFrame);
          
          const bottomLeftX = easeInBack(35, 30, duration, currentFrame);
          const bottomLeftY = easeInBack(65, 50, duration, currentFrame);
          const topRightX = easeInBack(65, 70, duration, currentFrame);
          const topRightY = easeInBack(35, 50, duration, currentFrame);
          
          topLineRef.current.setAttribute('d', `M${topLeftX},${topLeftY} L${bottomRightX},${bottomRightY}`);
          bottomLineRef.current.setAttribute('d', `M${bottomLeftX},${bottomLeftY} L${topRightX},${topRightY}`);
        }
        arrowDisappearAnimation();
      });
    } else {
      if (middleLineRef.current) {
        middleLineRef.current.style.opacity = '1';
      }
      animationFrameRef.current = 1;
      animationStateRef.current.arrowDisappearComplete = true;
      closeMenuAnimation();
    }
  }, []);

  const menuAppearAnimation = useCallback(() => {
    const currentFrame = animationFrameRef.current++;
    const duration = 15;
    
    if (currentFrame <= duration) {
      requestAnimationFrame(() => {
        if (topLineRef.current && bottomLineRef.current) {
          const topLineY = easeOutBack(50, 37, duration, currentFrame);
          const bottomLineY = easeOutBack(50, 63, duration, currentFrame);
          
          topLineRef.current.setAttribute('d', `M30,${topLineY} L70,${topLineY}`);
          bottomLineRef.current.setAttribute('d', `M30,${bottomLineY} L70,${bottomLineY}`);
        }
        menuAppearAnimation();
      });
    } else {
      animationFrameRef.current = 1;
      animationStateRef.current.menuAppearComplete = true;
      closeMenuAnimation();
    }
  }, []);

  const closeMenuAnimation = useCallback(() => {
    if (!animationStateRef.current.arrowDisappearComplete) {
      arrowDisappearAnimation();
    } else if (!animationStateRef.current.menuAppearComplete) {
      menuAppearAnimation();
    }
  }, [arrowDisappearAnimation, menuAppearAnimation]);

  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
    
    if (navState === 'menu') {
      openMenuAnimation();
      setNavState('arrow');
      animationStateRef.current.arrowDisappearComplete = false;
      animationStateRef.current.menuAppearComplete = false;
    } else {
      closeMenuAnimation();
      setNavState('menu');
      animationStateRef.current.menuDisappearComplete = false;
      animationStateRef.current.arrowAppearComplete = false;
    }
  };

  // Cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (!cursorVisible) {
        setCursorVisible(true);
      }
    };

    const handleMouseOut = () => {
      setCursorVisible(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setCursorVisible(true);
    };

    const handleTouchEnd = () => {
      setTimeout(() => setCursorVisible(false), 200);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [cursorVisible]);

  // Services cards animation
  useEffect(() => {
    const currentRef = servicesRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !servicesVisible) {
            setServicesVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [servicesVisible]);

  // About section animation
  useEffect(() => {
    const currentRef = aboutRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !aboutVisible) {
            setAboutVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [aboutVisible]);

  // Stats counter animation
  useEffect(() => {
    const currentRef = statsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [statsVisible]);

  // Animate counters with smooth easing
  useEffect(() => {
    if (statsVisible) {
      const duration = 2500; // 2.5 seconds for smoother animation
      const target1 = 250;
      const target2 = 15;
      const startTime = Date.now();
      
      // Smoother easing function - easeOutExpo
      const easeOutExpo = (t: number): number => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        
        setCount1(Math.round(eased * target1));
        setCount2(Math.round(eased * target2));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [statsVisible]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans relative overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
          
          * {
            box-sizing: border-box;
            cursor: none;
          }
          
          html, body {
            background: #efefef;
            color: #212121;
            font-family: 'Montserrat', sans-serif;
            font-size: 16px;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          
          ::selection {
            background: #efefef;
            color: #212121;
            mix-blend-mode: difference;
          }
          
          ::-moz-selection {
            background: #efefef;
            color: #212121;
          }
          
          h1, h2, h3, h4, h5 {
            font-weight: 900;
          }
          
          h1 {
            font-size: 3em;
          }
          
          .hero-title {
            font-size: 8vw;
            line-height: 1em;
            font-weight: 900;
          }
          
          .nav-title {
            font-size: 4em;
          }
          
          a {
            transition: all .25s ease-in-out;
          }
          
          .white, a.white {
            color: #efefef;
          }
          
          .black {
            color: #212121;
          }
          
          .pearl, a.pearl {
            color: #fff;
          }
          
          .green, a.green {
            color: #00BCD4;
          }
          
          .pink {
            color: #b73b3b;
          }
          
          .blend {
            mix-blend-mode: difference !important;
            color: #efefef;
            position: relative;
            z-index: 2;
          }
          
          .bg-black {
            background-color: #212121;
          }
          
          .bg-green {
            background-color: #00BCD4;
          }
          
          .bg-topographic {
            background-image: url(https://assets.codepen.io/319606/bg-topographic.svg);
            background-size: 5000px;
            opacity: .1;
            pointer-events: none;
          }
          
          .custom-cursor {
            position: fixed;
            opacity: ${cursorVisible ? 1 : 0};
            pointer-events: none;
            mix-blend-mode: difference;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #00BCD4;
            transition: transform 350ms ease, opacity 0.3s ease;
            transform: translate(-50%, -50%) scale(${cursorHover ? 1.25 : 0.3});
            z-index: 1000;
            top: ${cursorPosition.y}px;
            left: ${cursorPosition.x}px;
          }
          
          .swoosh {
            background-image: url('https://assets.codepen.io/319606/2023-logo-swoosh.svg');
            background-size: 100%;
            background-repeat: no-repeat;
            top: 20px;
            left: 18px;
            width: 230px;
            height: 45px;
            z-index: 1000;
            background-position: left;
          }
          
          .sticky-nav {
            top: 20px;
            left: 20px;
            position: fixed;
            width: calc(100% - 40px);
            z-index: 999;
          }
          
          .sticky-nav.difference {
            background-repeat: no-repeat;
            background-size: contain;
            mix-blend-mode: difference;
          }
          
          .logo {
            width: 220px;
            height: 45px;
            background-image: url(https://assets.codepen.io/319606/2023-logo-white.svg);
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: left;
            z-index: 998;
          }
          
          #nav-btn {
            width: 60px;
            z-index: 999;
            filter: invert(1);
          }
          
          .sticky-nav.difference #nav-btn {
            filter: invert(0);
          }
          
          .icon {
            position: relative;
            width: 100%;
            height: 100%;
            fill: none;
            stroke-width: 8;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: #fff;
          }
          
          #takeover-nav {
            position: fixed;
            width: 100vw;
            height: 100vh;
            overflow-y: auto;
            left: 0;
            top: ${isNavOpen ? '0' : '-200%'};
            transition: all .5s ease-in-out;
            z-index: 996;
          }
          
          .nav-col {
            min-height: 100vh;
          }
          
          .nav-col a {
            color: #efefef;
          }
          
          .nav-col a:hover {
            color: #212121;
          }
          
          .nav-contact .content {
            max-width: 700px;
          }
          
          .nav-items {
            font-size: 2.5em;
            font-weight: 700;
          }
          
          .contact-items {
            font-size: 1.25em;
            font-weight: 700;
          }
          
          .contact-items a:hover {
            color: #00BCD4;
          }
          
          .social {
            font-size: .75em;
          }
          
          .social a {
            color: #00BCD4;
          }
          
          .social a:hover {
            color: #efefef;
          }
          
          .gradient-overlay {
            bottom: 0;
            height: 50%;
            background: linear-gradient(to bottom, rgba(33,33,33,0) 0%, rgba(33,33,33,1) 50%);
            z-index: 1;
            border-bottom-right-radius: 15vw;
            pointer-events: none;
          }
          
          .video-wrap {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-bottom-right-radius: 15vw;
            pointer-events: none;
          }
          
          #video-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            min-width: 100%;
            background-position: center center;
            background-size: cover;
            object-fit: cover;
            transform: rotate(180deg);
          }
          
          section {
            min-height: 800px;
            height: auto;
            width: 100%;
          }
          
          .hero {
            background-color: #212121;
            border-bottom-right-radius: 15vw;
            position: relative;
            min-height: 100vh;
            height: 100vh;
          }
          
          .hero:before {
            content: "";
            background-color: #212121;
            position: absolute;
            top: 100%;
            left: 0;
            width: 15vw;
            height: 15vw;
          }
          
          .hero:after {
            content: "";
            background-color: #efefef;
            position: absolute;
            top: 100%;
            left: 0;
            width: 15vw;
            height: 15vw;
            border-top-left-radius: 15vw;
          }
          
          .two {
            background-color: #efefef;
          }
          
          .three {
            background-color: #e8d1f6;
          }
          
          .four {
            background-color: #00BCD4;
          }
          
          .five {
            background-color: #29639c;
          }
          
          @media screen and (max-width: 1199px) {
            .hero {
              height: auto;
              min-height: 100vh;
            }
            
            #video-bg {
              object-position: 0 15vw;
            }
            
            section {
              min-height: auto;
              padding: 60px 0;
            }
          }
          
          @media screen and (max-width: 767px) {
            .nav-menu {
              min-height: 500px;
            }
            
            .nav-menu a {
              color: #212121;
            }
            
            .nav-menu a:hover {
              color: #efefef;
            }
            
            .nav-contact {
              min-height: 600px;
            }
            
            .nav-contact .nav-title {
              font-size: 2.5em;
            }
            
            section {
              padding: 40px 0;
            }
            
            .hero {
              min-height: 80vh;
            }
          }
          
          @media screen and (max-width: 575px) {
            .swoosh {
              width: 165px;
              height: 35px;
              top: 10px;
            }
            
            .sticky-nav {
              top: 10px;
            }
            
            .logo {
              width: 150px;
              height: 35px;
            }
            
            #nav-btn {
              width: 40px;
            }
            
            .contact-items {
              font-size: 1em;
            }
            
            .hero {
              min-height: 100vh;
            }
            
            .hero-title {
              font-size: 15vw;
              line-height: 0.9;
            }
            
            #video-bg {
              object-position: 0 30vw;
            }
            
            section {
              padding: 32px 0;
            }
            
            .nav-items {
              font-size: 1.8em;
            }
            
            .nav-title {
              font-size: 2em !important;
            }
          }
        `}
      </style>

      <div className="page">
        <header>
          <div className="swoosh fixed"></div>
          <div className={`sticky-nav flex justify-between ${isNavOpen ? 'difference' : ''}`}>
            <div className="logo"></div>
            <div 
              id="nav-btn" 
              className="menu box cursor-pointer"
              onClick={handleNavClick}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <svg id="i1" className="icon" viewBox="20 30 60 40">
                <path ref={topLineRef} id="top-line-1" d="M30,37 L70,37 Z"></path>
                <path ref={middleLineRef} id="middle-line-1" d="M30,50 L70,50 Z"></path>
                <path ref={bottomLineRef} id="bottom-line-1" d="M30,63 L70,63 Z"></path>
              </svg>
            </div>
          </div>
          
          <div id="takeover-nav">
            <div className="w-full">
              <div className="flex flex-col md:flex-row">
                <div className="nav-col nav-contact w-full md:w-7/12 bg-black flex items-center justify-center relative py-20 px-4 order-1 md:order-0">
                  <div className="absolute w-full h-full bg-topographic"></div>
                  <div className="content relative max-w-2xl">
                    <h2 className="nav-title white mb-20">
                      Ihre digitale Zukunft beginnt hier<span className="inline green">.</span>
                    </h2>
                    <ul className="contact-items white list-none mb-20">
                      <li className="pb-4">
                        <a 
                          className="no-underline" 
                          href="#"
                          onMouseEnter={() => setCursorHover(true)}
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          +41 44 123 45 67
                        </a>
                      </li>
                      <li className="pb-4">
                        <a 
                          className="no-underline" 
                          href="#"
                          onMouseEnter={() => setCursorHover(true)}
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          kontakt@digitalvision.ch
                        </a>
                      </li>
                      <li>
                        <a 
                          className="no-underline" 
                          href="#"
                          onMouseEnter={() => setCursorHover(true)}
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          Bahnhofstrasse 42, 8001 Zürich
                        </a>
                      </li>
                    </ul>
                    <div className="social">
                      <a 
                        className="no-underline green" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        linkedin
                      </a>
                      <span className="mx-2 white">|</span>
                      <a 
                        className="no-underline green" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        facebook
                      </a>
                      <span className="mx-2 white">|</span>
                      <a 
                        className="no-underline green" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        instagram
                      </a>
                    </div>
                  </div>
                </div>
                <div className="nav-col nav-menu w-full md:w-5/12 bg-green flex items-center pt-20 pb-12 md:pb-20 px-4 md:px-20 order-0 md:order-1">
                  <ul className="nav-items list-none">
                    <li className="pb-3">
                      <a 
                        className="no-underline" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        Leistungen
                      </a>
                    </li>
                    <li className="pb-3">
                      <a 
                        className="no-underline" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        Portfolio
                      </a>
                    </li>
                    <li className="pb-3">
                      <a 
                        className="no-underline" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        Kontakt
                      </a>
                    </li>
                    <li>
                      <a 
                        className="no-underline" 
                        href="#"
                        onMouseEnter={() => setCursorHover(true)}
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        Über uns
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="hero flex items-center justify-center">
          <div className="video-wrap">
            <video autoPlay playsInline loop muted id="video-bg">
              <source src="https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4" type="video/mp4" />
              <source src="https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute w-full gradient-overlay"></div>
          <div className="content relative text-center mb-20">
            <h1 className="hero-title blend">
              Where Creativity 
              <br />
              &amp; Strategy Meet
            </h1>
          </div>
        </section>

        <section className="two relative">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-4 sm:mb-6"
                style={{
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                Unsere Expertise<span className="text-[#00BCD4]">.</span>
              </h2>
              <p 
                className="text-lg sm:text-xl text-center text-gray-600 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
                style={{
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0.2s'
                }}
              >
                Von Zürich für die Schweiz und die Welt – massgeschneiderte digitale Lösungen mit Schweizer Qualität.
              </p>
              
              <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div 
                  className="text-center p-6 sm:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                  style={{
                    opacity: servicesVisible ? 1 : 0,
                    transform: servicesVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.4s'
                  }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00BCD4] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-white text-xl sm:text-2xl font-bold">W</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Webentwicklung</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Responsive Websites und Web-Apps, die höchsten Schweizer Qualitätsstandards entsprechen.
                  </p>
                </div>

                <div 
                  className="text-center p-6 sm:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                  style={{
                    opacity: servicesVisible ? 1 : 0,
                    transform: servicesVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.65s'
                  }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00BCD4] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-white text-xl sm:text-2xl font-bold">M</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">E-Commerce Lösungen</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Professionelle Online-Shops mit Anbindung an Schweizer Zahlungssysteme wie TWINT und PostFinance.
                  </p>
                </div>

                <div 
                  className="text-center p-6 sm:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                  style={{
                    opacity: servicesVisible ? 1 : 0,
                    transform: servicesVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.9s'
                  }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00BCD4] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-white text-xl sm:text-2xl font-bold">B</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Cloud & Hosting</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Sichere Hosting-Lösungen auf Schweizer Servern mit DSGVO-Konformität und höchstem Datenschutz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="three relative">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-4 sm:mb-6">
                Referenzprojekte<span className="text-[#00BCD4]">.</span>
              </h2>
              <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
                Erfolgsgeschichten aus der Schweiz – von KMU bis zu internationalen Konzernen.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div 
                  className="relative group"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <div className="bg-gradient-to-br from-[#00BCD4] to-[#29639c] rounded-lg p-6 sm:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Schweizer Uhrenmanufaktur</h3>
                    <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
                      Mehrsprachiger Online-Shop für Luxusuhren mit Integration von TWINT, PostFinance und internationalen Zahlungsmethoden. Umsatzsteigerung von 280% im ersten Jahr.
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">Next.js</span>
                      <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">Shopify</span>
                      <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">Stripe</span>
                    </div>
                  </div>
                </div>

                <div 
                  className="relative group"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <div className="bg-gradient-to-br from-[#b73b3b] to-[#29639c] rounded-lg p-6 sm:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Fintech Startup Zürich</h3>
                    <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
                      Sichere Banking-Plattform mit höchsten Schweizer Sicherheitsstandards. Hosting auf Schweizer Servern, FINMA-konform und vollständig DSGVO-compliant.
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">TypeScript</span>
                      <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">PostgreSQL</span>
                      <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">Swiss Cloud</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 sm:mt-12">
                <a 
                  href="#" 
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#212121] text-white text-base sm:text-lg font-bold rounded-lg hover:bg-[#00BCD4] transition-all duration-300"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  Alle Projekte ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="four relative">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 px-4">
                Bereit für Ihren digitalen Durchbruch<span className="text-[#efefef]">?</span>
              </h2>
              <p className="text-lg sm:text-xl mb-10 sm:mb-12 opacity-90 px-4">
                Profitieren Sie von Schweizer Qualität, Präzision und Innovation. Wir begleiten Sie auf Ihrem Weg zum digitalen Erfolg.
              </p>
              
              <div ref={statsRef} className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
                <div className="text-center">
                  <div 
                    className="text-3xl sm:text-4xl font-black mb-2"
                    style={{
                      opacity: statsVisible ? 1 : 0,
                      transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: '0.1s'
                    }}
                  >
                    {count1}+
                  </div>
                  <div 
                    className="text-base sm:text-lg opacity-80"
                    style={{
                      opacity: statsVisible ? 0.8 : 0,
                      transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.6s ease-out',
                      transitionDelay: '0.3s'
                    }}
                  >
                    Schweizer Unternehmen
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-3xl sm:text-4xl font-black mb-2"
                    style={{
                      opacity: statsVisible ? 1 : 0,
                      transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: '0.2s'
                    }}
                  >
                    {count2} Jahre
                  </div>
                  <div 
                    className="text-base sm:text-lg opacity-80"
                    style={{
                      opacity: statsVisible ? 0.8 : 0,
                      transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.6s ease-out',
                      transitionDelay: '0.4s'
                    }}
                  >
                    Erfahrung
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black mb-2">
                    <span style={{ 
                      display: 'inline-block',
                      opacity: statsVisible ? 1 : 0,
                      transform: statsVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)',
                      transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: '0.3s'
                    }}>ISO</span>
                  </div>
                  <div 
                    className="text-base sm:text-lg opacity-80"
                    style={{
                      opacity: statsVisible ? 0.8 : 0,
                      transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.6s ease-out',
                      transitionDelay: '0.5s'
                    }}
                  >
                    Zertifiziert
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <a 
                  href="#" 
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#00BCD4] text-base sm:text-lg font-bold rounded-lg hover:bg-[#efefef] transition-all duration-300"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  Offerte anfragen
                </a>
                <a 
                  href="#" 
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white text-base sm:text-lg font-bold rounded-lg hover:bg-white hover:text-[#00BCD4] transition-all duration-300"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  Kostenlose Beratung
                </a>
              </div>
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="five relative">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
                <div
                  style={{
                    opacity: aboutVisible ? 1 : 0,
                    transform: aboutVisible ? 'translateX(0)' : 'translateX(-60px)',
                    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-white">
                    Über uns<span className="text-[#00BCD4]">.</span>
                  </h2>
                  <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
                    Seit 2009 entwickeln wir vom Herzen Zürichs aus digitale Lösungen für anspruchsvolle 
                    Schweizer Unternehmen. Mit einem Team von 25 Spezialisten verbinden wir Schweizer Präzision 
                    mit modernster Technologie. Alle unsere Lösungen werden DSGVO-konform auf Schweizer Servern gehostet.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00BCD4] rounded-full flex-shrink-0"></div>
                      <span className="text-white/90 text-base sm:text-lg">Schweizer Hosting & Datenschutz</span>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00BCD4] rounded-full flex-shrink-0"></div>
                      <span className="text-white/90 text-base sm:text-lg">Mehrsprachig: DE, FR, IT, EN</span>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00BCD4] rounded-full flex-shrink-0"></div>
                      <span className="text-white/90 text-base sm:text-lg">ISO 27001 zertifiziert</span>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00BCD4] rounded-full flex-shrink-0"></div>
                      <span className="text-white/90 text-base sm:text-lg">Support in allen Landessprachen</span>
                    </div>
                  </div>
                </div>

                <div 
                  className="relative"
                  style={{
                    opacity: aboutVisible ? 1 : 0,
                    transform: aboutVisible ? 'translateX(0)' : 'translateX(60px)',
                    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.3s'
                  }}
                >
                  <div 
                    className="bg-gradient-to-br from-[#00BCD4]/20 to-[#efefef]/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/20"
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <blockquote className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 italic">
                      "Dank der professionellen Umsetzung konnten wir unseren Online-Umsatz verdoppeln. 
                      Die Kombination aus Schweizer Qualität und innovativer Technologie überzeugt."
                    </blockquote>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00BCD4] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-base">PM</span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm sm:text-base">Peter Müller</div>
                        <div className="text-white/70 text-xs sm:text-sm">Geschäftsführer, SwissTime AG</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="custom-cursor"></div>
    </div>
  );
};

export default TactusWebsite;

