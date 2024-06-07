import { API_URL, sleep, useFetch } from "../main";
import "../styles/index.scss"; // Import the global styles
import { Tables } from "../types";

const id = new URLSearchParams(window.location.search).get("id");
if (!id) window.location.href = "/";

const GetSong = async () => {
  const song = await useFetch<Tables<"Songs">>(`${API_URL}/songs/${id}`);

  if (song.error || !song.data) {
    const element = document.createElement("p");
    element.textContent = `Failed to fetch song: ${song.status} - ${song.statusText}`;
    element.style.color = "red";
    return;
  }

  // Sleep for 2 seconds
  sleep(2000);

  // prettier-ignore
  const songDetailsElement = document.getElementById("song-details")!;

  songDetailsElement.innerHTML = `
  
  <div class="song-details-top">
    <h1>${song.data.title}</h1>

    <div>
      <button class="btn">
      <a href="/edit-song/?id=${song.data.id}">
        Rediger
      </a>
    </button>
    <button class="btn danger" id="delete-song">
      Slet
    </button>
    </div>
  </div>

  <p>
    <a href="/view-artist/?id=${song.data.artist.id}">${song.data.artist.name}</a>
  </p>
  `;

  document.getElementById("loading")!.style.display = "none";
};

GetSong();

const deleteButton = document.getElementById("delete-song") as HTMLButtonElement;

deleteButton.onclick = async () => {
  const confirmDelete = confirm("Er du sikker på at du vil slette denne sang?");
  if (!confirmDelete) return;

  const { error } = await useFetch(`${API_URL}/songs/${id}`, {
    method: "DELETE",
  });

  if (error) return alert("Der skete en fejl, prøv igen senere");
  window.location.href = "/songs/";
};
