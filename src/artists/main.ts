import "../styles/index.scss"; // Import the global styles
import { API_URL } from "../main";
import { Tables } from "../types";

const HandleArtists = async () => {
  const response = await fetch(`${API_URL}/artists`);

  if (!response.ok) {
    const element = document.createElement("p");
    element.textContent = `Failed to fetch songs: ${response.status} - ${response.statusText}`;
    element.style.color = "red";
    document.body.appendChild(element);
    return;
  }

  const data = (await response.json()) as Tables<"Artist">[];

  const List = document.getElementById("artists-list") as HTMLDivElement;

  List.innerHTML = `${data
    .map(
      (a) => `
  <div class="card">
    <h1>${a.name}</h1>
    <button class="btn">
      <a href="/view-artist?id=${a.id}">View</a>
    </button>
  </div>
  `
    )
    .join("")}`;
};

HandleArtists();
