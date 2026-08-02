import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { HooksApp } from './HooksApp'

import "./index.css";
// import { TasksApp } from './06-useReducer_TasksApp/TasksApp'
// import { ScrambleWords } from './07-useReducer_ScrambleWords/ScrambleWords'
// import { MemoHook } from "./08-useMemo/MemoHook";
// import { MemoCounter } from "./08-useMemo/components/MemoCounter";
import { InstagromApp } from "./09-useOptimistic/InstagromApp";
// import { TrafficLight } from './01-useState/TrafficLight'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHook } from './03-customHook/TrafficLightWithHook'
// import { PokemonPage } from './04-examples/PokemonPage'
// import { FocusScreen } from './05-useRef/FocusScreen'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}

    {/* MEMO O USEMEMO */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}

    {/* USEOPTIMISTIC */}
    <InstagromApp />
  </StrictMode>,
);
