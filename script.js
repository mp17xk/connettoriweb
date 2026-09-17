function copyText(btn, text) {
  var done = function () {
    var original = btn.textContent;
    btn.textContent = "Copiato!";
    setTimeout(function () { btn.textContent = original; }, 1500);
  };
  try {
    navigator.clipboard.writeText(text).then(done).catch(function () {
      fallbackCopy(text);
      done();
    });
  } catch (e) {
    fallbackCopy(text);
    done();
  }
}

function fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}

function initTabs() {
  var tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      document.querySelectorAll(".tab-panel").forEach(function (p) {
        p.classList.toggle("active", p.id === target);
      });
      if (history.replaceState) {
        history.replaceState(null, "", "#" + target);
      }
    });
  });

  var hash = window.location.hash.replace("#", "");
  if (hash) {
    var match = document.querySelector('.tab-btn[data-tab="' + hash + '"]');
    if (match) match.click();
  }
}

document.addEventListener("DOMContentLoaded", initTabs);
