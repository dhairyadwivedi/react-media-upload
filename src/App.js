import React from "react";
import { DragAndDrop } from "./components/DragAndDrop/DragAndDrop";

import "./App.css";

function App() {
  const state = {
    inDropZone: false,
    fileList: [],
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "AddToDropZone":
        return { ...state, inDropZone: action.inDropZone };
      case "AddToList":
        return {
          ...state,
          fileList: state.fileList.concat(action.files),
        };
      default:
        return state;
    }
  };
  const [data, dispatch] = React.useReducer(reducer, state);
  return (
    <div className="App">
      <DragAndDrop dispatch={dispatch} data={data} />
    </div>
  );
}

export default App;
