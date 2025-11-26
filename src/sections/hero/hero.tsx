import { Button } from '@/components/ui/button';
import { ShinyBadge } from '@/components/ui/shiny-badge';
import { gsap, premiumEase, registerGsapPlugins, SplitText } from '@/lib/gsap-config';
import { useLenis } from '@/lib/lenis-context';
import { Background } from '@/sections/hero/_components/background';
import { useGSAP } from '@gsap/react';
import { FrameIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';

registerGsapPlugins();

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(() => {
    if (typeof document === 'undefined') return false;
    if (!('fonts' in document)) return true;
    return document.fonts.status === 'loaded';
  });
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (fontsLoaded || typeof document === 'undefined') return;

    if (!('fonts' in document)) {
      setFontsLoaded(true);
      return;
    }

    let isActive = true;
    document.fonts.ready.then(() => {
      if (isActive) setFontsLoaded(true);
    });

    return () => {
      isActive = false;
    };
  }, [fontsLoaded]);

  useGSAP(
    context => {
      if (!fontsLoaded) return;

      const hero = heroRef.current;
      if (!hero) return;

      const splits: SplitText[] = [];
      context.add(() => {
        splits.forEach(s => s.revert());
      });

      const titleSplit = titleRef.current
        ? new SplitText(titleRef.current, { type: 'lines' })
        : null;

      const descriptionSplit = descriptionRef.current
        ? new SplitText(descriptionRef.current, { type: 'lines' })
        : null;

      if (titleSplit) splits.push(titleSplit);
      if (descriptionSplit) splits.push(descriptionSplit);

      const timeline = gsap.timeline({
        defaults: { ease: premiumEase },
        scrollTrigger: {
          trigger: hero,
          start: 'top 80%',
          once: true,
        },
      });

      if (badgeRef.current) {
        timeline.from(badgeRef.current, {
          yPercent: 30,
          autoAlpha: 0,
          filter: 'blur(16px)',
          duration: 0.9,
        });
      }

      if (titleSplit) {
        timeline.from(
          titleSplit.lines,
          {
            yPercent: 30,
            autoAlpha: 0,
            filter: 'blur(16px)',
            stagger: 0.15,
            duration: 0.9,
          },
          '-=0.6'
        );
      }

      if (descriptionSplit) {
        timeline.from(
          descriptionSplit.lines,
          {
            yPercent: 30,
            autoAlpha: 0,
            filter: 'blur(16px)',
            stagger: 0.15,
            duration: 0.9,
          },
          '-=0.6'
        );
      }

      if (actionsRef.current) {
        const buttons = Array.from(actionsRef.current.children) as HTMLElement[];
        timeline.fromTo(
          buttons,
          {
            yPercent: 30,
            autoAlpha: 0,
            filter: 'blur(16px)',
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            clearProps: 'filter',
            stagger: 0.15,
            duration: 0.9,
          },
          '-=0.6'
        );
      }
    },
    { scope: heroRef, dependencies: [fontsLoaded] }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex h-[50vh] w-full flex-col items-center justify-center gap-4 px-4 py-70 md:px-16 lg:py-50"
    >
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div ref={badgeRef} className="w-fit">
          <ShinyBadge>
            <FrameIcon aria-hidden="true" className="size-3.5" />
            Software Developer
          </ShinyBadge>
        </div>

        <h1
          ref={titleRef}
          className="text-foreground max-w-3xl text-center text-3xl font-medium text-balance"
        >
          Hi, I’m Ronit! 👋
        </h1>

        <p
          ref={descriptionRef}
          className="text-foreground/70 max-w-xl text-center text-base leading-relaxed font-medium text-balance md:text-lg"
        >
          I build clean, thoughtful software that solves real problems, and I love turning ideas
          into fast, simple, and intuitive digital experiences—especially the ones born from my own
          challenges. Good software should feel effortless, and that’s what I aim to create.
        </p>
      </div>

      <div ref={actionsRef} className="relative z-10 flex items-center gap-2">
        <Button variant="default" size="md" onClick={() => scrollTo('#contact')}>
          Start a project
        </Button>

        <Button variant="secondary" size="md" onClick={() => scrollTo('#works')}>
          View portfolio
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <Background />
      </div>
    </section>
  );
}
