require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/layers/ElevationLayer",
  "esri/layers/OpenStreetMapLayer"
], function(WebScene, SceneView, FeatureLayer, Search, ElevationLayer, OpenStreetMapLayer) {
 
  const WF = new FeatureLayer({
    url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer"
  });
 
  const USA = new FeatureLayer({
    url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/US_Drought_Intensity_v1/FeatureServer"
  });
 
  const view = new SceneView({
    container: "viewDiv",
    map: new WebScene({
      basemap: {
        baseLayers: [new OpenStreetMapLayer()]
      },
      ground: {
        layers: [new ElevationLayer()]
      },
      layers: [WF, USA]
    }),
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
        position: "top-right"
      }
    },
    // Set initial viewpoint to center on the United States
    viewpoint: {
      targetGeometry: {
        type: "point",
        longitude: -98.5795,
        latitude: 39.8283
      },
      scale: 5000000
    }
  });
 
  const searchWidget = new Search({
    view: view,
    container: "searchInput" // Update to match the ID of your search input
  });
 
  view.ui.add(searchWidget, "top-right");
 
});