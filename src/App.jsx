import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./App.css";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const horizontalRef = useRef();
  const verticalRef = useRef();

  useGSAP(
    () => {
      // 가로 스크롤 애니메이션
      const horizontalSections = gsap.utils.toArray(".horizontal-item");
      const horizontalTween = gsap.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () =>
            `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 세로 스크롤 애니메이션, horizontalTween과 연동
      gsap.utils.toArray(".vertical-item").forEach((item) => {
        gsap.to(item, {
          y: 100,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            containerAnimation: horizontalTween, // 가로 스크롤 애니메이션과 연동
            // markers: true, // 디버깅을 위한 마커 활성화
          },
        });
      });
    },
    { scope: horizontalRef }
  );

  return (
    <div>
      {/* 페이지 상단 섹션 */}
      <section className="section flex-center column">
        <h2>Horizontal and Vertical Scroll Animations</h2>
      </section>

      {/* 가로 스크롤 컨테이너 */}
      <div className="horizontal-container" ref={horizontalRef}>
        <div className="horizontal-item">Section 1</div>
        <div className="horizontal-item">Section 2</div>
        <div className="horizontal-item">Section 3</div>
      </div>

      {/* 세로 스크롤 컨테이너 */}
      <div className="vertical-container" ref={verticalRef}>
        <div className="vertical-item">Vertical 1</div>
        <div className="vertical-item">Vertical 2</div>
        <div className="vertical-item">Vertical 3</div>
      </div>
    </div>
  );
};

export default App;
