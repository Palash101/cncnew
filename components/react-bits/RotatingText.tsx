'use client';

/* React Bits <RotatingText /> (https://reactbits.dev). Local changes: trimmed to character/word splitting, uses the project's cn(). */

import { useEffect, useMemo, useState, type ComponentPropsWithoutRef } from 'react';
import { AnimatePresence, motion, type Target, type TargetAndTransition, type Transition } from 'motion/react';
import { cn } from '@/lib/utils';

export interface RotatingTextProps
  extends Omit<ComponentPropsWithoutRef<typeof motion.span>, 'children' | 'transition' | 'initial' | 'animate' | 'exit'> {
  texts: string[];
  transition?: Transition;
  initial?: Target;
  animate?: TargetAndTransition;
  exit?: Target;
  animatePresenceMode?: 'sync' | 'wait';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words';
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export default function RotatingText({
  texts,
  transition = { type: 'spring', damping: 25, stiffness: 300 },
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  animatePresenceMode = 'wait',
  animatePresenceInitial = false,
  rotationInterval = 2000,
  staggerDuration = 0,
  staggerFrom = 'first',
  loop = true,
  auto = true,
  splitBy = 'characters',
  onNext,
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
  ...rest
}: RotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const elements = useMemo(() => {
    const words = texts[currentTextIndex].split(' ');
    return words.map((word, i) => ({
      characters: splitBy === 'characters' ? splitIntoCharacters(word) : [word],
      needsSpace: i !== words.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const totalChars = elements.reduce((sum, w) => sum + w.characters.length, 0);

  const getStaggerDelay = (index: number) => {
    if (staggerFrom === 'first') return index * staggerDuration;
    if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
    if (staggerFrom === 'center') return Math.abs(Math.floor(totalChars / 2) - index) * staggerDuration;
    return Math.abs(staggerFrom - index) * staggerDuration;
  };

  useEffect(() => {
    if (!auto || texts.length < 2) return;
    const id = window.setInterval(() => {
      setCurrentTextIndex((i) => {
        const next = i === texts.length - 1 ? (loop ? 0 : i) : i + 1;
        if (next !== i) onNext?.(next);
        return next;
      });
    }, rotationInterval);
    return () => window.clearInterval(id);
  }, [auto, loop, onNext, rotationInterval, texts.length]);

  return (
    <motion.span className={cn('relative flex flex-wrap whitespace-pre-wrap', mainClassName)} {...rest} layout transition={transition}>
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span key={currentTextIndex} layout aria-hidden="true" className="relative flex flex-wrap whitespace-pre-wrap">
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, w) => sum + w.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{ ...transition, delay: getStaggerDelay(previousCharsCount + charIndex) }}
                    className={cn('inline-block', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
