import React from "react";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch } from "src/store";
import {
  setH,
  setRealFExpr,
  setSourceFExpr,
  setStartingPoint,
  setSteps,
} from "src/store/simulation.reducer";
import { presets } from "../utils/presets";

interface ImportPresetProps {
  onSelect: () => void;
}

const ImportPreset: React.FC<ImportPresetProps> = ({ onSelect }) => {
  const dispatch = useAppDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle>Select preset</Dropdown.Toggle>
      <Dropdown.Menu>
        {presets.map(({ presetName, ...params }) => (
          <Dropdown.Item
            key={`preset-${presetName}`}
            onClick={() => {
              dispatch(setSourceFExpr(params.sourceFExpr));
              dispatch(setStartingPoint(params.startingPoint));
              dispatch(setH(params.h));
              dispatch(setSteps(params.steps));
              dispatch(setRealFExpr(params.realFExpr));
              onSelect();
            }}
          >
            {presetName}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ImportPreset;
