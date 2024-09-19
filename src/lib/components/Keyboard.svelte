<script>
  import {
    board,
    currentRow,
    currentCol,
    gameState,
    toast,
    userUUID,
  } from "$lib/stores.js";
  import { turnOnToast } from "$lib/toast-controller.js";
  import { colorNametoRGBA } from "$lib/colors.js";

  const letterRegex = /^[A-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]$/;

  window.addEventListener("keydown", handleKey);

  const KEYBOARD = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
    ["Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"],
  ];

  function findColorOfLetter(letter, $board) {
    const row = $board.findIndex((row) =>
      row.some((obj) => obj.value === letter)
    );

    if (row < 0) {
      return "";
    }

    const column = $board[row].findIndex((obj) => obj.value === letter);

    return $board[row][column].color;
  }

  function handleKey(event) {
    const key = event.key.toUpperCase();

    if (key == "ENTER") {
      event.preventDefault();
    }

    enterLetter(key);
  }

  function checkIfWin(colors) {
    return colors.every((c) => c === "green");
  }

  function enterLetter(letter) {
    if ($gameState != "playing") {
      return;
    }
    if (letterRegex.test(letter)) {
      addLetter(letter);
    } else if (letter === "ENTER") {
      checkWord();
    } else if (
      letter === "DEL" ||
      letter === "DELETE" ||
      letter === "BACKSPACE"
    ) {
      deleteLetter();
    }
  }

  async function checkIfWord(guessWord) {
    const response = await fetch("/api/is-word", {
      method: "POST",
      body: JSON.stringify({ guessWord }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }

  function checkIfLose() {
    if ($currentRow > 5) {
      return true;
    }
    return false;
  }

  async function validateGuess(guessWord) {
    const response = await fetch("/api/check-word", {
      method: "POST",
      body: JSON.stringify({ UUID: $userUUID, guessWord }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async function checkWord() {
    if ($currentCol < 5) {
      return;
    }

    let guessWord = $board[$currentRow].map((letter) => letter.value).join("");

    if ((await checkIfWord(guessWord)) === false) {
      toast.set({
        message: "To nie jest słowo!",
        delay: 2000,
      });
      turnOnToast();
      return;
    }

    const colors = await validateGuess(guessWord);

    for (let i = 0; i < $board[$currentRow].length; i++) {
      board.update((currentValue) => {
        currentValue[$currentRow][i] = {
          value: currentValue[$currentRow][i].value,
          color: colors[i],
        };
        return currentValue;
      });
    }

    currentRow.update((currentValue) => currentValue + 1);
    currentCol.set(0);

    if (checkIfWin(colors)) {
      toast.set({
        message:
          "Wygrałeś! Słowo to: " +
          guessWord +
          "! Udało Ci się to za " +
          $currentRow +
          ". razem!",
        delay: 5000,
      });
      turnOnToast();
      gameState.set("win");
    } else if (checkIfLose()) {
      toast.set({
        message: "Niestety przegrałeś!",
        delay: 5000,
      });
      turnOnToast();
      gameState.set("lose");
    }
  }

  function deleteLetter() {
    if ($currentCol <= 0) {
      return;
    }

    currentCol.update((currentValue) => currentValue - 1);
    board.update((currentValue) => {
      currentValue[$currentRow][$currentCol] = {
        value: "",
        color: "",
      };
      return currentValue;
    });
  }

  function addLetter(letter) {
    if ($currentCol >= 5) {
      return;
    }
    board.update((currentValue) => {
      currentValue[$currentRow][$currentCol] = {
        value: letter,
        color: "",
      };
      return currentValue;
    });
    currentCol.update((currentValue) => currentValue + 1);
  }
</script>

<div class="mx-auto text-center col-md-8 p-1">
  {#each KEYBOARD as row}
    <div class="my-2" style="min-width: 340px">
      {#each row as letter}
        <button
          type="button"
          class="btn btn-outline-secondary m-sm-1 p-2 p-md-2 p-lg-3 p-xl-4"
          style="background-color: {colorNametoRGBA
            .chooseColor(findColorOfLetter(letter, $board))
            .getRGBA(0.2)};"
          on:click={() => enterLetter(letter)}
        >
          {letter}
        </button>
      {/each}
    </div>
  {/each}
</div>
