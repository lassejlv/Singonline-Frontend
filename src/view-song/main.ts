import { API_URL, useFetch } from "../main";
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

  // prettier-ignore
  console.log(song.data);

  const songDetailsElement = document.getElementById("song-details")!;

  songDetailsElement.innerHTML = `
  <h1>${song.data.title}</h1>
  <p>
    <a href="/view-artist/?id=${song.data.artist.id}">${song.data.artist.name}</a>
  </p>
  `;
};

GetSong();
