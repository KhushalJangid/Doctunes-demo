const srcModal = document.getElementById("sourceLanguageModal");
  const tgtModal = document.getElementById("targetLanguageModal");
  const srcLang = document.getElementById("srcLang");
  const tgtLang = document.getElementById("tgtLang");
  const srcLanguages = srcModal.querySelectorAll("input[type='radio']");
  const tgtLanguages = tgtModal.querySelectorAll("input[type='radio']");
  srcLanguages.forEach(function (e) {
    e.addEventListener("click", function () {
      for (i = 0; i < srcLanguages.length; i++) {
        console.log(srcLanguages.length);
        if (srcLanguages[i] == e) {
          document.getElementById("srcLangButton").textContent =
            e.parentNode.textContent;
          srcLang.value = e.value;
          e.parentNode.parentNode.classList.add("selected");
        } else {
          srcLanguages[i].parentNode.parentNode.classList.remove("selected");
        }
      }
    });
  });
  tgtLanguages.forEach(function (e) {
    e.addEventListener("click", function () {
      for (i = 0; i < tgtLanguages.length; i++) {
        if (tgtLanguages[i] == e) {
          document.getElementById("tgtLangButton").textContent =
            e.parentNode.textContent;
          tgtLang.value = e.value;
          e.parentNode.parentNode.classList.add("selected");
        } else {
          tgtLanguages[i].parentNode.parentNode.classList.remove("selected");
        }
      }
    });
  });

  document
    .getElementById("srcLangButton")
    .addEventListener("click", function () {
      srcModal.style.display = "flex";
    });
  document
    .getElementById("tgtLangButton")
    .addEventListener("click", function () {
      tgtModal.style.display = "flex";
    });
  document
    .getElementById("translate-btn")
    .addEventListener("click", function () {
      translate();
    });
  document
    .getElementById("src-modal-close")
    .addEventListener("click", function () {
      srcModal.style.display = "none";
    });
  document
    .getElementById("src-modal-done")
    .addEventListener("click", function () {
      srcModal.style.display = "none";
    });
  document
    .getElementById("tgt-modal-close")
    .addEventListener("click", function () {
      tgtModal.style.display = "none";
    });
  document
    .getElementById("tgt-modal-done")
    .addEventListener("click", function () {
      tgtModal.style.display = "none";
    });
  window.onclick = function (event) {
    if (event.target == srcModal || event.target == tgtModal) {
      //modal.style.display = "none";
      srcModal.style.display = "none";
      tgtModal.style.display = "none";
    }
  };
  const translate = async function (text) {
    try {
      const response = await fetch("http://20.81.13.11:80/api/v1/service/translation-service-gpu1/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization':'Bearer 27Tc5hdz1oUgKxIFAxgAwu6hBayxTtgO'
        },
        // body: JSON.stringify({
        //   src: srcLang.value,
        //   tgt: tgtLang.value,
        //   text: document.getElementById("input").value,
        // }),
        body:JSON.stringify({
          "source_lang": srcLang.value,
          "target_lang": tgtLang.value,
          "sentences":[document.getElementById("input").value]
        }),
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        document.getElementById("output").value = data;
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };