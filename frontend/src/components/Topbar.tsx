import axios from "axios";
import { useState } from "react";

const SLUG_WORKS = [
  "car",
  "dog",
  "computer",
  "person",
  "inside",
  "word",
  "for",
  "please",
  "to",
  "cool",
  "open",
  "source",
];
function getRandomSlug() {
  let slug = "";
  for (let i = 0; i < 3; i++) {
    slug += SLUG_WORKS[Math.floor(Math.random() * SLUG_WORKS.length)];
  }
  return slug;
}

export const Topbar = () => {
  const DEFAULT_LANGUAGE = "node.js";

  const [replId, setReplId] = useState<string>(() => getRandomSlug());
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);

  //   const getRandomSlug = () => {
  //     return SLUG_WORKS[Math.floor(Math.random() * SLUG_WORKS.length)];
  //   };
  const handleCreateRepl = () => {
    axios
      .post("http://localhost:3000/api/v1/project", {
        replId,
        language,
      })
      .then((response) => {
        console.log("Project created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        if (error.response) {
          // Server responded with error status
          console.error("Response error:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        } else {
          // Error setting up the request
          console.error("Request setup error:", error.message);
        }
      });
  };

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            Dot Run
          </span>
          <input
            placeholder="Repl ID"
            type="text"
            value={replId}
            onChange={(e) => setReplId(e.target.value)}
            className="border border-default rounded-base p-2 w-full"
          />
          <select
            value={language}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLanguage(e.target.value)
            }
            className="border border-default rounded-base p-2 w-full"
          >
            <option value="node.js">Node.js</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="c">C</option>
          </select>
          <button
            onClick={handleCreateRepl}
            className="bg-brand text-white rounded-base p-2 w-full"
          >
            Create Project
          </button>
        </div>
        {/* <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button> */}
        {/* <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};
