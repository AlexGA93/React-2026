import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
// import { HooksApp } from './HooksApp'

import "./index.css";
// import { TasksApp } from './06-useReducer_TasksApp/TasksApp'
// import { ScrambleWords } from './07-useReducer_ScrambleWords/ScrambleWords'
// import { MemoHook } from "./08-useMemo/MemoHook";
// import { MemoCounter } from "./08-useMemo/components/MemoCounter";
// import { InstagromApp } from "./09-useOptimistic/InstagromApp";
import { ClientInformation } from "./10-use-suspense/ClientInformation";
import { getUserAction } from "./10-use-suspense/api/get-user.action";
// import { TrafficLight } from './01-useState/TrafficLight'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHook } from './03-customHook/TrafficLightWithHook'
// import { PokemonPage } from './04-examples/PokemonPage'
// import { FocusScreen } from './05-useRef/FocusScreen'

import { v4 as uuidv4 } from "uuid";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
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
    {/* <InstagromApp /> */}

    {/* USE API + SUSPENSE */}
    {/* Suspense muestra un fallback mientras el componente hijo espera a que
        una promesa se resuelva. Esto permite usar use() sobre recursos asíncronos
        de forma más declarativa que tener que controlar loading con useEffect. */}
    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(uuidv4())} />
    </Suspense>
  </StrictMode>,
);
