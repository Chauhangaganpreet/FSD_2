import { createSelector } from "@reduxjs/toolkit";

export const selectPlatformsState = (state) =>
  state.platforms;

export const selectAllPlatforms = createSelector(
  [selectPlatformsState],
  (platformsState) => {
    return platformsState.ids.map(
      (id) => platformsState.entities[id]
    );
  }
);

export const selectConnectedPlatforms =
  createSelector(
    [selectAllPlatforms],
    (platforms) =>
      platforms.filter(
        (platform) => platform.connected
      )
  );

export const selectConnectedPlatformCount =
  createSelector(
    [selectConnectedPlatforms],
    (platforms) => platforms.length
  );