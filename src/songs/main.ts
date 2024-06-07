import "../styles/index.scss"; // Import the global styles
import { API_URL, useFetch } from "../main";
import { Tables } from "../types";

const HandleSongs = async () => {
  const songs = await useFetch<Tables<"Songs">[]>(`${API_URL}/songs`);

  // If not data in response
  if (songs.error) {
    const element = document.createElement("p");
    element.textContent = `Failed to fetch songs: ${songs.status} - ${songs.statusText}`;
    element.style.color = "red";
    document.body.appendChild(element);
    return;
  }

  const List = document.getElementById("songs-list") as HTMLDivElement;

  List.innerHTML = `${songs
    .data!.map(
      (song) => `
  <div class="card">
    <h1>${song.title}</h1>
    <p>
      <strong>Artist:</strong> ${song.artist.name}
    </p>
    <button class="btn">
      <a href="/view-song/?id=${song.id}">View</a>
    </button>
  </div>
  `
    )
    .join("")}`;
};

HandleSongs();
