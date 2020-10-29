let getEmotion = (url) => {
  var bodyFormData = new FormData();
  bodyFormData.append("photo", url);

  axios({
    method: "post",
    url: "https://api.luxand.cloud/photo/emotions",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      token: "7d1bde7b82014a5294b0e825231a6c36",
    },
  })
    .then(function (response) {
      //handle success
      console.log(response.data);
      response.data.faces[0].emotions.happiness && beHappy();
      response.data.faces[0].emotions.sadness && sadnessBeGone();
      response.data.faces[0].emotions.neutral && beHappier();
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

// cloudinary api

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dfjro4g4f",
    uploadPreset: "aoskj9no",
    max_files: 1,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      getEmotion(result.info.secure_url);
      document.querySelector("#upload_widget").classList.toggle("display", 1);
      document.querySelector(
        ".mood-results__image-container"
      ).innerHTML = `<img class="mood-results__image" src=${result.info.secure_url}>`;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

// memes

let sadnessBeGone = () => {
  axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://some-random-api.ml/img/panda"
    )
    .then((results) => {
      document.querySelector(".mood-results__mood-text").innerHTML =
        "Uh Oh Someone's Looking Sad :(";
      document.querySelector(
        ".mood-results__meme"
      ).innerHTML = `<img class="mood-results__meme-image" src=${results.data.link}>`;
      console.log(results.data.link);
    });
};

let beHappy = () => {
  axios
    .get("https://api.thecatapi.com/v1/images/search?size=full")
    .then((results) => {
      document.querySelector(".mood-results__mood-text").innerHTML =
        "Yip yip Hooray! Someone's looking Happayy! :)";
      document.querySelector(
        ".mood-results__meme"
      ).innerHTML = `<img class="mood-results__meme-image" src=${results.data[0].url}>`;
      console.log(results.data.link);
    });
};

let beHappier = () => {
  axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://some-random-api.ml/img/dog"
    )
    .then((results) => {
      document.querySelector(".mood-results__mood-text").innerHTML =
        "Make up your mind! Either be happy or be sad.";
      document.querySelector(
        ".mood-results__meme"
      ).innerHTML = `<img class="mood-results__meme-image" src=${results.data.link}>`;
      console.log(results.data.link);
    });
};

let emojis = document.querySelectorAll(".mood-emojis__emoji");
emojis.forEach((emoji) => {
  emoji.addEventListener("click", (e) => {
    e.target.className === "mood-emojis__happy" && beHappy();
    e.target.className === "mood-emojis__sad" && sadnessBeGone();
    e.target.className === "mood-emojis__neutral" && beHappier();
    console.log(e.target.className);
  });
});
