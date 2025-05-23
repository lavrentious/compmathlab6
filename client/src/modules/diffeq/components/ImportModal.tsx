import { useCallback } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/store";
import { setImportModalShown as setImportModalShownAction } from "src/store/simulation.reducer";
import ImportPreset from "./ImportPreset";
const ImportModal = () => {
  const shown = useSelector(
    (state: RootState) => state.simulation.importModalShown,
  );
  const dispatch = useAppDispatch();
  const setImportModalShown = useCallback(
    (shown: boolean) => {
      dispatch(setImportModalShownAction(shown));
    },
    [dispatch],
  );

  return (
    <Modal show={shown} onHide={() => setImportModalShown(false)}>
      <Modal.Header closeButton>Import</Modal.Header>
      <Modal.Body>
        import from preset
        <ImportPreset onSelect={() => setImportModalShown(false)} />
        {/* <hr />
        or import from json
        <ImportJson onSelect={() => setImportModalShown(false)} /> */}
      </Modal.Body>
    </Modal>
  );
};

export default ImportModal;
