// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: "http://localhost:8090/pooltable",
  fps: 2    // częstość odświeżania podświetleń bil i liń podziału
};

export const tableConfig = {
  width: 2048,  // rozdzielczość zdjęcia z kamery
  height: 1536
};

export const ballsConfig = {
  radius: 20,
  solidsColor: "#ff0000",
  stripesColor: "#00ff00"
};

export const linesConfig = {
  lineColor: "black"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
