import Link from "next/link";

interface StarburstStickerProps {
    href?: string;
    text: string;
    className?: string;
}

export default function StarburstSticker( props: StarburstStickerProps ) {
    return (
      <div className={`relative inline-block scale-40 ${props.className}`}>
        {/* Starburst rays */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-32 bg-linear-to-t from-yellow-400 via-orange-500 to-transparent origin-bottom"
              style={{
                transform: `rotate(${i * 30}deg)`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
        
        {/* Main badge */}
        <div className="relative z-10 bg-linear-to-br from-red-600 to-orange-600 p-2 rounded-full shadow-2xl">
          <div className="bg-yellow-400 p-[3px] rounded-full">
            <div className="bg-red-600 rounded-full px-12 py-10 flex items-center justify-center w-full!">
              <span 
                className="text-4xl font-black text-yellow-300 tracking-wider leading-normal"
                style={{ 
                  textShadow: '3px 3px 0 #991b1b, 4px 4px 0 #7f1d1d, 5px 5px 10px rgba(0,0,0,0.5)'
                }}
              >
                <Link href={props.href || '/waitlist'}>{props.text}</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }