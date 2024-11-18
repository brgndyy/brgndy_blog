import { globalStyle } from '@vanilla-extract/css';
import { lightTheme, darkTheme } from './_styles/theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  margin: '0',
  width: '100vw',
  minHeight: '100vh',
  height: 'auto',
  overflow: 'scroll',
  transition: 'all 0.3s ease',
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

globalStyle('*:focus', {
  outline: 'none',
});

// 라이트 모드
globalStyle(`:root`, {
  background: lightTheme.colorBackground,
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
  color: '#f5f5f5 !important',
  fontSize: '1.3rem !importannt',
});

globalStyle('.wmde-markdown h2', {
  border: 'none !important',
});

globalStyle('.wmde-markdown code', {
  fontSize: '0.9rem !important',
});

globalStyle('.wmde-markdown pre', {
  background: `#292929 !important`,
});

globalStyle('.wmde-markdown hr', {
  background: '#4a4a4a !important',
  height: '1px !important',
});

globalStyle('.wmde-markdown blockquote', {
  borderLeft: '0.25em solid #2f2f2f !important',
  background: '#282828 !important',
  color: '#a6a6a6 !important',
  padding: '1em !important',
});

globalStyle('.wmde-markdown img', {
  background: 'none !important',
});
