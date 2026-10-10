'use client';
import { useState } from 'react';
import { ArrowRight, Wind, PartyPopper } from 'lucide-react';
import { opening } from './birthday-data';

function Strawberry({x,y,rotate=0}:{x:number;y:number;rotate?:number}) {
 return <g transform={`translate(${x} ${y}) rotate(${rotate})`}><path d="M0 0C-29-24-35 7-18 30Q0 57 18 30C35 7 29-24 0 0" fill="#c84b62" stroke="#a93650" strokeWidth="2"/><path d="M0 1l-13-11 10 3 3-12 4 12 12-6-11 15" fill="#8d9c66"/>{[-12,0,12].map((v,i)=><g key={v} stroke="#f8d69c" strokeWidth="2.5" strokeLinecap="round"><path d={`M${v} ${9+i%2*6}l1 2M${v*.7} ${24+i%2*5}l1 2`}/></g>)}</g>
}
function BirthdayCollage({candlesOut}:{candlesOut:boolean}){
 const [photoFailed,setPhotoFailed]=useState(false);
 const hasPhoto=Boolean(opening.photoSrc)&&!photoFailed;
 return <svg className="birthday-collage" viewBox="0 0 720 670" role="img" aria-labelledby="collage-title collage-description">
  <title id="collage-title">A very cute {opening.age}th birthday celebration</title><desc id="collage-description">Big pink {opening.age}, a birthday portrait wearing a blue party hat, a strawberry cake and a tiny party chick.</desc>
  <defs>
   <clipPath id="birthday-photo-circle"><circle cx="506" cy="293" r="114"/></clipPath>
   <pattern id="pink-sprinkles" width="27" height="24" patternUnits="userSpaceOnUse"><path d="M3 3l3 4m10 2l-3 4m8 3l3-1M5 18l4-2" stroke="#fff5e8" strokeWidth="2" strokeLinecap="round"/></pattern>
   <pattern id="hat-stars" width="76" height="64" patternUnits="userSpaceOnUse"><path d="M26 5l6 15 16 1-13 10 5 16-14-9-14 9 5-16L4 21l16-1z" fill="#ee9dbb" stroke="#fbe4ad" strokeWidth="3"/><circle cx="64" cy="52" r="7" fill="#ed9fbc" stroke="#ffe8b2" strokeWidth="2"/></pattern>
   <filter id="crayon-grain"><feTurbulence type="fractalNoise" baseFrequency=".48" numOctaves="3" seed="9" result="grain"/><feColorMatrix in="grain" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".32"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in"/><feBlend in2="SourceGraphic" mode="screen"/></filter>
  </defs>
  <g className="poster-confetti">{Array.from({length:65},(_,i)=>{const x=(i*137+13)%700,y=(i*73+9)%650;return <ellipse key={i} cx={x} cy={y} rx="3" ry="5" fill={['#eaa4b9','#b7c998','#badde1','#e8ce77'][i%4]} transform={`rotate(${i*37} ${x} ${y})`} style={{animationDelay:`${-i*.19}s`}}/>})}</g>
  <g className="poster-age"><text x="15" y="415" fontSize="282" fontFamily="Georgia,serif" fontWeight="bold" fill="#eeb2ca" stroke="#e6a3bf" strokeWidth="3" filter="url(#crayon-grain)">{opening.age}</text><text x="90" y="471" fontFamily="Caveat,cursive" fontSize="27" fill="#bb7893" transform="rotate(-7 90 471)">still a baby, obviously.</text></g>
  <g className="party-portrait">
   <circle cx="506" cy="293" r="121" fill="#fffdf6" stroke="#fffdf6" strokeWidth="7"/>
   {hasPhoto?<image href={opening.photoSrc} x="392" y="179" width="228" height="228" clipPath="url(#birthday-photo-circle)" preserveAspectRatio={opening.photoPosition} onError={()=>setPhotoFailed(true)}/>:
   <g clipPath="url(#birthday-photo-circle)"><rect x="388" y="175" width="236" height="236" fill="#f6d5c9"/><ellipse cx="506" cy="400" rx="101" ry="69" fill="#e994b8"/><circle cx="506" cy="291" r="83" fill="#f1c4a4"/><path d="M425 271q-5-101 83-96q93 2 81 99q-15-33-24-49q-23 30-69 25q-40-3-65 32" fill="#795445"/><path d="M459 287q13-17 25 0m42 0q13-17 25 0" fill="none" stroke="#62443e" strokeWidth="7" strokeLinecap="round"/><ellipse cx="450" cy="311" rx="15" ry="9" fill="#e99893" opacity=".7"/><ellipse cx="562" cy="311" rx="15" ry="9" fill="#e99893" opacity=".7"/><path d="M477 312q29 57 59 0z" fill="#a25459"/><path d="M485 316h42l-6 10h-30z" fill="#fff9ee"/><path d="M492 339q15-8 29 0" stroke="#e79294" strokeWidth="8" strokeLinecap="round"/><text x="506" y="397" textAnchor="middle" fontSize="18" fontFamily="Caveat,cursive" fill="#fffaf1">birthday queen ♡</text></g>}
   <g className="collage-party-hat"><path d="M491 43L389 218q111 47 231-8L527 42z" fill="#afe0f0" stroke="#fffdf6" strokeWidth="8" strokeLinejoin="round"/><path d="M491 43L389 218q111 47 231-8L527 42z" fill="url(#hat-stars)" stroke="#93c8e1" strokeWidth="2"/><g transform="translate(510 44)"><circle r="32" fill="#e8c363" stroke="#fff9e2" strokeWidth="5"/>{Array.from({length:12},(_,i)=><path key={i} d="M0-7l3-18" stroke="#fff1b4" strokeWidth="4" strokeLinecap="round" transform={`rotate(${i*30})`}/>)}</g></g>
  </g>
  <g className="collage-cake" transform="translate(393 451)">
   <ellipse cx="115" cy="167" rx="132" ry="11" fill="#e3d2b8" opacity=".28"/><path d="M0 25q115-31 230 0v130q-115 34-230 0z" fill="#eaa6ba" stroke="#fffaf0" strokeWidth="7"/><path d="M0 25q115-31 230 0v130q-115 34-230 0z" fill="url(#pink-sprinkles)"/>
   <path d="M0 66q20 31 40 0q20 31 40 0q20 31 40 0q20 31 40 0q20 31 40 0q16 28 30 0M0 122q20 31 40 0q20 31 40 0q20 31 40 0q20 31 40 0q20 31 40 0q16 28 30 0" fill="none" stroke="#c65370" strokeWidth="5"/>
   <ellipse cx="115" cy="25" rx="117" ry="25" fill="#f4c0d0" stroke="#bf4b65" strokeWidth="5"/><path d="M0 25q22 30 43 5q22 30 44 3q24 30 47 0q24 25 48-3q25 21 48-5" fill="none" stroke="#bf4b65" strokeWidth="4"/>
   {[22,70,123,179,217].map((x,i)=><Strawberry key={x} x={x} y={i%2?4:-5} rotate={i%2?8:-12}/>)}
   {[47,95,147,195].map((x,i)=><g key={x}><path d={`M${x} 23l${i%2?3:-3}-75`} stroke="#90cbd4" strokeWidth="5"/><path d={`M${x-1} 11l4-5m-5-12l4-5m-5-12l4-5`} stroke="#fffaf0" strokeWidth="2"/>{!candlesOut&&<g className="collage-flame"><path d={`M${x-3} -55q-15-8 0-30q15 19 0 30`} fill="#efbf55"/><path d={`M${x-3} -66v-25m-11 30l-10-5m31 5l10-6`} stroke="#f2d277" strokeWidth="3" strokeLinecap="round"/></g>}</g>)}
  </g>
  <Strawberry x={355} y={586} rotate={-22}/><Strawberry x={387} y={607} rotate={12}/>
  <g className="party-chick" transform="translate(112 541)"><path d="M-20 23q-36 28-18 46l25-3m37-43q37 21 23 42l-22-3" fill="#f1d28a"/><ellipse cy="40" rx="31" ry="40" fill="#f4dda1" stroke="#e5bf76" strokeWidth="2"/><circle cy="0" r="27" fill="#f7e5b5"/><circle cx="-10" cy="-3" r="4" fill="#624c45"/><circle cx="10" cy="-3" r="4" fill="#624c45"/><path d="M-7 7h14l-7 8z" fill="#e2a65d"/><path d="M-12 75v19m24-19v19m-24-1l-11 6m11-6l9 5m15-5l-9 5m9-5l10 5" fill="none" stroke="#c3955e" strokeWidth="3" strokeLinecap="round"/><path d="M-19-20l11-51 31 46z" fill="#a6d1e8" stroke="#fffdf6" strokeWidth="3"/><circle cx="-6" cy="-69" r="7" fill="#eaa9bf"/><path d="M-13-36l25 7" stroke="#e8a4bf" strokeWidth="6"/></g>
  <g className="collage-stars" fill="#df99bc" stroke="#fff9ef" strokeWidth="3"><path d="M65 57l10 23 26 2-20 17 7 25-23-14-22 14 6-25-20-17 26-2z"/><path d="M665 115l8 19 21 2-16 13 5 21-18-11-18 11 5-21-17-13 21-2z"/></g>
  <g fill="none" stroke="#6b6260" strokeWidth="2.5" strokeLinejoin="round"><path d="M49 326q0 23 18 24q-18 1-18 24q-1-23-17-24q16-1 17-24zM672 547q0 25 19 26q-19 1-19 26q-1-25-18-26q17-1 18-26z"/></g>
 </svg>
}

export default function BirthdayIntro({onContinue,onCelebrate}:{onContinue:()=>void;onCelebrate:()=>void}) {
 const [candlesOut,setCandlesOut]=useState(false);
 return <section className="birthday-intro enter" aria-labelledby="intro-title">
  <div className="intro-sticker"><PartyPopper size={14}/>LEVEL {opening.age} UNLOCKED</div>
  <h1 id="intro-title">Look who’s <em>{opening.age}!</em></h1>
  <p className="intro-joke">Older? Yes. Grown up? Let’s not get carried away.</p>
  <div className={`birthday-poster ${candlesOut?'candles-out':''}`}><BirthdayCollage candlesOut={candlesOut}/><span className="poster-handwriting">happy birthday, cutie! ♡</span></div>
  <div className="intro-actions"><button className="blow-button" disabled={candlesOut} onClick={()=>{setCandlesOut(true);onCelebrate()}}><Wind size={15}/>{candlesOut?'Wish delivered! ✨':'Pssst… make a wish & blow!'}</button><button className="primary intro-continue" onClick={onContinue}>Okay, where’s my surprise? <ArrowRight size={17}/></button></div>
  <p className="intro-afterwish" role="status">{candlesOut?'22 candles? We saved you some breath. You’re welcome.':'A little cake. A little chaos. A whole lot of love.'}</p>
 </section>
}
