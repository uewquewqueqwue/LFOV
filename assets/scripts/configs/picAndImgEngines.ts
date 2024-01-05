// base mini-config for search picture and image engines

export const pictureAndImageEngines: Object = {
  unsplash: {
    id: "card-unsplash",
    name: "Unsplash",
    key: "unsplash",
    url: "https://unsplash.com/",
    urls: [{ type: "image", link: "https://unsplash.com/s/photos/" }],
    located: "Various",
    svgName: "#unsplash-svg",
    keyColor: "#FFFFFF",
    logoSize: [70, 70],
    typeEngine: "pictures and images",
  },
  openverse: {
    id: "card-openverse",
    name: "Openverse",
    key: "openverse",
    url: "https://openverse.org/",
    urls: [{ type: "image", link: "https://openverse.org/search/?q=" }],
    located: "Various",
    svgName: "#openverse-svg",
    keyColor: "#FFE033",
    logoSize: [70, 70],
    typeEngine: "pictures and images",
  },
  vecteezy: {
    id: "card-vecteezy",
    name: "Vecteezy",
    key: "vecteezy",
    url: "https://www.vecteezy.com/",
    urls: [
      { type: "image", link: "https://www.vecteezy.com/free-images/" },
      { type: "picture", link: "https://www.vecteezy.com/free-photos/" },
    ],
    located: "USA",
    svgName: "#vecteezy-svg",
    keyColor: "#FF7802",
    logoSize: [70, 70],
    typeEngine: "pictures and images",
  },
  thenounproject: {
    id: "card-thenounproject",
    name: "Noun Project",
    key: "thenounproject",
    url: "https://thenounproject.com/",
    urls: [
      { type: "picture", link: "https://thenounproject.com/search/photos/?q=" },
    ],
    located: "USA",
    svgName: "#thenounproject-svg",
    keyColor: "#FFFFFF",
    logoSize: [100, 70],
    typeEngine: "pictures and images",
  },
};
