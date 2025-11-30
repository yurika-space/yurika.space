import "../component_stylesheets/haccelerator.css";
import Typewriter from "../atoms/Typewriter";
import ComponentHeader from "../atoms/ComponentHeader";
import ComponentBody from "../atoms/ComponentBody";
import HealthBar from "../molecules/HealthBar";
import StarburstSticker from "../atoms/StarburstSticker";
import NesHeart from "../atoms/NesHeart";
import '@/components/component_stylesheets/mission.css';

export default function Haccelerator() {
  return (
    <section className="relative min-h-screen w-full bg-yurika-bg-primary py-2 px-4">
      {/* Animated grid background - stays in background */}
      <div className="grid-bg-subtle absolute inset-0 opacity-30" />

      {/* Floating particles - stays in background */}
      <div className="pixel-particles" />

      {/* Content container - naturally flows */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up pt-8">
          <ComponentHeader title="Haccelerator Program" item=" ★ " className="-mt-18 sm:-mt-26! mb-8"/>
          <Typewriter
            text="16 WEEKS TO LAUNCH"
            speed={100}
            delay={10000}
            className="font-sixtyfour text-2xl tracking-wide mb-8 glitch-text-subtle leading-relaxed"
          />

          <ComponentBody>
            <p className="font-pixel text-xl md:text-2xl lg:text-3xl tracking-normal leading-relaxed py-10">
              From idea to launch, we&apos;ll provide tech and business support,
              because we can&apos;t all go to Harvard, Wharton, or whatever
              fancy school is gatekeeping success this week.
              <br />
              <br />
              We&apos;re here to help you get your idea off the ground and into
              the world.
            </p>
          </ComponentBody>
        </div>

        {/* Stats display - Gaming UI style */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center my-8 animate-fade-in-up w-full md:-mt-4 "
          style={{ animationDelay: "0.2s" }}
        >
            <ComponentBody>
              <section className="flex w-full justify-between items-center mb-2">
              <span className="font-pixel text-[1.1rem] tracking-normal leading-relaxed">
                Support Level
              </span>
              <span className="font-pixel text-[1.1rem] tracking-normal leading-relaxed max-glow">MAX</span>
              </section>
              <HealthBar value={100} variant="retro" animateOnView />
            </ComponentBody>
          </div>
        {/* CTA Section */}
        <div
          className=" text-center animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="font-pixel text-base game-ui-box p-4 pb-14">
              * Free for accepted applicants. Equity-free. No strings attached.
              Just pure support for the weird and wonderful.
            </p>
            <StarburstSticker
              text="Join Waitlist"
              className="font-press-start-2p text-[10px]! animate-shimmer -mt-22 cursor-pointer"
            />
          </div>
          {window.innerWidth >= 1024 ? <div
          className="flex justify-center lg:mt-26! xl:hidden animate-fade-in-up"
          style={{ animationDelay: "1.6s" }}
        >
          <div className="pixel-hearts-row space-x-4">
            <span className="pixel-heart"><NesHeart variant="full" size={8} /></span>
            <span className="pixel-heart delay-1"><NesHeart variant="full" size={8} /></span>
            <span className="pixel-heart delay-2"><NesHeart variant="full" size={8} /></span>
            <span className="pixel-heart delay-3"><NesHeart variant="half" size={8} /></span>
          </div>
        </div> : null}
        </div>
      </div>
    </section>
  );
}
