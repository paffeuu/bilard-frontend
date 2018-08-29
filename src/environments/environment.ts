// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: "http://localhost:8090/pooltable",
  fps: 2    // częstość odświeżania podświetleń bil i liń podziału
};

export const tableConfig = {
  width: 1280,  // rozdzielczość zdjęcia z kamery
  height: 720
};

export const ballsConfig = {
  radius: 13,
  hoopRadius: 20,
  solidsColor: "#ff0000",
  stripesColor: "#00ff00"
};

export const linesConfig = {
  lineColor: "black"
};

export const pocketConfig = {
  pocketModel: [
    {centerX: 148.0, centerY: 135.0, id: 0},
    {centerX: 639.5, centerY: 135.0, id: 1},
    {centerX: 1131.0, centerY: 135.0, id: 2},
    {centerX: 1131.0, centerY: 630.0, id: 3},
    {centerX: 639.5, centerY: 630.0, id: 4},
    {centerX: 148.0, centerY: 630.0, id: 5},
  ],
  hoopRadius: 30
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
