import { ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// ! We are going to be using markdown I believe for displaying the syllabus because all of the syllabus material
// ! We will dump the markdown in the syllabus wrapper

type SyllabusProps = {
  markdownContent: string;
};

let markdown = `# Welcome to CS210!

Welcome to the knowledge hub .

Anything & everything you need for my sections of CS210 can be found within this website.

### Contact

**Professor Manju Muralidharan** - [mmuralidharanpriya@sdsu.edu](mailto:mmuralidharanpriya@sdsu.edu)
[Office Hours Link](https://zoom.us/)

**TA Stanley** - [sschwarz0843@sdsu.edu](mailto:sschwarz0843@sdsu.edu)
**TA Jaydeep** - [jpustake1248@sdsu.edu](mailto:jpustake1248@sdsu.edu)
**TA Alex** - [astraight9409@sdsu.edu](mailto:astraight9409@sdsu.edu)
**TA Halie** - [hdo1153@sdsu.edu](mailto:hdo1153@sdsu.edu)

### Important Links

[Class Website](https://profmanjumu.vercel.app/)
[Discord](https://discord.gg/kWgbYFAzk9)`;

export default function Syllabus({ markdownContent }: SyllabusProps) {
  return (
    <Markdown
      className="markdown"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {markdown}
    </Markdown>
  );
}

function SyllabusWrapper({ children }: { children: ReactNode }) {
  return <div className="bg-white p-4 rounded-md shadow-lg">{children}</div>;
}
