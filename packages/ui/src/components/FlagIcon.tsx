import React from 'react';
import { Locale } from '../i18n/translations';

export const FlagIcon = ({ locale, className = "w-5 h-5" }: { locale: Locale; className?: string }) => {
  if (locale === 'fr') {
    return (
      <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#ED2939"/>
        <rect width="2" height="2" fill="#fff"/>
        <rect width="1" height="2" fill="#002395"/>
      </svg>
    );
  }
  
  if (locale === 'en') {
    return (
      <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    );
  }

  return null;
};
