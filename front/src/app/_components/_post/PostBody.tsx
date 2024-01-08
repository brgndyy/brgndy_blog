'use client';

import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import Container from '../_composables/container/Container';
import { postBodyContainer } from './postBody.css';

export default function PostBody() {
  const source = `The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`

# 안녕하세요?

![](https://velog.velcdn.com/images/brgndy/post/5b9a14f1-bc39-4113-9890-7ec2308e806d/image.png)
`;

  return <MarkdownPreview source={source} className={BMHANNAAir.className} />;
}
