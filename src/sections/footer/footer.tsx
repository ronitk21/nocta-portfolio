import { LogoIcon } from '@/components/icons/logo-icon';
import { useLenis } from '@/lib/lenis-context';
import { footerLinks, footerSocialLinks } from '@/sections/footer/_constants/footer';
import type { MouseEvent } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollTo } = useLenis();

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    scrollTo(target);
  };

  return (
    <footer className="w-full">
      <div className="border-border/80 mx-auto grid w-full gap-8 border-x border-dashed px-4 py-8 md:max-w-5xl md:grid-cols-[minmax(0,1fr)_120px] md:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="text-foreground flex items-center gap-2">
              <LogoIcon className="size-4" />
              <p className="text-sm font-medium">Ronit Kedia</p>
            </div>
            <p className="text-foreground/70 max-w-xs text-xs leading-relaxed">
              Use this placeholder copy to describe your focus, niche, or the type of projects you
              love working on.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {footerSocialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group text-foreground/70 hover:text-foreground ease-out-quad focus-visible:ring-ring/50 focus-visible:ring-offset-ring-offset/50 flex size-6 items-center justify-center rounded transition-[color,shadow] duration-100 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground text-xs">Navigation</p>
          <ul className="text-foreground/70 space-y-2 text-xs">
            {footerLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={event => handleNavigationClick(event, link.href)}
                  className="hover:text-foreground ease-out-quad focus-visible:ring-ring/50 focus-visible:ring-offset-ring-offset/50 rounded transition-[color,shadow] duration-100 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-foreground/70 border-border/80 border-t text-xs">
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-1 px-4 py-4 md:max-w-5xl md:flex-row md:px-2">
          <p>© {currentYear} Ronit Kedia.</p>
          {/* <p>
						Let visitors know where you work from or the type of collaborations
						you take on.
					</p> */}
        </div>
      </div>
    </footer>
  );
}
