import { useDispatch, useSelector } from "react-redux";

import {
  togglePlatform,
  deletePlatform,
} from "../features/platformSlice";

import {
  selectAllPlatforms,
  selectConnectedPlatformCount,
} from "../features/platformSelectors";

function PlatformList() {
  const dispatch = useDispatch();

  const platforms = useSelector(
    selectAllPlatforms
  );

  const connectedCount = useSelector(
    selectConnectedPlatformCount
  );

  return (
    <div>
      <h2>
        Platforms ({connectedCount} connected)
      </h2>

      {platforms.map((platform) => (
        <div
          className="card"
          key={platform.id}
        >
          <h3>{platform.name}</h3>

          <p>
            Status:{" "}
            {platform.connected
              ? "Connected"
              : "Not Connected"}
          </p>

          <button
            onClick={() =>
              dispatch(
                togglePlatform(platform.id)
              )
            }
          >
            Toggle
          </button>

          <button
            onClick={() =>
              dispatch(
                deletePlatform(platform.id)
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlatformList;