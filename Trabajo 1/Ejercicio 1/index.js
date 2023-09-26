//

const MAX = 230;

const textarea = document.querySelector("textarea");

const characters_remaining = document.querySelector("#characters-remaining");

const verify = (textarea, max) => {
  const length = textarea.value.length;

  characters_remaining.textContent = max - length;
};

verify(textarea, MAX);
