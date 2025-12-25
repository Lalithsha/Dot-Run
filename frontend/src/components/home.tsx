import { Topbar } from "./Topbar";

const Home = () => {
  return <Topbar />;
};

export default Home;

/* 

 {/* <input
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
      <button onClick={handleCreateRepl}>Create </button> */
