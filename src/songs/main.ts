import "../styles/index.scss"; // Import the global styles
import { API_URL, useFetch } from "../main";
import { Tables } from "../types";
const searchInput = document.getElementById("search") as HTMLInputElement;
const loading = document.getElementById("loading") as HTMLDivElement;
const songsArray: Tables<"Songs">[] = [];

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

  for (const song of songs.data) {
    songsArray.push(song);
  }

  // sleep for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 700));

  InsertToHtml(songsArray);
  loading.style.display = "none";
};
HandleSongs();

function InsertToHtml(data: Tables<"Songs">[]) {
  const List = document.getElementById("songs-list") as HTMLDivElement;

  List.innerHTML = `${data
    .map(
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
}

const HandleSearch = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  if (!value) {
    // Remove all the songs from the array
    songsArray.splice(0, songsArray.length);
    HandleSongs();
    return;
  }

  const results = songsArray.filter((song) => song.title?.toLowerCase().includes(value.replace(" ", "").toLowerCase()));

  InsertToHtml(results);
};

searchInput.addEventListener("input", HandleSearch);
