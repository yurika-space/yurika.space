import { cn } from "@/lib/utils";
import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import Button from "../atoms/Button";
import Icons from "../atoms/Icons";
import { SpaceInvader } from "../atoms/SpaceInvader";

type ModalType = "waitlist" | "call" | "donate" | null;

export default function Modals({
  activeModal,
  setActiveModal,
  submitted,
  setSubmitted,
  email,
  setEmail,
  handleSubmit,
  userType,
  setUserType,
  isSubmitting,
}: {
  activeModal: ModalType;
  setActiveModal: Dispatch<SetStateAction<ModalType>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  userType: "founder" | "investor";
  setUserType: Dispatch<SetStateAction<"founder" | "investor">>;
  isSubmitting: boolean;
}) {
  return (
    <>
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-theme-card border-2 border-[var(--primary)]/50 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-theme-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-theme-muted uppercase">
                  {activeModal === "waitlist" && "Join Waitlist"}
                  {activeModal === "call" && "Schedule Call"}
                  {activeModal === "donate" && "Support Yurika"}
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-theme-muted hover:text-foreground"
              >
                <Icons.X />
              </button>
            </div>

            <div className="p-6">
              {activeModal === "waitlist" && !submitted && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <SpaceInvader
                      size="md"
                      color="var(--primary)"
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Join the Revolution
                    </h3>
                    <p className="text-theme-muted text-sm">
                      Get early access when we launch
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-theme-muted mb-2">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["founder", "investor"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setUserType(type as "founder" | "investor")
                          }
                          className={cn(
                            "p-3 border-2 text-sm transition-all capitalize",
                            userType === type
                              ? "border-theme-primary bg-[color-mix(in_oklch,_var(--primary)_10%,_transparent)] text-theme-primary"
                              : "border-theme-border text-theme-muted"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-theme-muted mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/50 border-2 border-theme-border focus:border-theme-primary px-4 py-3 text-foreground placeholder-theme-muted outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </Button>
                  <p className="text-center text-theme-muted text-xs">
                    No spam. Just launch updates.
                  </p>
                </form>
              )}

              {activeModal === "waitlist" && submitted && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center mx-auto mb-6 text-black">
                    <Icons.Check />
                  </div>
                  <h3 className="text-xl font-bold mb-2">You&apos;re In! 🚀</h3>
                  <p className="text-theme-muted mb-6">Welcome to the uprising.</p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setActiveModal(null);
                      setSubmitted(false);
                      setEmail("");
                    }}
                  >
                    Close
                  </Button>
                </div>
              )}

              {activeModal === "call" && (
                <div className="text-center py-6">
                  <div className="text-theme-secondary mb-4">
                    <Icons.Calendar />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Let&apos;s Talk</h3>
                  <p className="text-theme-muted mb-6">
                    Book a 15-minute call to discuss partnerships or investment.
                  </p>
                  <Button variant="purple" size="lg" className="w-full">
                    Open Calendly
                  </Button>
                  <p className="text-theme-muted text-xs mt-4">
                    Or email: eureka@yurika.space
                  </p>
                </div>
              )}

              {activeModal === "donate" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-theme-destructive mb-4">
                      <Icons.Heart />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Support the Mission
                    </h3>
                    <p className="text-theme-muted text-sm">
                      Help us build the future of founder funding.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["$25", "$50", "$100"].map((amt) => (
                      <button
                        key={amt}
                        className="p-4 border-2 border-theme-border hover:border-theme-destructive hover:bg-[color-mix(in_oklch,_var(--destructive)_10%,_transparent)] transition-all font-bold"
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Custom amount ($)"
                    min="1"
                    className="w-full bg-black/50 border-2 border-theme-border focus:border-theme-destructive px-4 py-3 text-foreground placeholder-theme-muted outline-none"
                  />
                  <Button
                    size="lg"
                    className="w-full bg-theme-destructive border-theme-destructive hover:bg-[color-mix(in_oklch,_var(--destructive)_90%,_transparent)]"
                  >
                    <Icons.Heart /> Donate Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
