import axios from "axios";

import { useState } from "react";

const Home = () => {
  const [replId, setReplId] = useState<string>();
  const [language, setLanguage] = useState<string>();

  const handleCreateRepl = () => {
    axios.post("http://localhost:3000/api/v1/repls", {
      replId,
      language,
    });
  };

  return (
    <div>
      <h1>Home</h1>{" "}
      <input
        type="text"
        value={replId}
        onChange={(e) => setReplId(e.target.value)}
      />
      <select
        value={language}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setLanguage(e.target.value)
        }
      >
        <option value="node.js">Node.js</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="c++">C++</option>
        <option value="c">C</option>
      </select>
      <button onClick={handleCreateRepl}>Create </button>
    </div>
  );
};

export default Home;
