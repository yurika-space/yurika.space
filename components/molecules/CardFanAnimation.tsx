"use client";

import "@/components/stylesheets/join-the-fight.css";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ComponentHeader from "../atoms/ComponentHeader";

const cards = [
  {
    id: 1,
    header: { title: "CREATORS", item: " ⚔️ " },
    image: {
      src: "/king_cups.png",
      alt: "Knight of Cups - For Creators",
      width: 1455,
      height: 900,
      className: "-mt-35 pr-5",
    },
    description:
      "Serious about making a difference but no idea where to start?",
    buttons: [
      {
        label: "Join our Waitlist",
        icon: "→",
        className: "quest-button creator",
      },
    ],
    animationDelay: 0.2,
  },
  {
    id: 2,
    header: { title: "PARTNERS", item: " 🤝 " },
    image: {
      src: "/three_cups.png",
      alt: "Three of Cups - For Partners",
      width: 1455,
      height: 900,
      className: "-mt-20 pr-6",
    },
    description: "There's more to collaboration than just financial support.",
    buttons: [
      {
        label: "Book a Meeting",
        icon: "📅",
        className: "quest-button partner",
      },
    ],
    animationDelay: 0.4,
  },
  {
    id: 3,
    header: { title: "SPONSORS", item: " 💰 " },
    image: {
      src: "/six_coins.png",
      alt: "Six of Pentacles - For Sponsors",
      width: 1455,
      height: 900,
      className: "-mt-25 pr",
    },
    description: "It's time to put your money where your mouth is.",
    buttons: [
      {
        label: "Donate",
        icon: "💵",
        className: "quest-button sponsor",
      },
      {
        label: "Request Pitch Deck",
        icon: "📖",
        className: "quest-button sponsor-alt",
      },
    ],
    animationDelay: 0.6,
  },
];

const CardFanAnimation = () => {
  const [isSpread, setIsSpread] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [cardOrder, setCardOrder] = useState(() =>
    cards.map((card) => card.id)
  );
  const totalDegrees = 60;
  const spreadY = -50;
  const stackY = 0;

  const orderedCards = cardOrder.map(
    (cardId) => cards.find((card) => card.id === cardId)!
  );
  const totalCards = orderedCards.length;

  const handleCardHover = (cardId: number) => {
    setHoveredCardId(cardId);
    setCardOrder((previousOrder) => {
      if (previousOrder[0] === cardId) {
        return previousOrder;
      }
      return [cardId, ...previousOrder.filter((id) => id !== cardId)];
    });
  };

  const resetDeck = () => {
    setIsSpread(true);
    setHoveredCardId(null);
    setCardOrder(cards.map((card) => card.id));
  };

  return (
    <div className="relative-center items-center align-middle flex-col w-screen min-h-[60vh]">
      <div
        className="relative cursor-pointer mx-auto top-20 "
        onMouseEnter={() => setIsSpread(!isSpread)}
        onMouseLeave={resetDeck}
      >
        <AnimatePresence>
          {orderedCards.map((card, index) => {
            const angle =
              (index - (totalCards - 1) / 2) *
              (totalDegrees / (totalCards - 1 || 1));
            const baseZIndex = totalCards - index;
            const zIndex =
              hoveredCardId === card.id ? totalCards + 1 : baseZIndex;

            return (
              <motion.div
                key={card.id}
                className="absolute w-64 h-104 pointer-events-auto inset-0 mx-auto"
                onMouseEnter={() => handleCardHover(card.id)}
                initial={{ rotate: 0, y: stackY }}
                animate={{
                  rotate: isSpread ? angle : 0,
                  y: isSpread ? spreadY : stackY,
                  transformOrigin: "bottom center",
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: isSpread
                    ? index * 0.05
                    : (totalCards - 1 - index) * 0.05,
                }}
                style={{
                  zIndex,
                }}
              >
                <div
                  className="tarot-card h-full w-full flex flex-col justify-between bg-linear-to-b from-yurika-bg-primary/80 to-yurika-bg-secondary/40 shadow-2xl"
                  style={{ animationDelay: `${card.animationDelay}s` }}
                >
                  <div className="tarot-card-image flex flex-col items-center justify-center space-y-6">
                    <ComponentHeader
                      title={card.header.title}
                      item={card.header.item}
                      className="text-foreground pt-0"
                    />
                    <div className="px-4 w-full">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        width={card.image.width}
                        height={card.image.height}
                        className={`w-full object-contain ${card.image.className}`}
                        priority
                      />
                    </div>
                  </div>

                  <div className="tarot-card-content px-6 pb-8">
                    <p className="font-mono text-sm text-yurika-text-primary leading-relaxed">
                      {card.description}
                    </p>
                    <div className="space-y-3 mt-6">
                      {card.buttons.map((button) => (
                        <button
                          key={button.label}
                          className={button.className}
                          type="button"
                        >
                          <span className="button-glow" />
                          <span className="button-text">{button.label}</span>
                          <span className="button-icon">{button.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardFanAnimation;
