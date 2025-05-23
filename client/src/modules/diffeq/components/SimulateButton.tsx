import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setResult } from "src/store/simulation.reducer";
import { useSolveMutation } from "../api/api";
import { ApiError } from "../api/types";

const SimulateButton = () => {
  const { h, method, steps, sourceFExpr, startingPoint, epsilon } = useSelector(
    (state: RootState) => state.simulation.params,
  );
  const dispatch = useAppDispatch();
  const [fetch, { isLoading }] = useSolveMutation();

  const onSubmit = useCallback(() => {
    fetch({
      method,
      f_expr: sourceFExpr,
      starting_point: startingPoint,
      h,
      steps,
      epsilon,
    })
      .unwrap()
      .then((data) => {
        dispatch(setResult(data));
      })
      .catch((e: ApiError) => {
        console.log("ERRROR", e);
        if (typeof e.data.detail === "string") toast.error(e.data.detail);
        else toast.error(e.data.detail.map((d) => d.msg).join("\n"));
      });
  }, [fetch, method, sourceFExpr, startingPoint, h, steps, epsilon, dispatch]);

  const disabled = useMemo(() => {
    // TODO: add validation
    return false;
  }, []);

  return (
    <LoadingButton isLoading={isLoading} onClick={onSubmit} disabled={disabled}>
      Run
    </LoadingButton>
  );
};

export default SimulateButton;
