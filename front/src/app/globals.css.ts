import { globalStyle } from '@vanilla-extract/css';
import { lightTheme, darkTheme } from './_styles/theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  colorScheme: 'light',
  scrollBehavior: 'smooth',
});

globalStyle('body', {
  margin: '0',
  width: '100%',
  minHeight: '100vh',
  height: 'auto',
  overflowX: 'hidden',
  color: '#171717',
  background: lightTheme.colorBackground,
  WebkitFontSmoothing: 'antialiased',
  position: 'relative',
});

globalStyle('h1, h2, h3, p', {
  margin: '0',
  padding: '0',
});

globalStyle('a, a:link, a:visited, a:hover', {
  textDecoration: 'none',
});

globalStyle('ul', {
  padding: '0',
});

globalStyle('*:focus-visible', {
  outline: '2px solid #2563eb',
  outlineOffset: '3px',
});

globalStyle('::selection', {
  color: '#171717',
  background: '#dbeafe',
});

// 라이트 모드
globalStyle(`:root`, {
  background: `${lightTheme.colorBackground} !important`,
});

// 다크 모드
globalStyle(`[data-theme='dark']`, {
  background: darkTheme.colorBackground,
});

// markdown-editor

globalStyle('.cm-line', {
  fontSize: '1.3rem !important',
});

globalStyle('.ͼ1.cm-focused', {
  outline: 'none !important',
});

// markdown-preview

globalStyle('.wmde-markdown', {
  background: `${lightTheme.colorBackground} !important`,
  color: '#262626 !important',
  fontSize: '1.0625rem !important',
  lineHeight: '1.85 !important',
  fontFamily: 'inherit !important',
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
});

globalStyle('.wmde-markdown h1, .wmde-markdown h2, .wmde-markdown h3', {
  color: '#171717 !important',
  lineHeight: '1.35 !important',
  letterSpacing: '-0.025em',
  marginTop: '2.5em !important',
  marginBottom: '0.8em !important',
});

globalStyle('.wmde-markdown h2', {
  border: 'none !important',
});

globalStyle('.wmde-markdown code', {
  fontSize: '0.9em !important',
});

globalStyle('.wmde-markdown pre', {
  background: '#171717 !important',
  borderRadius: '10px !important',
  padding: '20px !important',
  margin: '1.75rem 0 !important',
});

globalStyle('.wmde-markdown pre code', {
  color: '#d4d4d4 !important',
});

globalStyle('.wmde-markdown a', {
  color: '#1d4ed8 !important',
  textDecoration: 'underline !important',
  textUnderlineOffset: '3px',
});

globalStyle('.wmde-markdown p, .wmde-markdown li', {
  color: '#404040 !important',
});

globalStyle('.wmde-markdown hr', {
  background: '#4a4a4a !important',
  height: '1px !important',
});

globalStyle('.wmde-markdown blockquote', {
  borderLeft: `0.25em solid ${lightTheme.blockquoteBorder} !important`,
  background: `${lightTheme.blockquote} !important`,
  color: '#525252 !important',
  padding: '1em !important',
});

globalStyle('.wmde-markdown img', {
  background: 'none !important',
});

globalStyle(
  `language-css .token.string, .style .token.string, .token.atrule, .token.attr-value, .token.class-name, .token.color, .token.entity, .token.function, .token.url`,
  {
    color: '#a5d6ff !important',
  },
);

// giscus

globalStyle('.gsc-main', {
  width: '100%',
  margin: '0 auto',
});
